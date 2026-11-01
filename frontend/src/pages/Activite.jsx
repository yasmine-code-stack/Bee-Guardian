import fr from "../i18n/fr";
import CarteMesure from "../components/CarteMesure";
import Graphique from "../components/Graphique";

export default function Activite({ mesures }) {
  if (!mesures || mesures.length === 0) {
    return <p className="message-vide">{fr.commun.chargement}</p>;
  }
  const d = mesures[mesures.length - 1];
  const totalEntrees = mesures.reduce((s, m) => s + (m.entrees || 0), 0);
  const totalSorties = mesures.reduce((s, m) => s + (m.sorties || 0), 0);
  const c = fr.capteurs;

  return (
    <>
      <h2 className="page-titre">{fr.pages.activite.titre}</h2>

      <div className="grille-cartes">
        <CarteMesure titre={c.entrees.nom} valeur={d.entrees} unite={c.entrees.unite}
          details={`Total sur la période : ${totalEntrees}`} />
        <CarteMesure titre={c.sorties.nom} valeur={d.sorties} unite={c.sorties.unite}
          details={`Total sur la période : ${totalSorties}`} />
        <CarteMesure titre={fr.pages.activite.bilan} valeur={totalEntrees - totalSorties}
          unite={c.entrees.unite} />
      </div>

      <div className="grille-graphiques">
        <Graphique data={mesures} dataKey="entrees" titre={c.entrees.nom}
          unite={c.entrees.unite} couleur="#2e7d32" type="barres" />
        <Graphique data={mesures} dataKey="sorties" titre={c.sorties.nom}
          unite={c.sorties.unite} couleur="#ef6c00" type="barres" />
      </div>
    </>
  );
}