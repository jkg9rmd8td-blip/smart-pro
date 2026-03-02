export default function RiskTimeline({ history }) {
  return (
    <div className="timeline">
      <h3>📉 سجل المخاطر</h3>
      {history.slice(-5).map((r,i) => (
        <div key={i}>⚡ {r}%</div>
      ))}
    </div>
  )
}
