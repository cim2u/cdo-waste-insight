import { useState } from "react";
import { Button } from "./ui/button.tsx";
import { Card } from "./ui/card.tsx";
import { Label } from "./ui/label.tsx";
import { Input } from "./ui/input.tsx";
import { AlertCircle, CheckCircle, TrendingUp } from "lucide-react";

interface PredictionResult {
    level: "Low" | "Medium" | "High" | string;
    predictedWeekly: number;
    predictedDaily: number;
    totalWaste: number;
    barangay: string;
}

export default function Prediction() {
    const [barangay, setBarangay] = useState("");
    const [totalWaste, setTotalWaste] = useState("");
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ TotalWaste: Number(totalWaste) })
        });

        const result = await response.json();

        const cleanLevel = String(result.level).trim().toLowerCase();
        let mappedLevel: "Low" | "Medium" | "High" = "Low";
        if (cleanLevel === "medium") mappedLevel = "Medium";
        else if (cleanLevel === "high") mappedLevel = "High";

        setPrediction({
            level: mappedLevel,
            predictedWeekly: Number(result.predicted_weekly_kg),
            predictedDaily: Number(result.predicted_daily_kg),
            totalWaste: Number(totalWaste),
            barangay: barangay
        });

        setIsSubmitted(true);
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Low":
                return "text-green-700 bg-green-100 border-green-300";
            case "Medium":
                return "text-yellow-700 bg-yellow-100 border-yellow-300";
            case "High":
                return "text-red-700 bg-red-100 border-red-300";
            default:
                return "text-gray-700 bg-gray-100 border-gray-300";
        }
    };

    const getRecommendation = (level: string) => {
        switch (level) {
            case "Low":
                return "Recommended waste collection: Once a week.";
            case "Medium":
                return "Moderate waste generation. Collection: Twice a week.";
            case "High":
                return "High waste level detected. Daily collection recommended.";
            default:
                return "No recommendation available.";
        }
    };

    const resetForm = () => {
        setBarangay("");
        setTotalWaste("");
        setPrediction(null);
        setIsSubmitted(false);
    };

    return (
        <div className="flex justify-center py-10">
            <div className="w-full max-w-xl space-y-8">

                {/* Title */}
                <div className="text-center">
                    <h2 className="text-slate-900 text-3xl font-bold">Waste Prediction </h2>
                    <p className="text-slate-600 mt-2">
                        Enter barangay and daily waste to get prediction results.
                    </p>
                </div>

                {/* --- FORM --- */}
                {!isSubmitted && (
                    <Card className="p-8 rounded-2xl shadow-md bg-white border border-slate-200">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <Label className="text-slate-800 font-medium">Barangay *</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter barangay name"
                                    value={barangay}
                                    onChange={(e) => setBarangay(e.target.value)}
                                    className="h-12 rounded-xl mt-1"
                                    required
                                />
                            </div>

                            <div>
                                <Label className="text-slate-800 font-medium">Daily Waste (kg) *</Label>
                                <Input
                                    type="number"
                                    placeholder="Enter total waste kg/day"
                                    value={totalWaste}
                                    onChange={(e) => setTotalWaste(e.target.value)}
                                    className="h-12 rounded-xl mt-1"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 bg-green-600 hover:bg-green-700 h-12 w-full text-lg rounded-xl"
                            >
                                <TrendingUp className="size-5 mr-2" />
                                Generate Prediction
                            </Button>
                        </form>
                    </Card>
                )}

                {/* --- RESULT --- */}
                {isSubmitted && prediction && (
                    <div className="space-y-8">

                        <Card className={`p-10 rounded-2xl shadow-md border ${getLevelColor(prediction.level)}`}>
                            <div className="text-center space-y-6">

                                <div className="flex justify-center">
                                    <div className={`p-6 rounded-full ${getLevelColor(prediction.level)}`}>
                                        <CheckCircle className="size-12" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-semibold"> Prediction Result</h3>

                                <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${getLevelColor(prediction.level)}`}>
                                    {prediction.level} Waste Level
                                </div>

                                <div className="grid grid-cols-1 gap-4 pt-6">
                                    <div className="p-4 bg-slate-50 rounded-xl shadow-sm">
                                        <p className="text-sm text-slate-600">Barangay</p>
                                        <p className="text-xl font-medium">{prediction.barangay}</p>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-xl shadow-sm">
                                        <p className="text-sm text-slate-600">Daily Waste</p>
                                        <p className="text-xl font-medium">{prediction.totalWaste} kg/day</p>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-xl shadow-sm">
                                        <p className="text-sm text-slate-600">Predicted Weekly</p>
                                        <p className="text-xl font-medium">{prediction.predictedWeekly} kg/week</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 rounded-2xl bg-slate-50 border shadow-sm">
                            <div className="flex gap-3">
                                <AlertCircle className="size-6 mt-1 text-slate-500" />
                                <div>
                                    <h4 className="font-semibold text-lg">Recommended Action</h4>
                                    <p className="text-slate-700">{getRecommendation(prediction.level)}</p>
                                </div>
                            </div>
                        </Card>

                        <Button
                            variant="outline"
                            onClick={resetForm}
                            className="h-12 text-lg rounded-xl w-full"
                        >
                            Make Another Prediction
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
