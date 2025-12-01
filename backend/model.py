import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import joblib

def train_model():

    # Load the dataset
    df = pd.read_excel("dataset.xlsx")

    # Rename the waste column
    df = df.rename(columns={
        "SW generation (Population x SW segregation) kg/day": "TotalWaste"
    })

    # Drop missing values
    df = df.dropna(subset=["TotalWaste"])

    # Correct DAILY thresholds
    def categorize(x):
        if x < 500:
            return "Low"
        elif x < 700:
            return "Medium"
        else:
            return "High"

    df["Category"] = df["TotalWaste"].apply(categorize)

    # ML input & output
    X = df[["TotalWaste"]]
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

    print("Model trained and saved!")


if __name__ == "__main__":
    train_model()
