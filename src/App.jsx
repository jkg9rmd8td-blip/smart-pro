import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PlayerDetails from "./pages/PlayerDetails";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0b1320", color: "white" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "230px",
          background: "#111c2f",
          padding: "30px 20px",
          borderLeft: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        <h2 style={{ color: "#00e0a4" }}>Smart AI</h2>

        <nav style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 15 }}>
          <NavLink to="/" style={navStyle}>الرئيسية</NavLink>
        </nav>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "40px" }}>
        {children}
      </div>
    </div>
  );
}

const navStyle = ({ isActive }) => ({
  color: isActive ? "#00e0a4" : "#9ca3af",
  textDecoration: "none",
  fontSize: "16px"
});

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/player/:id" element={<PlayerDetails />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
