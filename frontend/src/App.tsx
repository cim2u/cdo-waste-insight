import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { LandingPage } from "./components/LandingPage.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import { About } from "./components/About.tsx";
import Prediction from "./components/Prediction.tsx";
import PredictionResultPage from "./components/PredictionResultPage.tsx";

import "./styles/global.css";

// Wrapper to allow LandingPage to navigate
function LandingPageWrapper() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard/classification");
  };

  return <LandingPage onGetStarted={handleGetStarted} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPageWrapper />} />

        {/* Dashboard Layout with nested pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>

          {/* Default route */}
          <Route index element={<Navigate to="/dashboard/classification" replace />} />

          {/* Prediction Page */}
          <Route path="classification" element={<Prediction />} />

          {/* Prediction Result Page */}
          <Route path="classification-result" element={<PredictionResultPage />} />

          {/* About Page */}
          <Route path="about" element={<About />} />

        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
