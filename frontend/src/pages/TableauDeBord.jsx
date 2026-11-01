import CameraMonitor from "../components/CameraMonitor";

const Ico = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

const ICONES = {
  temperature: <Ico><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" /></Ico>,
  humidite: <Ico><path d="M12 2.7s6 6.3 6 10.8a6 6 0 0 1-12 0C6 9 12 2.7 12 2.7z" /></Ico>,
  poids: <Ico><path d="M12 3v18M7 21h10M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /><path d="m2 16 3-8 3 8a4.5 4.5 0 0 1-6 0zM16 16l3-8 3 8a4.5 4.5 0 0 1-6 0z" /></Ico>,
  cov: <Ico><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2" /></Ico>,
  activite: <Ico><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M12 8v8M8.5 10v4M15.5 10v4" /></Ico>,
};

const Carte = ({ type, titre, valeur, unite }) => (
  <div className="tb-carte">
    <div className="tb-carte-icone">{ICONES[type]}</div>
    <div className="tb-carte-titre">{titre}</div>
    <div className="tb-carte-valeur">
      {valeur ?? "--"}
      {unite && <small>{unite}</small>}
    </div>
  </div>
);

export default function TableauDeBord({ mesures = [], alertes = [], enLigne = false }) {
  const m = mesures[mesures.length - 1];
  const heure = m ? new Date(m.date).toLocaleTimeString("fr-FR") : "--";

  return (
    <div className="tb">
      {/* Bannière */}
      <section className="tb-hero">
        <div>
          <h2>Bienvenue sur Bee Guardian </h2>
          <p className="tb-hero-sous">Dernière mesure : {heure}</p>
        </div>
        <span className={`tb-statut ${enLigne ? "on" : "off"}`}>
          <i /> {enLigne ? "Capteurs en ligne" : "Capteurs hors ligne"}
        </span>
      </section>

      {/* Mesures */}
      <section className="tb-grille">
        <Carte type="temperature" titre="Température" valeur={m?.temperature?.toFixed(1)} unite="°C" />
        <Carte type="humidite" titre="Humidité" valeur={m?.humidite?.toFixed(0)} unite="%" />
        <Carte type="poids" titre="Poids" valeur={m?.poids?.toFixed(2)} unite="kg" />
        <Carte type="cov" titre="COV" valeur={m?.cov} unite="" />
        <Carte type="activite" titre="Activité" valeur={m ? m.entrees + m.sorties : null} unite="passages" />
      </section>

      {/* Alertes */}
      <section className="tb-section">
        <div className="tb-section-tete">
          <h3>Alertes en cours</h3>
          <span className={`tb-compteur ${alertes.length ? "warn" : ""}`}>{alertes.length}</span>
        </div>
        {alertes.length === 0 ? (
          <p className="tb-ok">✅ Tout va bien, aucune alerte.</p>
        ) : (
          alertes.slice(0, 3).map((a, i) => (
            <div key={i} className="tb-alerte">
              <b>{a.titre}</b>
              <span>{a.explication}</span>
            </div>
          ))
        )}
      </section>

      <CameraMonitor />
    </div>
  );
}