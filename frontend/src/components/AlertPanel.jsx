import { AlertTriangle, CheckCircle } from "lucide-react";

export function getHiveAlerts(sensor) {
  if (!sensor) return [];

  const alerts = [];

  if (sensor.temperature > 38) {
    alerts.push("High temperature detected");
  }

  if (sensor.temperature < 10) {
    alerts.push("Low temperature detected");
  }

  if (sensor.humidity < 40) {
    alerts.push("Low humidity detected");
  }

  if (sensor.weight < 20) {
    alerts.push("Hive weight is low");
  }

  if (sensor.activity < 15) {
    alerts.push("Low bee activity detected");
  }

  return alerts;
}

export default function AlertPanel({ sensor }) {
  const alerts = getHiveAlerts(sensor);

  return (
    <section className="panel">
      <h2>Hive Alerts</h2>

      {alerts.length === 0 ? (
        <div className="healthy-message">
          <CheckCircle size={20} />
          No threshold alerts detected
        </div>
      ) : (
        alerts.map((alert, index) => (
          <div className="alert-item" key={index}>
            <AlertTriangle size={20} />
            {alert}
          </div>
        ))
      )}
    </section>
  );
}