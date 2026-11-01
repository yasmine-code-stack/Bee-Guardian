import fr from "../i18n/fr";
import CarteMesure from "../components/CarteMesure";

const CAPTEURS = ["temperature", "humidite", "cov", "entrees", "sorties", "poids"];

function ageTexte(date) {
  const s = Math.round((Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return `${fr.commun.il_y_a} ${s} ${fr.commun.secondes}`;
  return `${fr.commun.il_y_a} ${Math.round(s / 60)} ${fr.commun.minutes}`;
}

export default function Systeme({ mesures }) {
  if (!mesures || mesures.length === 0) {
    return <p className="message-vide">{fr.commun.chargement}</p>;
  }
  const d = mesures[mesures.length - 1];
  const ageSecondes = (Date.now() - new Date(d.date).getTime()) / 1000;
  const enLigne = ageSecondes < 120;
  const etatBatterie = d.batterie < 20 ? "danger" : d.batterie < 40 ? "attention" : "ok";
  const s = fr.pages.systeme;

  return (
    <>
      <h2 className="page-titre">{s.titre}</h2>

      <div className="grille-cartes">
        <CarteMesure titre={fr.capteurs.batterie.nom} valeur={d.batterie}
          unite="%" etat={etatBatterie} />
        <CarteMesure titre={s.connexion} valeur={NaN} unite=""
          etat={enLigne ? "ok" : "danger"}
          details={`${enLigne ? s.enLigne : s.horsLigne} · ${s.derniereReception} : ${ageTexte(d.date)}`} />
      </div>

      <div className="graphique">
        <h3>{s.capteurs}</h3>
        <ul className="liste-systeme">
          {CAPTEURS.map((cle) => {
            const ok = Number.isFinite(d[cle]);
            return (
              <li key={cle}>
                <span>{fr.capteurs[cle].nom}</span>
                <span className={`badge ${ok ? "ok" : "danger"}`}>
                  {ok ? s.capteurOk : s.capteurAbsent}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}