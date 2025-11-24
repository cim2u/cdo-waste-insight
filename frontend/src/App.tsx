import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import Dashboard from "./components/Dashboard.tsx";
import GraphView from './components/GraphView.tsx';
import { About } from "./components/About.tsx";
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
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