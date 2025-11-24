from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import os

# ----------------------
# Initialize Flask
# ----------------------
app = Flask(__name__)
CORS(app)

# ----------------------
# Load dataset
# ----------------------
dataset_path = "dataset.xlsx"
if not os.path.exists(dataset_path):
    raise FileNotFoundError(f"{dataset_path} not found! Place it in the same folder as app.py.")

df = pd.read_excel(dataset_path)

# Rename column for simplicity
df = df.rename(columns={
    "SW generation (Population x SW segregation) kg/day": "TotalWaste"
})

# ----------------------
# Create waste level categories
# ----------------------
def classify_waste_level(value):
    if value < 1000:
        return "Low"
    elif value <= 2000:
        return "Medium"
    else:
        return "High"

df['WasteLevel'] = df['TotalWaste'].apply(classify_waste_level)

# ----------------------
# Features and target
# ----------------------
X = df[['TotalWaste']]  # You can add more features later
y = df['WasteLevel']

# Train Decision Tree
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Model accuracy
y_pred = model.predict(X_test)
accuracy = round(accuracy_score(y_test, y_pred) * 100, 2)

# ----------------------
# Routes
# ----------------------

# Home route
@app.route("/", methods=["GET"])
def home():
    return "Waste Prediction API is running!"

# Get all barangays/data
@app.route("/barangays", methods=["GET"])
def barangays():
    return jsonify(df.to_dict(orient="records"))

# Predict waste level
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Force parse JSON
        data = request.get_json(force=True)

        if "TotalWaste" not in data:
            return jsonify({"error": "Missing 'TotalWaste' in JSON"}), 400

        try:
            total_waste = float(data["TotalWaste"])
        except ValueError:
            return jsonify({"error": "'TotalWaste' must be a number"}), 400

        X_input = [[total_waste]]
        pred = model.predict(X_input)[0]

        return jsonify({"prediction": pred})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Model info
@app.route("/model/info", methods=["GET"])
def model_info():
    info = {
        "model": "Decision Tree Classifier",
        "features": X.columns.tolist(),
        "accuracy_percent": accuracy
    }
    return jsonify(info)

# ----------------------
# Run Flask
# ----------------------
if __name__ == "__main__":
    app.run(debug=True)