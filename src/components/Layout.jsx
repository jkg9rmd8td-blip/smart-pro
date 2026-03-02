import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

export default function Layout({ children }) {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main-area">
        <Topbar />
        <div className="content">
          {children}
        </div>
      </div>

      <div className="right-panel">
        <h3>📡 Live Feed</h3>
        <div className="feed-box">Telemetry Stream</div>
        <div className="feed-box">Pit Strategy</div>
        <div className="feed-box">Weather Sync</div>
      </div>

    </div>
  )
}