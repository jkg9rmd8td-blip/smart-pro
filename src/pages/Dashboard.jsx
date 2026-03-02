import { useEffect, useState } from "react"
import { calculateHumanState } from "../engines/humanEngine"
import { calculateCarStress } from "../engines/telemetryEngine"
import { calculateRisk } from "../engines/riskEngine"
import { getDecision } from "../engines/decisionEngine"
import CircularGauge from "../components/CircularGauge"

export default function Dashboard({ setRisk, goTwin, goExec }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {

      const vitals = {
        hr: 150 + Math.random() * 30,
        coreTemp: 37 + Math.random(),
        hydration: 70 + Math.random() * 15,
        reactionTime: 200 + Math.random() * 50
      }

      const car = {
        FL: Math.random() * 100,
        FR: Math.random() * 100,
        RL: Math.random() * 100,
        RR: Math.random() * 100,
        brakeTemp: 400 + Math.random() * 150
      }

      const human = calculateHumanState(vitals)
      const stress = calculateCarStress(car)
      const risk = calculateRisk(human, stress)
      const decision = getDecision(risk)

      setRisk(risk.crashRisk)

      setData({
        vitals,
        human,
        stress,
        risk,
        decision
      })

    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (!data) return <div style={{padding:40}}>Loading...</div>

  return (
    <div className="dashboard-container">

      {/* LEFT PANEL */}
      <div className="panel">

        <h3 className="panel-title">📡 Live Telemetry</h3>

        <div className="metric">HR: {Math.round(data.vitals.hr)}</div>
        <div className="metric">Core Temp: {data.vitals.coreTemp.toFixed(1)}°C</div>
        <div className="metric">Hydration: {Math.round(data.vitals.hydration)}%</div>
        <div className="metric">Reaction: {Math.round(data.vitals.reactionTime)} ms</div>

        <h3 className="panel-title" style={{marginTop:20}}>🔥 Tire Heatmap</h3>
        <div className="metric">FL: {Math.round(data.stress.tireRisk)}%</div>
        <div className="metric">Brake: {Math.round(data.stress.brakeRisk)}%</div>

      </div>

      {/* CENTER */}
      <div className="center-panel">

        <h2>🏁 Race Command Center</h2>

        <CircularGauge value={data.risk.crashRisk} />

        <p className="decision-text">
          {data.decision.message}
        </p>

        <div className="button-group">
          <button onClick={goTwin}>🧬 Digital Twin</button>
          <button onClick={goExec}>📊 Executive</button>
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="panel">

        <h3 className="panel-title">🏎 Sector Times</h3>

        <div className="metric">Sector 1: {(Math.random()*30+30).toFixed(2)}s</div>
        <div className="metric">Sector 2: {(Math.random()*30+30).toFixed(2)}s</div>
        <div className="metric">Sector 3: {(Math.random()*30+30).toFixed(2)}s</div>

        <h3 className="panel-title" style={{marginTop:20}}>🧠 Human State</h3>

        <div className="metric">Fatigue: {data.human.fatigueIndex}%</div>
        <div className="metric">Cognitive Load: {data.human.cognitiveLoad}%</div>

      </div>

    </div>
  )
}