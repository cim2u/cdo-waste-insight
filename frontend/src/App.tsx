import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import Dashboard from "./components/Dashboard.tsx";
import GraphView from './components/GraphView.tsx';
import { About } from "./components/About.tsx";
import './styles/global.css';

// Wrapper component to handle navigation for LandingPage
function LandingPageWrapper() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return <LandingPage onGetStarted={handleGetStarted} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageWrapper />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/graphs" element={<GraphView />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}