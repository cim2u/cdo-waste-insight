import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import { About } from "./components/About.tsx";
import Prediction from "./components/Prediction.tsx";

import './styles/global.css';

// Wrapper component to handle navigation for LandingPage
function LandingPageWrapper() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/prediction");   // ✅ UPDATED: Send user to Prediction page
  };

  return <LandingPage onGetStarted={handleGetStarted} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageWrapper />} />

        <Route element={<DashboardLayout />}>
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
