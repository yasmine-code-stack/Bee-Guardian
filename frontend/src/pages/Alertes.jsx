const ICONES = { critique: "🔴", avertissement: "🟠", info: "🔵" };

export default function Alertes({ alertes = [] }) {
  if (alertes.length === 0)
    return <div className="carte">✅ Aucune alerte : la ruche va bien.</div>;

  return (
    <div>
      <h2>Alertes ({alertes.length})</h2>
      {alertes.map((a, i) => (
        <div key={i} className={`alerte ${a.niveau}`}
          style={{ background: "#fff", borderRadius: 10, padding: "12px 16px", marginBottom: 10,
            borderLeft: `5px solid ${a.niveau === "critique" ? "#c62828" : a.niveau === "avertissement" ? "#ef8a17" : "#1e78d6"}` }}>
          <h3>{ICONES[a.niveau]} {a.titre}</h3>
          <p><b>Pourquoi ?</b> {a.explication}</p>
          <p><b>Que faire ?</b> {a.action}</p>
        </div>
      ))}
    </div>
  );
}