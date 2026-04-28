import pandas as pd
from sklearn.linear_model import LinearRegression

# Load CSV data
data = pd.read_csv("sales_data.csv")

# Input data (months)
X = data[["month"]]

# Output data (sales quantity)
y = data["quantity"]

# Create model
model = LinearRegression()

# Train model
model.fit(X, y)

# Function to predict next month sales
def predict_next_month():
    next_month = [[9]]

    prediction = model.predict(next_month)

    return round(prediction[0], 2)