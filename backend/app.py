from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

MODEL_PATH = "waste_model.pkl"
DEFAULT_DATASET_PATH = "dataset.xlsx"

app = Flask(__name__)
CORS(app)

model = None

# ---------------------------------------------------------
# Helpers
# ---------------------------------------------------------
def find_column(df, candidates):
    cols = list(df.columns)

    for cand in candidates:
        for col in cols:
            if str(col).strip().lower() == cand.strip().lower():
                return col

    for cand in candidates:
        for col in cols:
            if cand.strip().lower() in str(col).strip().lower():
                return col

    return None


def get_barangay_column(df):
    candidates = ["barangay", "barangay name", "brgy", "barangay_name"]
    col = find_column(df, candidates)
    if col:
        return col

    for c in df.columns:
        if df[c].dtype == object:
            return c

    raise Exception("Barangay column not found in dataset.")


def get_total_waste_column(df):
    candidates = [
        "SW generation (Population x SW segregation) kg/day",
        "total waste volume per day (kg/day)",
        "waste",
        "waste volume",
        "generation"
    ]
    col = find_column(df, candidates)
    if col:
        return col

    numeric_cols = [c for c in df.columns if pd.api.types.is_numeric_dtype(df[c])]
    numeric_cols = [c for c in numeric_cols if "total" not in str(c).lower()]

    if not numeric_cols:
        raise Exception("No numeric waste column found.")

    means = {c: df[c].mean() for c in numeric_cols}
    return max(means, key=means.get)


def categorize(x):
    try:
        x = float(x)
    except:
        return "Unknown"

    if x < 3000:
        return "Low"
    elif x < 8000:
        return "Medium"
        return "Medium"
    else:
        return "High"


# ---------------------------------------------------------
# Load + Clean Dataset (with total separated)
# ---------------------------------------------------------
def load_cleaned_dataset():
    df = pd.read_excel(DEFAULT_DATASET_PATH)

    barangay_col = get_barangay_column(df)
    waste_col = get_total_waste_column(df)

    df = df[[barangay_col, waste_col]].copy()
    df.rename(columns={barangay_col: "Barangay", waste_col: "TotalWaste"}, inplace=True)

    df["TotalWaste"] = pd.to_numeric(df["TotalWaste"], errors="coerce")
    df.dropna(subset=["TotalWaste"], inplace=True)

    # Separate TOTAL row if exists
    total_row = df[df["Barangay"].str.lower().str.contains("total")]
    df_no_total = df[~df["Barangay"].str.lower().str.contains("total")]

    return df_no_total, total_row


# ---------------------------------------------------------
# Model Training
# ---------------------------------------------------------
def train_model():
    global model
    try:
        df, total_row = load_cleaned_dataset()

        df["Category"] = df["TotalWaste"].apply(categorize)

        X = df[["TotalWaste"]]
        y = df["Category"]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

        clf = DecisionTreeClassifier()
        clf.fit(X_train, y_train)

        joblib.dump(clf, MODEL_PATH)
        model = clf

        return True
    except Exception as e:
        print("Train Error:", e)
        return False


def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        return True
    return False


if not load_model():
    train_model()


# ---------------------------------------------------------
# Endpoints
# ---------------------------------------------------------
@app.route("/")
def home():
    return jsonify({"message": "Backend running!"})


# ✔ Barangay waste (NO TOTAL)
@app.route("/api/waste-data")
def waste_data():
    try:
        df, _ = load_cleaned_dataset()
        return jsonify([
            {"barangay": row["Barangay"], "predicted": float(row["TotalWaste"])}
            for _, row in df.iterrows()
        ])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✔ Prediction table (NO TOTAL)
@app.route("/api/predictions")
def predictions():
    try:
        df, _ = load_cleaned_dataset()

        result = []
        for i, row in df.iterrows():
            waste = row["TotalWaste"]
            level = categorize(waste)

            if level == "High":
                action = "Deploy 2 trucks, priority collection"
            elif level == "Medium":
                action = "Standard collection schedule"
            else:
                action = "Reduced collection frequency"

            result.append({
                "id": str(i + 1),
                "barangay": row["Barangay"],
                "predictionLevel": level,
                "wasteVolume": float(waste),
                "recommendedAction": action
            })

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✔ Top 5 (NO TOTAL)
@app.route("/api/top5")
def top5():
    try:
        df, _ = load_cleaned_dataset()
        df_sorted = df.sort_values("TotalWaste", ascending=False).head(5)

        return jsonify([
            {"barangay": row["Barangay"], "wasteVolume": float(row["TotalWaste"])}
            for _, row in df_sorted.iterrows()
        ])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ⭐ NEW → SEPARATE TOTAL ENDPOINT
@app.route("/api/total")
def get_total():
    try:
        _, total_row = load_cleaned_dataset()

        if total_row.empty:
            return jsonify({"totalWaste": None})

        total_value = float(total_row.iloc[0]["TotalWaste"])
        category = categorize(total_value)

        if category == "High":
            action = "Deploy 2 trucks, priority collection"
        elif category == "Medium":
            action = "Standard collection schedule"
        else:
            action = "Reduced collection frequency"

        return jsonify({
            "totalWaste": total_value,
            "category": category,
            "recommendedAction": action
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# TRAIN
@app.route("/api/train", methods=["POST"])
def train():
    ok = train_model()
    return jsonify({"success": ok})


# RUN
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
