export default function DecisionPanel({ decision }) {
  return (
    <div className="decision">
      <h3>🤖 توصية النظام</h3>
      <p>{decision.message}</p>
    </div>
  )
}
