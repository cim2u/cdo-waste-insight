// Types
export interface BarangayPrediction {
    id: string;
    barangay: string;
    predictionLevel: 'Low' | 'Medium' | 'High';
    wasteVolume: number;
    recommendedAction: string;
}

export interface BarangayWasteData {
    barangay: string;
    predicted: number;
}

export interface WeeklyTrend {
    day: string;
    wasteVolume: number;
}

export interface WasteDistribution {
    level: string;
    percentage: number;
    fill: string;
}

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch predictions from backend
export async function fetchBarangayPredictions(): Promise<BarangayPrediction[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/predictions`);
        if (!response.ok) throw new Error('Failed to fetch predictions');
        return await response.json();
    } catch (error) {
        console.error('Error fetching predictions:', error);
        return [];
    }
}

// Fetch waste data from backend
export async function fetchBarangayWasteData(): Promise<BarangayWasteData[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/waste-data`);
        if (!response.ok) throw new Error('Failed to fetch waste data');
        return await response.json();
    } catch (error) {
        console.error('Error fetching waste data:', error);
        return [];
    }
}

// Fetch statistics
export async function fetchStatistics(): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}/statistics`);
        if (!response.ok) throw new Error('Failed to fetch statistics');
        return await response.json();
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return null;
    }
}

// Make prediction
export async function predictWaste(wasteAmount: number): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ waste_amount: wasteAmount }),
        });
        if (!response.ok) throw new Error('Prediction failed');
        return await response.json();
    } catch (error) {
        console.error('Error making prediction:', error);
        return null;
    }
}

// Mock data (fallback when backend is not available)
export const barangayPredictions: BarangayPrediction[] = [
    {
        id: '1',
        barangay: 'Barangay 1',
        predictionLevel: 'High',
        wasteVolume: 850,
        recommendedAction: 'Deploy 2 trucks, priority collection'
    },
    {
        id: '2',
        barangay: 'Barangay 2',
        predictionLevel: 'Medium',
        wasteVolume: 600,
        recommendedAction: 'Standard collection schedule'
    },
    {
        id: '3',
        barangay: 'Barangay 3',
        predictionLevel: 'Low',
        wasteVolume: 350,
        recommendedAction: 'Reduced collection frequency'
    }
];

export const barangayWasteData: BarangayWasteData[] = [
    { barangay: 'Barangay 1', predicted: 850 },
    { barangay: 'Barangay 2', predicted: 600 },
    { barangay: 'Barangay 3', predicted: 350 }
];

export const weeklyTrends: WeeklyTrend[] = [
    { day: 'Mon', wasteVolume: 1200 },
    { day: 'Tue', wasteVolume: 1800 },
    { day: 'Wed', wasteVolume: 1500 },
    { day: 'Thu', wasteVolume: 2200 },
    { day: 'Fri', wasteVolume: 1900 },
    { day: 'Sat', wasteVolume: 1400 },
    { day: 'Sun', wasteVolume: 1000 }
];

export const wasteDistribution: WasteDistribution[] = [
    { level: 'High', percentage: 35, fill: '#ef4444' },
    { level: 'Medium', percentage: 45, fill: '#eab308' },
    { level: 'Low', percentage: 20, fill: '#22c55e' }
];

export const highestWasteBarangay = {
    barangay: 'Barangay 1',
    wasteVolume: 850
};

export const totalWasteToday = 1800;
export const trucksNeeded = 8;