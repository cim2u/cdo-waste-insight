import { motion } from "framer-motion";
import { Recycle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button.tsx";

interface LandingPageProps {
    onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">

            {/* Background Animations */}
            <motion.div
                className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-200 via-green-100 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-r from-teal-200 via-green-100 to-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col min-h-screen">

                {/* Header */}
                <motion.div
                    className="flex items-center gap-4 mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl shadow-lg relative">
                        <Recycle className="w-8 h-8 text-white" />
                        <motion.div
                            className="absolute -top-1 -right-1"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-4 h-4 text-emerald-300" />
                        </motion.div>
                    </div>
                    <div>
                        <div className="text-gray-900 font-semibold text-2xl">CDO Waste Insight</div>
                        <div className="text-emerald-600 font-medium text-sm">System</div>
                    </div>
                </motion.div>

                {/* Hero Section */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col items-center justify-center gap-6"
                        >
                            {/* Heading */}
                            
                                <h1
                                style={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 800,
                                    fontSize: "80px",
                                    lineHeight: "1.1",
                                    marginTop: "-100px",
                                    textAlign: "center",
                                    color: "#16A34A", // Tailwind green-600
                                    letterSpacing: "-1px",
                                }}
                                >
                                CdO Waste Insight
                                </h1>


                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed text-center text-lg md:text-xl max-w-xl">
                                A data-driven platform that predicts barangay waste levels using machine learning.
                                Optimize waste collection schedules, allocate trucks efficiently, and help build a cleaner and smarter Cagayan de Oro City.
                            </p>

                            {/* Get Started Button */}
                            <motion.div
                                className="flex justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    onClick={onGetStarted}
                                    size="default"
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-extrabold tracking-wider shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden font-sans"
                                >
                                    <span className="relative z-10 flex items-center gap-3 uppercase tracking-wider">
                                        Get Started
                                        <motion.span
                                            animate={{ x: [0, 8, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <ArrowRight className="w-6 h-6" />
                                        </motion.span>
                                    </span>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>



                {/* Footer */}
                <motion.div
                    className="text-center text-emerald-600 text-base mt-20 font-semibold"
                >
                    © 2025 CDO Waste Insight — Empowering Smart Waste Management in Cagayan de Oro City.
                </motion.div>
            </div>
        </div>
    );
}
