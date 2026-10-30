import {
  Thermometer,
  Droplets,
  Weight,
  Activity
} from "lucide-react";

const icons = {
  temperature: Thermometer,
  humidity: Droplets,
  weight: Weight,
  activity: Activity
};

export default function SensorCard({ type, title, value, unit }) {
  const Icon = icons[type];

  return (
    <article className="sensor-card">
      <div className="sensor-card-top">
        <span>{title}</span>
        <Icon size={23} />
      </div>

      <div className="sensor-value">
        {Number.isFinite(value) ? value.toFixed(1) : "--"}
        <span>{unit}</span>
      </div>

      <div className="sensor-description">
        Latest sensor measurement
      </div>
    </article>
  );
}