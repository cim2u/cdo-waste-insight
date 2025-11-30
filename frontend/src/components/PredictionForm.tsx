import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { Button } from "./ui/button.tsx";
import { predictWaste } from "../lib/data.ts";

export function PredictionForm() {
    const [wasteAmount, setWasteAmount] = useState('');
    const [prediction, setPrediction] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {
        if (!wasteAmount) return;

        setLoading(true);
        try {
            const result = await predictWaste(parseFloat(wasteAmount));
            setPrediction(result);
        } catch (error) {
            console.error('Prediction error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPredictionColor = (level: string) => {
        switch (level?.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Waste Classification Predictor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-4">
                    <input
                        type="number"
                        value={wasteAmount}
                        onChange={(e) => setWasteAmount(e.target.value)}
                        placeholder="Enter waste amount (kg/day)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        onClick={handlePredict}
                        disabled={loading || !wasteAmount}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {loading ? 'Predicting...' : 'Predict'}
                    </Button>
                </div>

                {prediction && (
                    <div className={`p-4 rounded-lg border-2 ${getPredictionColor(prediction.prediction)}`}>
                        <h3 className="font-semibold text-lg mb-2">Prediction Result</h3>
                        <p><strong>Category:</strong> {prediction.prediction}</p>
                        <p><strong>Waste Amount:</strong> {prediction.waste_amount} kg/day</p>
                        <p><strong>Confidence:</strong> {prediction.confidence}%</p>
                    </div>
                )}

                <div className="text-sm text-gray-600">
                    <p><strong>Classification Criteria:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li><strong>Low:</strong> &lt; 3,000 kg/day</li>
                        <li><strong>Medium:</strong> 3,000 - 8,000 kg/day</li>
                        <li><strong>High:</strong> &gt; 8,000 kg/day</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}