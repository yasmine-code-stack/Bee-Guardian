import { useState } from "react";
import Menu from "./components/Menu";
import useMesures from "./hooks/useMesures";
import { genererAlertes } from "./services/alertes";
import TableauDeBord from "./pages/TableauDeBord";
import Environnement from "./pages/Environnement";
import Activite from "./pages/Activite";
import Poids from "./pages/Poids";
import Localisation from "./pages/Localisation";
import Systeme from "./pages/Systeme";
import Alertes from "./pages/Alertes";

const PAGES = {
  tableau: TableauDeBord,
  environnement: Environnement,
  activite: Activite,
  poids: Poids,
  localisation: Localisation,
  systeme: Systeme,
  alertes: Alertes,
};

export default function App() {
  const [page, setPage] = useState("tableau");
  const { mesures, enLigne, erreur, chargement } = useMesures();
  const alertes = genererAlertes(mesures, null, enLigne);
  const Page = PAGES[page] || TableauDeBord;

  return (
    <div className="app-layout">
      <Menu pageActive={page} onNavigate={setPage} />
      <main className="contenu">
        {erreur && <p style={{ color: "crimson" }}>Erreur ThingSpeak : {erreur}</p>}
        {chargement
          ? <p>Chargement des données…</p>
          : <Page mesures={mesures} alertes={alertes} enLigne={enLigne} />}
      </main>
    </div>
  );
}