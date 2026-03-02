return (
  <div className="dashboard">

    {/* CENTER أول شيء في الموبايل */}
    <div className="center-panel">
      <h2>🏁 Race Command Center</h2>
      <CircularGauge value={data.risk.crashRisk} />
      <p style={{ marginTop: 20 }}>{data.decision.message}</p>
      <button onClick={goTwin}>🧬 Digital Twin</button>
      <button onClick={goExec}>📊 Executive Mode</button>
    </div>

    {/* HUD */}
    <div className="panel">
      <div className="hud-title">📡 Live Telemetry</div>
      <div className="metric">HR: {Math.round(data.vitals.hr)}</div>
      <div className="metric">Hydration: {Math.round(data.vitals.hydration)}%</div>
      <div className="metric">Core Temp: {data.vitals.coreTemp.toFixed(1)}°C</div>
      <div className="metric">Reaction: {Math.round(data.vitals.reactionTime)} ms</div>
    </div>

    {/* Tactical */}
    <div className="panel">
      <div className="hud-title">🏎 Sector Performance</div>
      <div className="metric">Sector 1: {(Math.random()*30+30).toFixed(2)}s</div>
      <div className="metric">Sector 2: {(Math.random()*30+30).toFixed(2)}s</div>
      <div className="metric">Sector 3: {(Math.random()*30+30).toFixed(2)}s</div>
      <div className="metric">Brake Temp: {Math.round(data.stress.brakeRisk)}%</div>
    </div>

  </div>
)