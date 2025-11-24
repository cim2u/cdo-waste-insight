import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import React from "react";
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
    trucksNeeded
} from "../lib/data.ts";
import { TrendingUp, Trash2, Truck } from "lucide-react";

export default function GraphView() {
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
                                <p className="text-slate-500">Highest Waste Generator</p>
                                <p className="text-slate-900">{highestWasteBarangay.barangay}</p>
                                <p className="text-slate-600">{highestWasteBarangay.wasteVolume} kg</p>
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
                                <p className="text-slate-500">Total Waste Today</p>
                                <p className="text-slate-900">{totalWasteToday.toLocaleString()} kg</p>
                                <p className="text-slate-600">Across all barangays</p>
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
                                <p className="text-slate-500">Estimated Trucks Needed</p>
                                <p className="text-slate-900">{trucksNeeded} trucks</p>
                                <p className="text-slate-600">Based on capacity</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Weekly Trends Line Chart */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Weekly Waste Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="day" />
                            <YAxis label={{ value: 'Waste (kg)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip
                                formatter={(value) => [`${value} kg`, 'Waste Volume']}
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="wasteVolume"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ fill: '#3b82f6', r: 5 }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Bar Chart and Donut Chart */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Predicted Waste Per Barangay */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Predicted Waste per Barangay</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barangayWasteData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="barangay"
                                    tick={{ fontSize: 12 }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis label={{ value: 'kg', angle: -90, position: 'insideLeft' }} />
                                <Tooltip
                                    formatter={(value) => [`${value} kg`, 'Predicted']}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar
                                    dataKey="predicted"
                                    fill="#8b5cf6"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Waste Distribution Donut Chart */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Waste Level Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={wasteDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="percentage"
                                    label={(entry) => `${entry.level}: ${entry.percentage}%`}
                                >
                                    {wasteDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`${value}%`, 'Percentage']}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 flex justify-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-slate-600">High</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-slate-600">Medium</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-slate-600">Low</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
