import ExecutivePanel from "../components/ExecutivePanel"

export default function Executive({ risk, back }) {
  return (
    <div className="page">
      <h2>📊 Executive Mode</h2>
      <ExecutivePanel risk={risk}/>
      <button onClick={back}>⬅ رجوع</button>
    </div>
  )
}
