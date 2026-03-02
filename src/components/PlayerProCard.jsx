import { motion } from "framer-motion";

export default function PlayerProCard({ player }) {
  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3>{player.name}</h3>
      <p style={{ color: "#9ca3af" }}>{player.position}</p>

      <div style={{ marginTop: 12 }}>
        <div>❤️ نبض: {player.heartRate} bpm</div>
        <div>🌡 حرارة: {player.temp}°</div>
        <div>💨 أكسجين: {player.oxygen}%</div>
      </div>

      <div style={{
        marginTop: 14,
        height: 8,
        background: "#1f2937",
        borderRadius: 10,
        overflow: "hidden"
      }}>
        <div
          style={{
            width: `${player.risk}%`,
            background:
              player.risk > 70
                ? "var(--danger)"
                : player.risk > 40
                ? "var(--warning)"
                : "var(--primary)",
            height: "100%",
            transition: "0.5s"
          }}
        />
      </div>
      <p style={{ marginTop: 6 }}>مؤشر الخطر: {player.risk}%</p>
    </motion.div>
  );
}
