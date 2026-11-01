import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import fr from "../i18n/fr";

const formaterHeure = (iso) =>
  new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

export default function Graphique({
  data, dataKey, titre, unite = "", couleur = "#2e7d32", type = "ligne",
}) {
  if (!data || data.length === 0) {
    return (
      <div className="graphique">
        <h3>{titre}</h3>
        <p className="message-vide">{fr.commun.aucuneDonnee}</p>
      </div>
    );
  }

  const Chart = type === "barres" ? BarChart : LineChart;

  return (
    <div className="graphique">
      <h3>{titre} {unite && `(${unite})`}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <Chart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" tickFormatter={formaterHeure} fontSize={12} />
          <YAxis fontSize={12} domain={["auto", "auto"]} />
          <Tooltip
            labelFormatter={(v) => new Date(v).toLocaleString("fr-FR")}
            formatter={(v) => [`${Number(v).toFixed(1)} ${unite}`, titre]}
          />
          {type === "barres" ? (
            <Bar dataKey={dataKey} fill={couleur} />
          ) : (
            <Line type="monotone" dataKey={dataKey} stroke={couleur}
                  strokeWidth={2} dot={false} />
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}