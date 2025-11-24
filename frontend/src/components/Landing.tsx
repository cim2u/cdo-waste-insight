import { Button } from "./ui/button.tsx";
import { Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import '../styles/global.css';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full text-center space-y-8">
                <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4">
                    <Recycle className="size-96 text-green-9900 " />
                </div>

                <h1 className="text-slate-900">
                    Waste Collection Prediction System
                </h1>

                <p className="text-slate-600 max-w-2xl mx-auto">
                    A smart solution helping Cagayan de Oro City plan and manage waste collection
                    efficiently through data-driven predictions and real-time analytics. Optimize
                    resource allocation and improve environmental sustainability.
                </p>

                <div className="pt-4">
                    <Button
                        onClick={() => navigate('/dashboard')}
                        size="lg"
                        className="rounded-full px-8 py-6 bg-green-600 hover:bg-green-700"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    );
}
