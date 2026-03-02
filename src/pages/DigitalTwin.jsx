import DigitalTwinCanvas from "../components/DigitalTwinCanvas"

export default function DigitalTwin({ risk, back }) {
  return (
    <div className="page">
      <h2>🧬 Digital Twin</h2>
      <DigitalTwinCanvas stress={risk}/>
      <button onClick={back}>⬅ رجوع</button>
    </div>
  )
}
