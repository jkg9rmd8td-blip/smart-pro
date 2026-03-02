export default function ExecutivePanel({ risk }) {
  const cost = risk * 15000
  return (
    <div className="card">
      <h3>📊 نظرة تنفيذية</h3>
      <p>مستوى المخاطر: {risk}%</p>
      <p>تأثير مالي محتمل: {cost.toLocaleString()} ريال</p>
    </div>
  )
}
