import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import {
    weeklyTrends,
    barangayWasteData,
    wasteDistribution,
    highestWasteBarangay,
    totalWasteToday,
    trucksNeeded,
    fetchBarangayWasteData,
    fetchStatistics
} from "../lib/data.ts";
import { TrendingUp, Trash2, Truck } from "lucide-react";

export default function GraphView() {
    const [wasteData, setWasteData] = useState(barangayWasteData);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const loadData = async () => {
            const [newWasteData, newStats] = await Promise.all([
                fetchBarangayWasteData(),
                fetchStatistics()
            ]);

            if (newWasteData.length > 0) setWasteData(newWasteData);
            if (newStats) setStats(newStats);
        };

        loadData();
    }, []);

    const displayStats = stats || {
        total_records: 100,
        average_waste: 550,
        min_waste: 200,
        max_waste: 1000,
        category_counts: { Low: 30, Medium: 50, High: 20 }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-slate-900">Waste Analytics</h1>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <TrendingUp className="size-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-slate-500">Average Waste</p>
                                <p className="text-slate-900">{displayStats.average_waste} kg</p>
                                <p className="text-slate-600">Per barangay</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Trash2 className="size-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-slate-500">Total Records</p>
                                <p className="text-slate-900">{displayStats.total_records}</p>
                                <p className="text-slate-600">Dataset size</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <Truck className="size-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-slate-500">Waste Range</p>
                                <p className="text-slate-900">{displayStats.min_waste}-{displayStats.max_waste}kg</p>
                                <p className="text-slate-600">Min-Max</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Rest of your GraphView component remains the same */}
            {/* ... */}
        </div>
    );
}