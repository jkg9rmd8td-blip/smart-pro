import CircularGauge from "./CircularGauge"

export default function DriverCard({ data }) {
  return (
    <div className="card">
      <h3>🏎 حالة السائق</h3>
      <p>النبض: {Math.round(data.vitals.hr)}</p>
      <p>الإجهاد: {data.human.fatigueIndex}%</p>
      <CircularGauge value={data.risk.crashRisk} />
    </div>
  )
}
