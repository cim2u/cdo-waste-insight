import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import joblib

def train_model():

    # Load the dataset
    df = pd.read_excel("dataset.xlsx")

    # Rename waste column
    df = df.rename(columns={
        "SW generation (Population x SW segregation) kg/day": "DailyWaste"
    })

    # Drop missing values
    df = df.dropna(subset=["DailyWaste"])

    # Convert to WEEKLY
    df["WeeklyWaste"] = df["DailyWaste"] * 7

    # WEEKLY thresholds
    def categorize_weekly(w):
        if w < 3500:
            return "Low"
        elif w < 4900:
            return "Medium"
        else:
            return "High"

    df["Category"] = df["WeeklyWaste"].apply(categorize_weekly)

    # ML input uses WEEKLY waste
    X = df[["WeeklyWaste"]]
    y = df["Category"]

    # Train/Test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=42
    )

    # Train model
    model = DecisionTreeClassifier()
    model.fit(X_train, y_train)

    # Save model
    joblib.dump(model, "waste_model.pkl")

    print("Model trained using WEEKLY values!")

if __name__ == "__main__":
    train_model()
