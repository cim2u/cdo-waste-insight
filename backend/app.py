from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import numpy as np
from werkzeug.utils import secure_filename

# -------------------------------------
# CONFIGURATION
# -------------------------------------
MODEL_PATH = "waste_model.pkl"
DEFAULT_DATASET_PATH = "dataset.xlsx"
ALLOWED_EXTENSIONS = {"xlsx", "xls", "csv"}

app = Flask(__name__)
CORS(app)


# -------------------------------------
# CHECK FILE TYPE
# -------------------------------------
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# -------------------------------------
# HOME ROUTE
# -------------------------------------
@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})


# -------------------------------------
# TRAIN MODEL FROM DATASET
# -------------------------------------
def train_model_from_dataset(dataset_path):
    df = pd.read_excel(dataset_path)

    # Dataset must contain: waste, waste_category
    X = df[["waste"]]        # input column
    y = df["waste_category"] # target

    # Train-test split 70/30
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.30, random_state=42
    )

    model = DecisionTreeClassifier()
    model.fit(X_train, y_train)

    joblib.dump(model, MODEL_PATH)
    return model


# -------------------------------------
# LOAD MODEL
# -------------------------------------
def load_model():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    elif os.path.exists(DEFAULT_DATASET_PATH):
        return train_model_from_dataset(DEFAULT_DATASET_PATH)
    else:
        return None


model = load_model()


# -------------------------------------
# PREDICTION ROUTE
# -------------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    global model

    if model is None:
        return jsonify({"error": "Model not available"}), 500

    data = request.json
    waste_value = float(data["totalWaste"])

    input_data = np.array([[waste_value]])

    prediction = model.predict(input_data)[0]

    try:
        confidence = float(model.predict_proba(input_data).max() * 100)
    except:
        confidence = None

    return jsonify({
        "level": prediction,
        "confidence": round(confidence, 2) if confidence else "N/A"
    })


# -------------------------------------
# UPLOAD DATASET + RETRAIN
# -------------------------------------
@app.route("/upload", methods=["POST"])
def upload_dataset():
    global model

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    filename = secure_filename(file.filename)
    file.save(filename)

    if filename.endswith(".csv"):
        df = pd.read_csv(filename)
    else:
        df = pd.read_excel(filename)

    # Dataset must contain: waste, waste_category
    X = df[["waste"]]
    y = df["waste_category"]

    model = DecisionTreeClassifier()
    model.fit(X, y)

    joblib.dump(model, MODEL_PATH)

    return jsonify({"message": "Model retrained successfully!"})


# -------------------------------------
# RUN SERVER
# -------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
