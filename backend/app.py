from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained ML model
model = joblib.load("waste_model.pkl")


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "CDO WasteInsight ML API is running"})


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Validate input
    if not data or "TotalWaste" not in data:
        return jsonify({"error": "Missing 'TotalWaste' in request body"}), 400

    try:
        total_waste = float(data["TotalWaste"])
    except:
        return jsonify({"error": "TotalWaste must be a number"}), 400

    # ML prediction
    X_input = np.array([[total_waste]])

    predicted_label = model.predict(X_input)[0]

    # Confidence score (if model supports predict_proba)
    if hasattr(model, "predict_proba"):
        confidence_score = round(float(model.predict_proba(X_input).max()) * 100, 2)
    else:
        confidence_score = None

    # Derived values
    weekly_waste = total_waste * 7

    return jsonify({
        "predicted_daily_kg": total_waste,
        "predicted_weekly_kg": weekly_waste,
        "level": predicted_label,
        "confidence": confidence_score
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
