import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Truck,
  MapPin,
  Scale,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { Button } from "./ui/button.tsx";

interface PredictionData {
  barangayName: string;
  dailyWaste: number;
}

interface PredictionResult extends PredictionData {
  weeklyWaste: number;
  wasteLevel: string;
  trucksNeeded: number;
  recommendation: string;
}

// Waste Computation Logic
function calculatePrediction(data: PredictionData): PredictionResult {
  const weeklyWaste = data.dailyWaste * 7;
  let wasteLevel = "";
  let trucksNeeded = 0;
  let recommendation = "";

  if (weeklyWaste < 500) {
    wasteLevel = "Low Waste Level";
    trucksNeeded = 1;
    recommendation =
      "One collection truck is sufficient for this barangay. Schedule pickups twice per week.";
  } else if (weeklyWaste < 1500) {
    wasteLevel = "Medium Waste Level";
    trucksNeeded = 2;
    recommendation =
      "Two collection trucks are recommended. Schedule pickups three times per week.";
  } else if (weeklyWaste < 3000) {
    wasteLevel = "High Waste Level";
    trucksNeeded = 3;
    recommendation =
      "Three collection trucks are needed. Daily pickups are recommended to prevent overflow.";
  } else {
    wasteLevel = "Very High Waste Level";
    trucksNeeded = 4;
    recommendation =
      "Four or more collection trucks are required. Consider daily pickups and additional waste segregation programs.";
  }

  return {
    ...data,
    weeklyWaste,
    wasteLevel,
    trucksNeeded,
    recommendation,
  };
}

export default function PredictionResultPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("predictionData");
    if (!storedData) {
      navigate("/dashboard/prediction");
      return;
    }

    const parsed = JSON.parse(storedData);
    setResult(calculatePrediction(parsed));
  }, [navigate]);

  if (!result) return null;

  const getLevelColor = (level: string) => {
  if (level === "Low Waste Level") {
    return {
      backgroundColor: "#dcfce7",   // green-100
      color: "#166534",             // green-800
      border: "2px solid #86efac",  // green-300
    };
  }

  if (level === "Medium Waste Level") {
    return {
      backgroundColor: "#fef9c3",   // yellow-100
      color: "#854d0e",             // yellow-800
      border: "2px solid #fde047",  // yellow-300
    };
  }

  if (level === "High Waste Level") {
    return {
      backgroundColor: "#ffedd5",   // orange-100
      color: "#9a3412",             // orange-800
      border: "2px solid #fdba74",  // orange-300
    };
  }

  return {
    backgroundColor: "#fee2e2",     // red-100
    color: "#991b1b",               // red-800
    border: "2px solid #fca5a5",    // red-300
  };
};

  return (
    <div className="p-10 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
<h1
  style={{
    fontSize: "1.5rem",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    fontFamily: "Inter, sans-serif",
    background: "linear-gradient(to right, #166534, #059669, #22c55e)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textShadow: "0 1px 2px rgba(0,0,0,0.15)",
  }}
>
  Prediction Results
</h1>


  <p
    className="text-gray-600 mt-2 text-lg"
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    Your waste prediction has been generated successfully.
  </p>
</div>


        {/* MAIN CARD */}
     <Card
  className="relative"
  style={{
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    boxShadow: "0 4px 18px rgba(34, 197, 94, 0.25)", // soft green glow
    border: "1px solid transparent",                // keep sides clean
  }}
>
  {/* Top Border */}
  <div
    style={{
      height: "6px",
      width: "100%",
      background: "linear-gradient(to right, #34d399, #10b981, #059669)", // green gradient
    }}
  ></div>

  {/* Your content here */}



          <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>

          <CardHeader className="text-center py-6 bg-gradient-to-b from-white to-green-50/40">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>
  <CardTitle
  className="font-extrabold"
  style={{
    fontFamily: "Roboto, sans-serif",
    fontSize: "20px",
    letterSpacing: ".5px",
    color: "#000000ff",
    fontWeight: 800,
    marginBottom: "0px",   // ✅ no bottom margin
    marginTop: "-30px"     // keeps your top spacing
  }}
>

  Prediction Generated Successfully
</CardTitle>


          </CardHeader>

       <CardContent className="space-y-8 p-8 shadow-lg rounded-xl">
            {/* Waste Level Badge */}
            <div className="text-center">
          <span
              style={{
                    ...getLevelColor(result.wasteLevel),
                    display: "inline-block",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "32px",
                    padding: "12px 50px",
                    borderRadius: "40px",
                    letterSpacing: "0.6px",
                    marginTop: "-920px",    // ✅ correct
                    }}

                >
                {result.wasteLevel}
                </span>



            </div>

            {/* Input Information */}
            <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Input Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-500 text-sm mb-2">Barangay Name</p>
                  <p className="text-gray-900 font-medium">{result.barangayName}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-500 text-sm mb-2">Daily Waste</p>
                  <p className="text-gray-900 font-medium">
                    {result.dailyWaste.toFixed(2)} kg
                  </p>
                </div>
              </div>
            </div>

            {/* Predicted Results */}
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Predicted Results
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <p className="text-gray-500 text-sm mb-2">
                    Predicted Weekly Waste
                  </p>
                  <p className="text-green-700 font-medium">
                    {result.weeklyWaste.toFixed(2)} kg
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <p className="text-gray-500 text-sm mb-2">Waste Level Category</p>
                  <p className="text-gray-900 font-medium">{result.wasteLevel}</p>
                </div>
              </div>
            </div>

            {/* Recommended Action */}
            <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" />
                Recommended Action
              </h3>

              <div className="bg-green-100 border border-green-300 rounded-xl px-4 py-3 inline-block mb-3">
                <p className="text-green-800 font-medium">
                  {result.trucksNeeded} truck
                  {result.trucksNeeded > 1 ? "s" : ""} needed for collection
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {result.recommendation}
              </p>
            </div>

            {/* Button */}
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/prediction")}
              className="w-full border-green-400 text-green-700 hover:bg-green-50 hover:border-green-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Make Another Prediction
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
