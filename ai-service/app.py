from flask import Flask, jsonify, request
from flask_cors import CORS

from model import predict_next_month

from groq import Groq
from dotenv import load_dotenv

import os

load_dotenv()

app = Flask(__name__)

CORS(app)

# GROQ CLIENT
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# AI FORECAST ENDPOINT
@app.route("/predict", methods=["GET"])
def predict():

    result = predict_next_month()

    return jsonify({
        "predicted_sales": result
    })

# CHATBOT ENDPOINT
@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message", "")

    if not user_message:
        return jsonify({
            "error": "Message is required"
        }), 400

    try:

        completion = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "system",
                    "content": """
                    You are a Smart ERP AI Assistant.

                    Help users with:
                    - inventory
                    - finance
                    - HR
                    - analytics
                    - forecasting
                    - ERP navigation

                    Keep responses short, professional, and helpful.
                    """
                },

                {
                    "role": "user",
                    "content": user_message
                }
            ]
        )

        ai_reply = completion.choices[0].message.content

        return jsonify({
            "reply": ai_reply
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
if __name__ == "__main__":
    app.run(debug=True, port=5001)