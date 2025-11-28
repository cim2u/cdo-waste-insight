import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table.tsx";
import { Badge } from "./ui/badge.tsx";

export default function Dashboard() {

    const [wasteData, setWasteData] = useState<any[]>([]);
    const [predictions, setPredictions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const wasteRes = await fetch("http://localhost:5000/api/waste-data");
                const predRes = await fetch("http://localhost:5000/api/predictions");

                const wasteJson = await wasteRes.json();
                const predJson = await predRes.json();

                // Sort highest predicted waste first
                const sortedWaste = wasteJson.sort((a: any, b: any) => b.predicted - a.predicted);

                // Top 5 barangays
                const topFive = sortedWaste.slice(0, 5);

                setWasteData(topFive);
                setPredictions(predJson);

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const getBarColor = (value: number) => {
        if (value >= 700) return '#ef4444';
        if (value >= 500) return '#eab308';
        return '#22c55e';
    };

    const getLevelBadgeVariant = (level: string) => {
        switch (level) {
            case 'High':
                return 'destructive';
            case 'Medium':
                return 'default';
            default:
                return 'secondary';
        }
    };

    if (loading) {
        return <p className="text-center text-lg">Loading dashboard...</p>;
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-slate-900">Waste Collection Predictions</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

                {/* TOP 5 BARANGAYS CHART */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Top 5 Barangays – Predicted Waste Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={wasteData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="barangay"
                                    tick={{ fontSize: 12 }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis label={{ value: 'Waste (kg)', angle: -90, position: 'insideLeft' }} />
                                <Tooltip
                                    formatter={(value) => [`${value} kg`, 'Predicted Waste']}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="predicted" radius={[8, 8, 0, 0]}>
                                    {wasteData.map((entry, index) => (
                                        <Cell key={index} fill={getBarColor(entry.predicted)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* LEGEND */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Prediction Levels</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-red-500 rounded-lg"></div>
                            <div>
                                <p className="text-slate-900">High</p>
                                <p className="text-slate-500">≥ 700 kg</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-yellow-500 rounded-lg"></div>
                            <div>
                                <p className="text-slate-900">Medium</p>
                                <p className="text-slate-500">500 - 699 kg</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-500 rounded-lg"></div>
                            <div>
                                <p className="text-slate-900">Low</p>
                                <p className="text-slate-500">{"< 500 kg"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* PREDICTION TABLE */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Barangay Waste Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Barangay</TableHead>
                                <TableHead>Prediction Level</TableHead>
                                <TableHead>Waste Volume</TableHead>
                                <TableHead>Recommended Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {predictions.map((prediction) => (
                                <TableRow key={prediction.id}>
                                    <TableCell>{prediction.barangay}</TableCell>
                                    <TableCell>
                                        <Badge variant={getLevelBadgeVariant(prediction.predictionLevel)}>
                                            {prediction.predictionLevel}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{prediction.wasteVolume} kg</TableCell>
                                    <TableCell className="text-slate-600">
                                        {prediction.recommendedAction}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
