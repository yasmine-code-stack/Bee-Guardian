import fr from "../i18n/fr";
import CarteMesure from "../components/CarteMesure";
import Graphique from "../components/Graphique";

export default function Poids({ mesures }) {
  if (!mesures || mesures.length === 0) {
    return <p className="message-vide">{fr.commun.chargement}</p>;
  }
  const actuel = mesures[mesures.length - 1].poids;
  const reference = mesures[0].poids;
  const variation = actuel - reference;
  // Perte de plus de 0,5 kg = attention (essaimage ou pillage possible)
  const etatVariation = variation < -0.5 ? "attention" : "ok";

  return (
    <>
      <h2 className="page-titre">{fr.pages.poids.titre}</h2>

      <div className="grille-cartes">
        <CarteMesure titre={fr.pages.poids.actuel} valeur={actuel} unite="kg" />
        <CarteMesure
          titre={fr.pages.poids.variation}
          valeur={variation}
          unite="kg"
          etat={etatVariation}
          details={variation >= 0 ? "Poids en hausse (miellée)" : "Poids en baisse"}
        />
      </div>

      <Graphique data={mesures} dataKey="poids" titre={fr.capteurs.poids.nom}
        unite="kg" couleur="#5d4037" />
    </>
  );
}