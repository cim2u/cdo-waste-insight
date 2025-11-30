import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table.tsx";
import { Badge } from "./ui/badge.tsx";

export default function Dashboard() {
    const [wasteData, setWasteData] = useState<any[]>([]);
    const [predictions, setPredictions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // 🔥 UPDATED BACKEND URL
                const wasteRes = await fetch(
                    "https://cdo-waste-insight-7.onrender.com/api/waste-data"
                );
                const predRes = await fetch(
                    "https://cdo-waste-insight-7.onrender.com/api/predictions"
                );

                const wasteJson = await wasteRes.json();
                const predJson = await predRes.json();

                const sortedWaste = wasteJson.sort(
                    (a: any, b: any) => b.predicted - a.predicted
                );
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

    const getBarColor = (value: number) =>
        value >= 700 ? "#ef4444" : value >= 500 ? "#eab308" : "#22c55e";

    if (loading) {
        return (
            <p className="text-center text-lg text-gray-500">
                Loading dashboard...
            </p>
        );
    }

    return (
        <div className="space-y-8 px-4 md:px-8 lg:px-12">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900">
                    Waste Collection Predictions
                </h1>
            </div>

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Top 5 Barangays Chart */}
                <Card className="shadow-sm border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                            Top 5 Barangays – Predicted Waste
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={wasteData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                />
                                <XAxis
                                    dataKey="barangay"
                                    tick={{ fontSize: 12, fill: "#6b7280" }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis
                                    label={{
                                        value: "Waste (kg)",
                                        angle: -90,
                                        position: "insideLeft",
                                        fontSize: 10,
                                        fill: "#6b7280"
                                    }}
                                />
                                <Tooltip
                                    formatter={(value) => [
                                        `${value} kg`,
                                        "Predicted Waste"
                                    ]}
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        padding: "8px"
                                    }}
                                />
                                <Bar
                                    dataKey="predicted"
                                    radius={[8, 8, 0, 0]}
                                >
                                    {wasteData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={getBarColor(
                                                entry.predicted
                                            )}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Legend / Prediction Levels */}
                <Card className="shadow-sm border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                            Prediction Levels
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            {
                                name: "High",
                                color: "bg-red-500",
                                range: "≥ 700 kg"
                            },
                            {
                                name: "Medium",
                                color: "bg-yellow-500",
                                range: "500 - 699 kg"
                            },
                            {
                                name: "Low",
                                color: "bg-green-500",
                                range: "< 500 kg"
                            }
                        ].map((level) => (
                            <div
                                key={level.name}
                                className="flex items-center gap-3"
                            >
                                <div
                                    className={`${level.color} w-12 h-12 rounded-lg shadow-sm`}
                                />
                                <div>
                                    <p className="text-gray-900 font-medium">
                                        {level.name}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {level.range}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Prediction Table */}
            <Card className="shadow-sm border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                        Barangay Waste Predictions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table className="min-w-full divide-y divide-gray-200">
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead>Barangay</TableHead>
                                <TableHead>Prediction Level</TableHead>
                                <TableHead>Waste Volume</TableHead>
                                <TableHead>Recommended Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {predictions.map((prediction) => (
                                <TableRow
                                    key={prediction.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <TableCell className="text-gray-700 font-medium">
                                        {prediction.barangay}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            predictionLevel={
                                                prediction.predictionLevel
                                            }
                                        >
                                            {prediction.predictionLevel}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="text-gray-700">
                                        {prediction.wasteVolume} kg
                                    </TableCell>

                                    <TableCell className="text-gray-500">
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
