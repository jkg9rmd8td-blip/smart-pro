import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PlayerDetails from "./pages/PlayerDetails";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/player/:id" element={<PlayerDetails />} />
      </Routes>
    </HashRouter>
  );
}
