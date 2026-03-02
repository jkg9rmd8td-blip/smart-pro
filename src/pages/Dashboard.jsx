import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialPlayers = [
  { id: 1, name: "محمد أحمد", position: "حارس مرمى", heartRate: 78, temp: 36.8, oxygen: 98 },
  { id: 2, name: "علي سالم", position: "مدافع", heartRate: 88, temp: 37.2, oxygen: 96 },
  { id: 3, name: "فهد محمود", position: "مهاجم", heartRate: 95, temp: 37.5, oxygen: 94 },
];

const calculateRisk = (p) => {
  return Math.min(
    100,
    Math.round(
      (p.heartRate * 0.4) +
      ((p.temp - 36) * 20) +
      ((100 - p.oxygen) * 2)
    )
  );
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState(
    initialPlayers.map(p => ({ ...p, risk: calculateRisk(p) }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(prev =>
        prev.map(p => {
          const newHR = p.heartRate + (Math.random() * 6 - 3);
          const newTemp = p.temp + (Math.random() * 0.2 - 0.1);
          const newO2 = p.oxygen + (Math.random() * 2 - 1);

          const updated = {
            ...p,
            heartRate: Math.round(newHR),
            temp: parseFloat(newTemp.toFixed(1)),
            oxygen: Math.round(newO2)
          };

          return { ...updated, risk: calculateRisk(updated) };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const avgRisk =
    players.reduce((sum, p) => sum + p.risk, 0) / players.length;

  const getColor = (risk) => {
    if (risk > 75) return "#ff4d4f";
    if (risk > 50) return "#ffb020";
    return "#00e0a4";
  };

  return (
    <div>

      <h1>مركز القيادة الصحية التنبؤية</h1>

      {/* مؤشر جماعي */}
      <div style={{
        marginTop: 30,
        background: "rgba(20,30,50,0.7)",
        padding: 25,
        borderRadius: 18
      }}>
        <h3>مؤشر المخاطر الجماعي</h3>
        <div style={{
          fontSize: 42,
          fontWeight: "bold",
          color: getColor(avgRisk)
        }}>
          {Math.round(avgRisk)}%
        </div>
      </div>

      {/* AI Panel */}
      <div style={{
        marginTop: 30,
        padding: 20,
        background: "rgba(0,0,0,0.4)",
        borderRadius: 16
      }}>
        <h3>AI Decision Panel</h3>

        {players.map(p => (
          <div key={p.id} style={{ marginTop: 10 }}>
            {p.risk > 75 && (
              <div style={{ color: "#ff4d4f" }}>
                🔴 استبدال فوري لـ {p.name}
              </div>
            )}
            {p.risk > 50 && p.risk <= 75 && (
              <div style={{ color: "#ffb020" }}>
                🟠 تقليل الحمل على {p.name}
              </div>
            )}
            {p.risk <= 50 && (
              <div style={{ color: "#00e0a4" }}>
                🟢 {p.name} مستقر
              </div>
            )}
          </div>
        ))}
      </div>

      {/* كروت اللاعبين */}
      <div style={{ display: "grid", gap: 20, marginTop: 30 }}>
        {players.map(player => (
          <div
            key={player.id}
            onClick={() => navigate(`/player/${player.id}`)}
            style={{
              cursor: "pointer",
              background: "rgba(20,30,50,0.7)",
              padding: 20,
              borderRadius: 18
            }}
          >
            <h3>{player.name}</h3>
            <p style={{ color: "#9ca3af" }}>{player.position}</p>

            ❤️ {player.heartRate} bpm  
            🌡 {player.temp}°  
            💨 {player.oxygen}%  

            <div style={{
              marginTop: 12,
              height: 8,
              background: "#1f2937",
              borderRadius: 10,
              overflow: "hidden"
            }}>
              <div style={{
                width: `${player.risk}%`,
                height: "100%",
                background: getColor(player.risk)
              }} />
            </div>

            <p>خطر: {player.risk}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
