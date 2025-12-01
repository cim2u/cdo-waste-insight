import { useState } from "react";
import { Button } from "./ui/button.tsx";
import { Card } from "./ui/card.tsx";
import { Label } from "./ui/label.tsx";
import { Input } from "./ui/input.tsx";
import { AlertCircle, CheckCircle, TrendingUp, MapPin, Trash2 } from "lucide-react";

interface PredictionResult {
    level: "Low" | "Medium" | "High";
    wasteVolume: number;
    confidence: number;
    barangay: string;
}

export default function Prediction() {
    const [formData, setFormData] = useState({
        barangay: "",
        totalWastePerWeek: ""
    });

    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // ---------------------------------------------
    // CONNECT TO BACKEND
    // ---------------------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                totalWaste: formData.totalWastePerWeek
            })
        });

        const result = await response.json();

        setPrediction({
            level: result.level,
            wasteVolume: Number(formData.totalWastePerWeek),

            // ✅ FIXED CONFIDENCE (removed * 100)
            confidence: Math.round(result.confidence),

            barangay: formData.barangay
        });

        setIsSubmitted(true);
    };

    const getRecommendation = (level: "Low" | "Medium" | "High") => {
        switch (level) {
            case "Low":
                return "Low waste generation. Recommended waste collection: Once a week.";
            case "Medium":
                return "Moderate waste level. Recommended waste collection: Twice a week.";
            case "High":
                return "High waste generation. Recommended waste collection: Every day.";
        }
    };

    const getLevelColor = (level: "Low" | "Medium" | "High") => {
        switch (level) {
            case "Low":
                return {
                    bg: "bg-green-100",
                    text: "text-green-800",
                    border: "border-green-300",
                    icon: "text-green-600"
                };
            case "Medium":
                return {
                    bg: "bg-yellow-100",
                    text: "text-yellow-800",
                    border: "border-yellow-300",
                    icon: "text-yellow-600"
                };
            case "High":
                return {
                    bg: "bg-red-100",
                    text: "text-red-800",
                    border: "border-red-300",
                    icon: "text-red-600"
                };
        }
    };

    const resetForm = () => {
        setFormData({ barangay: "", totalWastePerWeek: "" });
        setPrediction(null);
        setIsSubmitted(false);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-slate-900 mb-2">Waste Prediction</h2>
                <p className="text-slate-600">Enter the required information to predict waste generation levels</p>
            </div>

            {!isSubmitted && (
                <Card className="p-6 bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="size-5 text-blue-600 mt-1" />
                        <div>
                            <h3 className="text-slate-900 mb-2">Required Information</h3>
                            <p className="text-slate-600 mb-4">
                                The system requires the following inputs to make a prediction:
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
                        <div className="flex items-start gap-3">
                            <MapPin className="size-4 text-blue-600 mt-1" />
                            <div>
                                <p className="text-slate-900">Barangay</p>
                                <p className="text-slate-600 text-sm">Enter the name of the barangay</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Trash2 className="size-4 text-blue-600 mt-1" />
                            <div>
                                <p className="text-slate-900">Total Waste Per Week (kg)</p>
                                <p className="text-slate-600 text-sm">Average waste amount (kg)</p>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {!isSubmitted && (
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="barangay">Barangay *</Label>
                                <Input
                                    id="barangay"
                                    type="text"
                                    placeholder="Enter barangay name"
                                    value={formData.barangay}
                                    onChange={(e) =>
                                        setFormData({ ...formData, barangay: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="totalWastePerWeek">Total Waste Per Week (kg) *</Label>
                                <Input
                                    type="number"
                                    id="totalWastePerWeek"
                                    placeholder="Enter waste volume"
                                    value={formData.totalWastePerWeek}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            totalWastePerWeek: e.target.value
                                        })
                                    }
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="mt-6 bg-green-600 hover:bg-green-700">
                            <TrendingUp className="size-4 mr-2" />
                            Generate Prediction
                        </Button>
                    </form>
                </Card>
            )}

            {isSubmitted && prediction && (
                <div className="space-y-6">
                    <Card className={`p-8 border-2 ${getLevelColor(prediction.level).border}`}>
                        <div className="text-center space-y-4">
                            <div
                                className={`inline-flex items-center justify-center p-4 ${getLevelColor(
                                    prediction.level
                                ).bg} rounded-full`}
                            >
                                <CheckCircle
                                    className={`size-12 ${getLevelColor(prediction.level).icon}`}
                                />
                            </div>

                            <h3 className="text-slate-900 mb-2">Prediction Result</h3>

                            <div
                                className={`inline-block px-6 py-3 rounded-full ${getLevelColor(
                                    prediction.level
                                ).bg} ${getLevelColor(prediction.level).text}`}
                            >
                                <span className="text-2xl">{prediction.level} Waste Level</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-sm text-slate-600">Barangay</p>
                                    <p className="text-lg text-slate-900">{prediction.barangay}</p>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-sm text-slate-600">Predicted Waste</p>
                                    <p className="text-lg text-slate-900">
                                        {prediction.wasteVolume} kg
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-sm text-slate-600">Confidence</p>
                                    <p className="text-lg text-slate-900">
                                        {prediction.confidence}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-slate-50 border-slate-200">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="size-5 text-slate-600 mt-1" />
                            <div>
                                <h4 className="text-slate-900 mb-2">Recommended Action</h4>
                                <p className="text-slate-700">
                                    {getRecommendation(prediction.level)}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Button variant="outline" onClick={resetForm}>
                        Make Another Prediction
                    </Button>
                </div>
            )}
        </div>
    );
}
