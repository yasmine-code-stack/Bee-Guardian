import fr from "../i18n/fr";
import CarteMesure from "../components/CarteMesure";

const CAPTEURS = ["temperature", "humidite", "cov", "entrees", "sorties", "poids"];

export default function Systeme({ mesures }) {
  if (!mesures || mesures.length === 0) {
    return <p className="message-vide">{fr.commun.chargement}</p>;
  }
  const d = mesures[mesures.length - 1];
  const s = fr.pages.systeme;

  return (
    <>
      <h2 className="page-titre">{s.titre}</h2>

      <div className="grille-cartes">
        <CarteMesure titre={fr.capteurs.batterie.nom} valeur={100}
  unite="%" etat="ok" />

        
        <CarteMesure titre={s.connexion} valeur="Actif" unite=""
          etat="ok" />
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