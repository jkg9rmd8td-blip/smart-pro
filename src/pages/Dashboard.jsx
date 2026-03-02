import { motion } from "framer-motion";

const players = [
  { name: "محمد أحمد", position: "حارس مرمى", heartRate: 78, temp: 36.8, oxygen: 98, risk: 22 },
  { name: "علي سالم", position: "مدافع", heartRate: 88, temp: 37.2, oxygen: 96, risk: 55 },
  { name: "فهد محمود", position: "مهاجم", heartRate: 95, temp: 37.5, oxygen: 94, risk: 76 },
];

export default function Dashboard() {

  const avgRisk =
    players.reduce((sum, p) => sum + p.risk, 0) / players.length;

  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>مركز القيادة الصحية التنبؤية</h1>

      {/* مؤشر الخطر الجماعي */}
      <div
        style={{
          background: "rgba(20,30,50,0.6)",
          padding: 25,
          borderRadius: 18,
          marginBottom: 30,
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        <h3>مؤشر المخاطر الجماعي</h3>
        <div style={{
          fontSize: 42,
          color:
            avgRisk > 70
              ? "#ff4d4f"
              : avgRisk > 40
              ? "#ffb020"
              : "#00e0a4"
        }}>
          {Math.round(avgRisk)}%
        </div>
      </div>

      {/* كروت اللاعبين */}
      <div style={{ display: "grid", gap: 20 }}>
        {players.map((player, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            style={{
              background: "rgba(20,30,50,0.6)",
              padding: 20,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.05)"
            }}
          >
            <h3>{player.name}</h3>
            <p style={{ color: "#9ca3af" }}>{player.position}</p>

            <div style={{ marginTop: 12 }}>
              <div>❤️ نبض: {player.heartRate} bpm</div>
              <div>🌡 حرارة: {player.temp}°</div>
              <div>💨 أكسجين: {player.oxygen}%</div>
            </div>

            {/* مؤشر خطر فردي */}
            <div
              style={{
                marginTop: 15,
                height: 8,
                background: "#1f2937",
                borderRadius: 10,
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${player.risk}%`,
                  height: "100%",
                  transition: "0.5s",
                  background:
                    player.risk > 70
                      ? "#ff4d4f"
                      : player.risk > 40
                      ? "#ffb020"
                      : "#00e0a4"
                }}
              />
            </div>

            <p style={{ marginTop: 6 }}>مؤشر الخطر: {player.risk}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
