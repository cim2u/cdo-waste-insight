import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Label } from './ui/label.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.tsx';
import { Sparkles, MapPin, Scale } from 'lucide-react';

type WasteLevel = "Low" | "Medium" | "High";

export default function PredictionPage() {
    const navigate = useNavigate();
    const [barangayName, setBarangayName] = useState('');
    const [dailyWaste, setDailyWaste] = useState('');
       const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Recommendation logic for number of trucks
    const getRecommendation = (level: WasteLevel) => {
        switch (level) {
            case "Low": return "1";
            case "Medium": return "2";
            case "High": return "3–4";
            default: return "-";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!barangayName || !dailyWaste) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch("https://cdo-waste-insight-10.onrender.com/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    TotalWaste: Number(dailyWaste),
                }),
            });

            if (!response.ok) {
                setError("Server error. Please check backend connection.");
                setLoading(false);
                return;
            }

            const result = await response.json();

            const cleanLevel = String(result.level).trim().toLowerCase();
            let mappedLevel: WasteLevel = "Low";

            if (cleanLevel === "medium") mappedLevel = "Medium";
            if (cleanLevel === "high") mappedLevel = "High";

            const predictionData = {
                barangayName,
                dailyWaste: Number(dailyWaste),
                predictedDaily: Number(result.predicted_daily_kg),
                predictedWeekly: Number(result.predicted_weekly_kg),
                level: mappedLevel,
                recommendedTrucks: getRecommendation(mappedLevel),
            };

            sessionStorage.setItem("predictionData", JSON.stringify(predictionData));
            navigate("/dashboard/prediction-result");

        } catch (err) {
            setError("Unable to connect to the server.");
        }

        setLoading(false);
    };

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">

            <div className="max-w-2xl mx-auto">

                {/* Title Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-md">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        
                    </div>
                   
                </div>

                {/* Card */}
       <Card
  className="relative"
  style={{
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    boxShadow: "0px 4px 20px rgba(34, 197, 94, 0.25)", // soft green glow
    border: "1.5px solid rgba(16, 185, 129, 0.35)",    // subtle green border
  }}
>
  {/* Top Gradient Border */}
  <div
    style={{
      height: "6px",
      width: "100%",
      background: "linear-gradient(to right, #34d399, #10b981, #059669)", 
    }}
  ></div>






                    {/* Accent Border */}
                    <div className="h-2 bg-gradient-to-r from-green-700 via-green-600 to-green-500"></div>

                    <CardHeader className="bg-white pt-9 pb-4 px-6">
<CardTitle
  className="font-extrabold text-green-600 mt-1 flex items-center gap-4 leading-none"
  style={{ fontSize: "29px", fontFamily: "'Poppins', sans-serif" }}
>
  Generate Waste Classification
</CardTitle>



                        <CardDescription className="text-black-600 mt-1">
                          Enter barangay information to classify waste levels.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-6 pt-2">

                        <form onSubmit={handleSubmit} className="space-y-6">

                         {/* Barangay Name */}
<div className="space-y-2 mb-4">
    <Label htmlFor="barangay" className="flex items-center gap-2 text-green-800">
        <MapPin className="w-4 h-4 text-green-600" />
        Barangay Name{" "}
        <span
            style={{
                color: barangayName ? "green" : "red",
                fontWeight: "bold",
                marginLeft: "2px"
            }}
        >
            *
        </span>
    </Label>

    <Input
        id="barangay"
        type="text"
        placeholder="Enter barangay name"
        value={barangayName}
        onChange={(e) => setBarangayName(e.target.value)}
        required
        className="border border-green-300/60 bg-green-50/20 rounded-lg focus:border-green-600 focus:ring-green-400/20"
    />
</div>

{/* Daily Waste */}
<div className="space-y-2 mb-4">
    <Label htmlFor="waste" className="flex items-center gap-2 text-green-800">
        <Scale className="w-4 h-4 text-green-600" />
        Daily Waste (kg){" "}
        <span
            style={{
                color: dailyWaste ? "green" : "red",
                fontWeight: "bold",
                marginLeft: "2px"
            }}
        >
            *
        </span>
    </Label>

    <Input
        id="waste"
        type="number"
        step="0.01"
        min="0"
        placeholder="Enter daily waste in kilograms"
        value={dailyWaste}
        onChange={(e) => setDailyWaste(e.target.value)}
        required
        className="border border-green-300/60 bg-green-50/20 rounded-lg focus:border-green-600 focus:ring-green-400/20"
    />
</div>


                            {/* Error */}
                            {error && (
                                <p className="text-red-600 text-sm text-center">{error}</p>
                            )}

                            {/* Submit Button */}
                            <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-green-600 hover:bg-green-700 transition shadow-md hover:shadow-lg rounded-lg"
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        letterSpacing: "0.3px",
                                        WebkitFontSmoothing: "antialiased"
                                    }}
                                    >
                                    {loading ? "Generating..." : "Classify Waste"}
                                    </Button>



                        </form>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
