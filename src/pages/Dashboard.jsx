import { useEffect, useState } from "react"
import { calculateHumanState } from "../engines/humanEngine"
import { calculateCarStress } from "../engines/telemetryEngine"
import { calculateRisk } from "../engines/riskEngine"
import { getDecision } from "../engines/decisionEngine"
import DriverCard from "../components/DriverCard"
import Heatmap from "../components/Heatmap"
import RiskTimeline from "../components/RiskTimeline"
import AlertFeed from "../components/AlertFeed"
import DecisionPanel from "../components/DecisionPanel"

export default function Dashboard({ setRisk, goTwin, goExec }) {
  const [data,setData] = useState({})
  const [history,setHistory] = useState([])

  useEffect(()=>{
    const i=setInterval(()=>{
      const vitals={
        hr:150+Math.random()*30,
        coreTemp:37+Math.random(),
        hydration:75+Math.random()*10,
        reactionTime:200+Math.random()*40
      }
      const car={
        FL:Math.random()*100,
        FR:Math.random()*100,
        RL:Math.random()*100,
        RR:Math.random()*100,
        brakeTemp:400+Math.random()*100
      }
      const human=calculateHumanState(vitals)
      const stress=calculateCarStress(car)
      const risk=calculateRisk(human,stress)
      const decision=getDecision(risk)

      setRisk(risk.crashRisk)
      setData({vitals,human,stress,risk,decision})
      setHistory(h=>[...h,risk.crashRisk])
    },2000)

    return()=>clearInterval(i)
  },[])

  if(!data.vitals) return <div>Loading...</div>

  return(
    <div className="dashboard">
      <DriverCard data={data}/>
      <Heatmap tires={data.stress}/>
      <RiskTimeline history={history}/>
      <AlertFeed risk={data.risk.crashRisk}/>
      <DecisionPanel decision={data.decision}/>
      <button onClick={goTwin}>🧬 Digital Twin</button>
      <button onClick={goExec}>📊 Executive</button>
    </div>
  )
}
