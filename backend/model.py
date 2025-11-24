import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import joblib

def train_model():

    # Load the dataset
    df = pd.read_excel("dataset.xlsx")

    # Rename the waste column to make it easier to use
    df = df.rename(columns={
        "SW generation (Population x SW segregation) kg/day": "TotalWaste"
    })

    # Drop rows with missing values
    df = df.dropna(subset=["TotalWaste"])

    # Create a new Category column (Low, Medium, High)
    def categorize(x):
        if x < 3000:
            return "Low"
        elif x < 8000:
            return "Medium"
        else:
            return "High"

    df["Category"] = df["TotalWaste"].apply(categorize)

    # Feature and target
    X = df[["TotalWaste"]]     # Only one feature
    y = df["Category"]

    # Train/test split
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
