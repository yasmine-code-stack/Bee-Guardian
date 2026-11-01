import fr from "../i18n/fr";
import "../dashboard.css";

const PAGES = [
  { id: "tableau", icone: "🏠" },
  { id: "environnement", icone: "🌡️" },
  { id: "activite", icone: "🐝" },
  { id: "poids", icone: "⚖️" },
  { id: "localisation", icone: "📍" },
  { id: "systeme", icone: "⚙️" },
  { id: "alertes", icone: "🚨" },
];

export default function Menu({ pageActive, onNavigate }) {
  return (
    <nav className="menu">
      <h1 className="menu-titre">🍯 {fr.app.titre}</h1>
      <p className="menu-sous-titre">{fr.app.sousTitre}</p>

      {PAGES.map((page) => (
        <button
          key={page.id}
          className={`menu-bouton ${pageActive === page.id ? "actif" : ""}`}
          onClick={() => onNavigate(page.id)}
        >
          <span>{page.icone}</span>
          {fr.menu[page.id]}
        </button>
      ))}
    </nav>
  );
}