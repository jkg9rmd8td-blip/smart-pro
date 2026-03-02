import { useEffect, useState } from "react"
import { calculateHumanState } from "../engines/humanEngine"
import { calculateCarStress } from "../engines/telemetryEngine"
import { calculateRisk } from "../engines/riskEngine"
import { getDecision } from "../engines/decisionEngine"
import CircularGauge from "../components/CircularGauge"

export default function Dashboard({ setRisk, goTwin, goExec }) {
  const [data, setData] = useState({})

  useEffect(() => {
    const i = setInterval(() => {
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
      setData({ vitals, human, stress, risk, decision })
    }, 2000)

    return () => clearInterval(i)
  }, [])

  if (!data.vitals) return <div>Loading...</div>

  return (
    <div className="dashboard">

      {/* LEFT HUD */}
      <div className="panel">
        <div className="hud-title">📡 Live Telemetry</div>
        <div className="metric">HR: {Math.round(data.vitals.hr)}</div>
        <div className="metric">Hydration: {Math.round(data.vitals.hydration)}%</div>
        <div className="metric">Core Temp: {data.vitals.coreTemp.toFixed(1)}°C</div>
        <div className="metric">Reaction: {Math.round(data.vitals.reactionTime)} ms</div>
      </div>

      {/* CENTER COMMAND */}
      <div className="center-panel">
        <h2>🏁 Race Command Center</h2>
        <CircularGauge value={data.risk.crashRisk} />
        <p style={{ marginTop: 20 }}>{data.decision.message}</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="panel">
        <div className="hud-title">🏎 Sector Performance</div>
        <div className="metric">Sector 1: {(Math.random()*30+30).toFixed(2)}s</div>
        <div className="metric">Sector 2: {(Math.random()*30+30).toFixed(2)}s</div>
        <div className="metric">Sector 3: {(Math.random()*30+30).toFixed(2)}s</div>
        <div className="metric">Brake Temp: {Math.round(data.stress.brakeRisk)}%</div>
      </div>

    </div>
  )
}