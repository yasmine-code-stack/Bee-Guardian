import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  RefreshCw,
  Wifi,
  WifiOff,
  Hexagon
} from "lucide-react";

import { getHiveData } from "./services/thingspeak";

import SensorCard from "./components/SensorCard";
import SensorChart from "./components/SensorChart";
import AlertPanel from "./components/AlertPanel";
import CameraMonitor from "./components/CameraMonitor";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  async function loadData() {
    try {
      const result = await getHiveData();

      setData(result);
      setError("");
      setLastChecked(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 20000);

    return () => clearInterval(interval);
  }, []);

  const latest = data.length > 0 ? data[data.length - 1] : null;
  console.log("LATEST HIVE DATA:", latest);
console.log("ALL HIVE DATA:", data);

  const isOnline =
    latest &&
    Date.now() - new Date(latest.time).getTime() < 120000;

  return (
    <div className="app-layout">

      <aside className="sidebar">
        <div className="brand">
          <Hexagon size={30} />
          <span>BEE GUARDIAN</span>
        </div>

        <nav>
          <a className="active" href="#overview">
            <LayoutDashboard size={19} />
            Dashboard
          </a>

          <a href="#camera">
            <span>📷</span>
            Camera
          </a>

          <a href="#sensors">
            <span>📊</span>
            Sensors
          </a>

          <a href="#alerts">
            <span>🔔</span>
            Alerts
          </a>
        </nav>

        <div className="sidebar-footer">
          Smart Beehive Monitoring
        </div>
      </aside>

      <main className="main-content">

        <header className="topbar">
          <div>
            <h1>Hive Overview</h1>
            <p>Monitor your beehive environment</p>
          </div>

          <div className="topbar-actions">
            <span className={isOnline ? "online" : "offline"}>
              {isOnline
                ? <Wifi size={16} />
                : <WifiOff size={16} />}
              {isOnline ? "Sensors Online" : "Sensors Offline"}
            </span>

            <button
              className="refresh-button"
              onClick={loadData}
              disabled={loading}
              title="Refresh measurements"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </header>

        <section id="overview" className="welcome-panel">
          <div>
            <h2>Welcome to Bee Guardian 🐝</h2>
            <p>
              Your smart beehive monitoring platform.
            </p>
          </div>

          <div className="last-update">
            Last checked:{" "}
            {lastChecked
              ? lastChecked.toLocaleTimeString()
              : "Not available"}
          </div>
        </section>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading && (
          <p>Loading measurements...</p>
        )}

        <section id="sensors" className="sensor-grid">

          <SensorCard
            type="temperature"
            title="Temperature"
            value={latest?.temperature}
            unit="°C"
          />

          <SensorCard
            type="humidity"
            title="Humidity"
            value={latest?.humidity}
            unit="%"
          />

          <SensorCard
            type="weight"
            title="Hive Weight"
            value={latest?.weight}
            unit="kg"
          />

          <SensorCard
            type="activity"
            title="Bee Activity"
            value={latest?.activity}
            unit="%"
          />

        </section>

        <section className="content-grid">

          <div className="main-column">

            <div id="camera">
              <CameraMonitor />
            </div>

            {data.length > 0 && (
              <SensorChart data={data} />
            )}

          </div>

          <div className="side-column">

            <div id="alerts">
              <AlertPanel sensor={latest} />
            </div>

            <section className="panel">
              <h2>System Information</h2>

              <div className="info-row">
                <span>Data source</span>
                <strong>ThingSpeak</strong>
              </div>

              <div className="info-row">
                <span>Camera</span>
                <strong>Local Webcam</strong>
              </div>

              <div className="info-row">
                <span>Refresh interval</span>
                <strong>20 seconds</strong>
              </div>

              <div className="info-row">
                <span>Measurements</span>
                <strong>{data.length}</strong>
              </div>
            </section>

          </div>

        </section>

        <footer className="footer">
          Bee Guardian © 2026 — Smart Beehive Monitoring System
        </footer>

      </main>
    </div>
  );
}

export default App;