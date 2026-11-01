import { useState } from "react";
import Menu from "./components/Menu";
import Environnement from "./pages/Environnement";
import Activite from "./pages/Activite";
import Poids from "./pages/Poids";
import Localisation from "./pages/Localisation";
import Systeme from "./pages/Systeme";
import { mesuresFactices } from "./mockData";

const PAGES = { environnement: Environnement, activite: Activite, poids: Poids,
  localisation: Localisation, systeme: Systeme };

export default function Preview() {
  const [page, setPage] = useState("environnement");
  const Page = PAGES[page];

  return (
    <div className="app-layout">
      <Menu pageActive={page} onNavigate={setPage} />
      <main className="contenu">
        {Page ? <Page mesures={mesuresFactices} /> : <p>Page de A (pas encore là)</p>}
      </main>
    </div>
  );
}