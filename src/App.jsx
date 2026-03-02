import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Players from "./pages/Players.jsx";
import Motion3D from "./pages/Motion3D.jsx";
import InjuryPrediction from "./pages/InjuryPrediction.jsx";
import StressMonitoring from "./pages/StressMonitoring.jsx";
import Alerts from "./pages/Alerts.jsx";
import Reports from "./pages/Reports.jsx";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/players" element={<Players />} />
          <Route path="/motion-3d" element={<Motion3D />} />
          <Route path="/injury-prediction" element={<InjuryPrediction />} />
          <Route path="/stress-monitoring" element={<StressMonitoring />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
