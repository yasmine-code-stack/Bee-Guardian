import fr from "../i18n/fr";
import CarteMesure from "../components/CarteMesure";
import Graphique from "../components/Graphique";

const etatTemperature = (t) => (t < 30 || t > 38 ? "danger" : t < 32 || t > 36 ? "attention" : "ok");
const etatHumidite = (h) => (h < 40 || h > 80 ? "danger" : h < 50 || h > 70 ? "attention" : "ok");
const etatCov = (c) => (c > 400 ? "danger" : c > 250 ? "attention" : "ok");

export default function Environnement({ mesures }) {
  if (!mesures || mesures.length === 0) {
    return <p className="message-vide">{fr.commun.chargement}</p>;
  }
  const d = mesures[mesures.length - 1];
  const c = fr.capteurs;

  return (
    <>
      <h2 className="page-titre">{fr.pages.environnement.titre}</h2>

      <div className="grille-cartes">
        <CarteMesure titre={c.temperature.nom} valeur={d.temperature}
          unite={c.temperature.unite} etat={etatTemperature(d.temperature)}
          details="Idéal : 32 à 36 °C" />
        <CarteMesure titre={c.humidite.nom} valeur={d.humidite}
          unite={c.humidite.unite} etat={etatHumidite(d.humidite)}
          details="Idéal : 50 à 70 %" />
        <CarteMesure titre={c.cov.nom} valeur={d.cov}
          unite={c.cov.unite} etat={etatCov(d.cov)}
          details="Normal : moins de 250" />
      </div>

      <div className="grille-graphiques">
        <Graphique data={mesures} dataKey="temperature" titre={c.temperature.nom}
          unite={c.temperature.unite} couleur="#e65100" />
        <Graphique data={mesures} dataKey="humidite" titre={c.humidite.nom}
          unite={c.humidite.unite} couleur="#0277bd" />
        <Graphique data={mesures} dataKey="cov" titre={c.cov.nom}
          unite={c.cov.unite} couleur="#6a1b9a" />
      </div>
    </>
  );
}