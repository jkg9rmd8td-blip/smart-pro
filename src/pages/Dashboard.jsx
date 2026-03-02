import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const basePlayers = [
  { id: 1, name: "محمد أحمد", position: "حارس مرمى", hr: 78, temp: 36.8, o2: 98 },
  { id: 2, name: "علي سالم", position: "مدافع", hr: 88, temp: 37.2, o2: 96 },
  { id: 3, name: "فهد محمود", position: "مهاجم", hr: 95, temp: 37.5, o2: 94 },
];

const calcRisk = (p) =>
  Math.min(100, Math.round(p.hr * 0.4 + (p.temp - 36) * 20 + (100 - p.o2) * 2));

export default function Dashboard() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState(
    basePlayers.map((p) => ({ ...p, risk: calcRisk(p) }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prev) =>
        prev.map((p) => {
          const updated = {
            ...p,
            hr: p.hr + (Math.random() * 6 - 3),
            temp: p.temp + (Math.random() * 0.2 - 0.1),
            o2: p.o2 + (Math.random() * 2 - 1),
          };
          return { ...updated, risk: calcRisk(updated) };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const avgRisk =
    players.reduce((sum, p) => sum + p.risk, 0) / players.length;

  const riskColor =
    avgRisk > 75 ? "#ff4d4f" : avgRisk > 50 ? "#ffb020" : "#00e0a4";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 30%, #0f2027, #203a43, #0b1320)",
        color: "white",
        padding: 50,
      }}
    >
      <h1 style={{ fontSize: 42, marginBottom: 40 }}>
        غرفة العمليات الصحية التنبؤية
      </h1>

      {/* مؤشر دائري احترافي */}
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: `8px solid ${riskColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          fontWeight: "bold",
          marginBottom: 50,
          boxShadow: `0 0 40px ${riskColor}`,
          transition: "0.4s",
        }}
      >
        {Math.round(avgRisk)}%
      </div>

      {/* كروت اللاعبين */}
      <div style={{ display: "grid", gap: 30 }}>
        {players.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/player/${p.id}`)}
            style={{
              cursor: "pointer",
              padding: 30,
              borderRadius: 20,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              boxShadow: `0 0 20px ${
                p.risk > 75
                  ? "#ff4d4f"
                  : p.risk > 50
                  ? "#ffb020"
                  : "#00e0a4"
              }`,
              transition: "0.3s",
            }}
          >
            <h2>{p.name}</h2>
            <p style={{ color: "#9ca3af" }}>{p.position}</p>

            <div style={{ marginTop: 10 }}>
              ❤️ {Math.round(p.hr)} bpm <br />
              🌡 {p.temp.toFixed(1)}° <br />
              💨 {Math.round(p.o2)}%
            </div>

            <div
              style={{
                marginTop: 20,
                height: 10,
                background: "#1f2937",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  width: `${p.risk}%`,
                  height: "100%",
                  background:
                    p.risk > 75
                      ? "#ff4d4f"
                      : p.risk > 50
                      ? "#ffb020"
                      : "#00e0a4",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
