import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import React, { useEffect, useState } from "react";
import {
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
import { TrendingUp, Trash2, AlertTriangle, BarChart3, Download } from "lucide-react";

const COLORS = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    low: '#22c55e',
    medium: '#eab308',
    high: '#ef4444'
};

const PIE_COLORS = [COLORS.low, COLORS.medium, COLORS.high];

interface WasteData {
    barangay: string;
    predicted: number;
}

interface Prediction {
    id: string;
    barangay: string;
    predictionLevel: 'Low' | 'Medium' | 'High';
    wasteVolume: number;
    recommendedAction: string;
}

interface Statistics {
    total_records: number;
    total_waste: number;
    average_waste: number;
    min_waste: number;
    max_waste: number;
    category_counts: {
        Low: number;
        Medium: number;
        High: number;
    };
}

export default function GraphView() {
    const [wasteData, setWasteData] = useState<WasteData[]>([]);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [stats, setStats] = useState<Statistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [wasteRes, predictionsRes] = await Promise.all([
                    fetch("http://localhost:5000/api/waste-data"),
                    fetch("http://localhost:5000/api/predictions")
                ]);

                const wasteJson = await wasteRes.json();
                const predictionsJson = await predictionsRes.json();

                setWasteData(wasteJson);
                setPredictions(predictionsJson);

                const calculatedStats = calculateStatistics(wasteJson, predictionsJson);
                setStats(calculatedStats);

            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const calculateStatistics = (wasteData: WasteData[], predictions: Prediction[]): Statistics => {
        const wasteVolumes = wasteData.map(item => item.predicted);
        const totalRecords = wasteData.length;
        const totalWaste = wasteVolumes.reduce((sum, vol) => sum + vol, 0);
        const averageWaste = totalWaste / totalRecords;

        const categoryCounts = predictions.reduce((acc, prediction) => {
            acc[prediction.predictionLevel] = (acc[prediction.predictionLevel] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            total_records: totalRecords,
            total_waste: Math.round(totalWaste),
            average_waste: Math.round(averageWaste),
            min_waste: Math.min(...wasteVolumes),
            max_waste: Math.max(...wasteVolumes),
            category_counts: {
                Low: categoryCounts.Low || 0,
                Medium: categoryCounts.Medium || 0,
                High: categoryCounts.High || 0
            }
        };
    };

    // Map prediction level to each barangay
    const topBarangays = [...wasteData]
        .map(item => {
            const prediction = predictions.find(p => p.barangay === item.barangay);
            return {
                ...item,
                predictionLevel: prediction?.predictionLevel || 'Low'
            };
        })
        .sort((a, b) => b.predicted - a.predicted)
        .slice(0, 10);

    const wasteDistribution = stats ? [
        { name: 'Low', value: stats.category_counts.Low, percentage: Math.round((stats.category_counts.Low / stats.total_records) * 100) },
        { name: 'Medium', value: stats.category_counts.Medium, percentage: Math.round((stats.category_counts.Medium / stats.total_records) * 100) },
        { name: 'High', value: stats.category_counts.High, percentage: Math.round((stats.category_counts.High / stats.total_records) * 100) }
    ] : [];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-md shadow-md border border-gray-100">
                    <p className="font-semibold text-gray-900">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toLocaleString()} kg
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const getBarColor = (level: 'Low' | 'Medium' | 'High') => {
        if (level === 'Low') return COLORS.low;
        if (level === 'Medium') return COLORS.medium;
        return COLORS.high;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-500 mt-3">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 px-4 md:px-8 lg:px-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-5xl sm:text-6xl md:text-[100px] font-bold text-gray-900">
                    Waste Analytics
                </h1>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <Download size={16} />
                    Export Report
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-1">
                {stats && (
                    <>
                        <StatCard title="Total Waste" value={`${stats.total_waste.toLocaleString()} kg`} icon={<Trash2 className="text-purple-600 " />} subtitle="All barangays" />
                        <StatCard title="Average Waste" value={`${stats.average_waste.toLocaleString()} kg`} icon={<TrendingUp className="text-blue-600" />} subtitle="Per barangay" />
                        <StatCard title="Total Records" value={stats.total_records.toLocaleString()} icon={<BarChart3 className="text-green-600" />} subtitle="Barangays analyzed" />
                        <StatCard title="Waste Range" value={`${stats.min_waste.toLocaleString()} - ${stats.max_waste.toLocaleString()} kg`} icon={<AlertTriangle className="text-orange-600" />} subtitle="Min-Max" />
                        <StatCard title="High Waste Areas" value={stats.category_counts.High.toString()} icon={<AlertTriangle className="text-red-600" />} subtitle="Priority attention" />
                    </>
                )}
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-8">



                {/* Waste Distribution */}
                <Card className="shadow-sm border border-gray-100 rounded-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                            <Trash2 className="text-green-600" />
                            Waste Classification Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={wasteDistribution}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                                    labelLine={false}
                                >
                                    {wasteDistribution.map((entry, index) => (
                                        <Cell key={index} fill={PIE_COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value} barangays`]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

            </div>

        </div>
    );
}

const StatCard = ({
    title,
    value,
    icon,
    subtitle,
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
    subtitle: string;
}) => (
    <Card className="shadow-sm border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200">
        <CardContent className="flex items-center py-4">
            {/* Fixed width text container */}
            <div className="flex-1 min-w-[180px]">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
            </div>

            {/* Icon container */}
            <div className="p-3 bg-gray-100 rounded-full flex items-center justify-center">
                {icon}
            </div>
        </CardContent>
    </Card>
);
