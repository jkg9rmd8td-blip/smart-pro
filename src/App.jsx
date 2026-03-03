import { useState } from "react"

// 👇 Landing موجود في components
import Landing from "./components/Landing"

// 👇 البقية موجودة في pages
import Dashboard from "./pages/Dashboard"
import DigitalTwin from "./pages/DigitalTwin"
import Executive from "./pages/Executive"

export default function App() {
  const [page, setPage] = useState("landing")
  const [risk, setRisk] = useState(0)

  if (page === "landing")
    return <Landing enter={() => setPage("dashboard")} />

  if (page === "dashboard")
    return (
      <Dashboard
        setRisk={setRisk}
        goTwin={() => setPage("twin")}
        goExec={() => setPage("exec")}
      />
    )

  if (page === "twin")
    return <DigitalTwin risk={risk} back={() => setPage("dashboard")} />

  if (page === "exec")
    return <Executive risk={risk} back={() => setPage("dashboard")} />
}