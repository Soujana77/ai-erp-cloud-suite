from flask import Flask, jsonify
from model import predict_next_month

app = Flask(__name__)

@app.route("/predict", methods=["GET"])
def predict():
    result = predict_next_month()

    return jsonify({
        "predicted_sales": result
    })

if __name__ == "__main__":
    app.run(debug=True, port=5001)