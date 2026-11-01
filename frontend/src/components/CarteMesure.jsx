import fr from "../i18n/fr";

export default function CarteMesure({ titre, valeur, unite, etat = "ok", details }) {
    const affichage =
    typeof valeur === "string"
      ? valeur
      : typeof valeur === "number" && !Number.isNaN(valeur)
        ? valeur.toFixed(1)
        : "--";

  return (
    <div className={`carte ${etat}`}>
      <h3 className="carte-titre">{titre}</h3>
      <p className="carte-valeur">
        {affichage}
        <span className="carte-unite">{unite}</span>
      </p>
      <span className={`badge ${etat}`}>{fr.etats[etat]}</span>
      {details && <p className="carte-details">{details}</p>}
    </div>
  );
}