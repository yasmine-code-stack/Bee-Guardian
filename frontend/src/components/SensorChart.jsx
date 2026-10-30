
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function SensorChart({ data }) {
  const chartData = (data || []).map((item) => ({
    time: new Date(item.time).toLocaleTimeString(),
    temperature: item.temperature,
    humidity: item.humidity,
    weight: item.weight
  }));

  return (
    <section className="panel">
      <h2>Environmental Monitoring</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            {/* Left axis: temperature and humidity */}
            <YAxis yAxisId="left" />

            {/* Right axis: weight */}
            <YAxis
              yAxisId="right"
              orientation="right"
            />

            <Tooltip />
            <Legend />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              name="Temperature °C"
              stroke="#E5A52B"
              strokeWidth={3}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="humidity"
              name="Humidity %"
              stroke="#3189B9"
              strokeWidth={3}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="weight"
              name="Hive Weight (kg)"
              stroke="#16A34A"
              strokeWidth={3}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
