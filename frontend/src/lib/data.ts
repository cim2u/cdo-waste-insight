export interface BarangayPrediction {
    id: number;
    barangay: string;
    predictionLevel: 'Low' | 'Medium' | 'High';
    wasteVolume: number;
    recommendedAction: string;
}

export interface WeeklyTrend {
    day: string;
    wasteVolume: number;
}

export interface BarangayWaste {
    barangay: string;
    predicted: number;
}

export interface WasteDistribution {
    level: string;
    percentage: number;
    fill: string;
}

// Today's waste predictions by barangay
export const barangayPredictions: BarangayPrediction[] = [
    {
        id: 1,
        barangay: 'Carmen',
        predictionLevel: 'High',
        wasteVolume: 850,
        recommendedAction: 'Deploy 3 trucks, priority collection'
    },
    {
        id: 2,
        barangay: 'Lapasan',
        predictionLevel: 'Medium',
        wasteVolume: 520,
        recommendedAction: 'Deploy 2 trucks, standard schedule'
    },
    {
        id: 3,
        barangay: 'Nazareth',
        predictionLevel: 'High',
        wasteVolume: 780,
        recommendedAction: 'Deploy 3 trucks, priority collection'
    },
    {
        id: 4,
        barangay: 'Macasandig',
        predictionLevel: 'Low',
        wasteVolume: 340,
        recommendedAction: 'Deploy 1 truck, regular schedule'
    },
    {
        id: 5,
        barangay: 'Gusa',
        predictionLevel: 'Medium',
        wasteVolume: 610,
        recommendedAction: 'Deploy 2 trucks, standard schedule'
    },
    {
        id: 6,
        barangay: 'Kauswagan',
        predictionLevel: 'High',
        wasteVolume: 720,
        recommendedAction: 'Deploy 3 trucks, priority collection'
    },
    {
        id: 7,
        barangay: 'Bugo',
        predictionLevel: 'Low',
        wasteVolume: 290,
        recommendedAction: 'Deploy 1 truck, regular schedule'
    },
    {
        id: 8,
        barangay: 'Bulua',
        predictionLevel: 'Medium',
        wasteVolume: 580,
        recommendedAction: 'Deploy 2 trucks, standard schedule'
    }
];

// Weekly waste trends
export const weeklyTrends: WeeklyTrend[] = [
    { day: 'Mon', wasteVolume: 4200 },
    { day: 'Tue', wasteVolume: 3800 },
    { day: 'Wed', wasteVolume: 4500 },
    { day: 'Thu', wasteVolume: 4100 },
    { day: 'Fri', wasteVolume: 5200 },
    { day: 'Sat', wasteVolume: 4800 },
    { day: 'Sun', wasteVolume: 3900 }
];

// Predicted waste per barangay for bar chart
export const barangayWasteData: BarangayWaste[] = barangayPredictions.map(b => ({
    barangay: b.barangay,
    predicted: b.wasteVolume
}));

// Waste distribution percentages
export const wasteDistribution: WasteDistribution[] = [
    { level: 'High', percentage: 37.5, fill: '#ef4444' },
    { level: 'Medium', percentage: 37.5, fill: '#eab308' },
    { level: 'Low', percentage: 25, fill: '#22c55e' }
];

// Calculate total waste
export const totalWasteToday = barangayPredictions.reduce((sum, b) => sum + b.wasteVolume, 0);

// Calculate trucks needed (assuming 300kg per truck capacity)
export const trucksNeeded = Math.ceil(totalWasteToday / 300);

// Highest waste barangay
export const highestWasteBarangay = barangayPredictions.reduce((max, b) =>
    b.wasteVolume > max.wasteVolume ? b : max
    , barangayPredictions[0]);