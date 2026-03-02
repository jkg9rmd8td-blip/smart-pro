export default function Heatmap({ tires }) {
  const color = (v) =>
    v > 70 ? "#ef4444" :
    v > 50 ? "#facc15" :
    "#22c55e"

  return (
    <div className="card">
      <h3>🔥 Heatmap الإطارات</h3>
      {Object.entries(tires).map(([k,v]) => (
        <div key={k} style={{ background: color(v), padding: 8, margin: 4 }}>
          {k}: {Math.round(v)}%
        </div>
      ))}
    </div>
  )
}
