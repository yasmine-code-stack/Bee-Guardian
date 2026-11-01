import { useEffect, useState } from "react";
import { fetchMesures } from "../services/thingspeak";

const REFRESH_MS = 20000;
const SEUIL_HORS_LIGNE_MS = 2 * 60 * 1000;

export default function useMesures() {
  const [mesures, setMesures] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    let actif = true;
    const charger = async () => {
      try {
        const data = await fetchMesures(100);
        if (actif) { setMesures(data); setErreur(null); }
      } catch (e) {
        if (actif) setErreur(e.message);
      } finally {
        if (actif) setChargement(false);
      }
    };
    charger();
    const id = setInterval(charger, REFRESH_MS);
    return () => { actif = false; clearInterval(id); };
  }, []);

  const derniere = mesures[mesures.length - 1] || null;
  const enLigne =
    !!derniere && Date.now() - new Date(derniere.date).getTime() < SEUIL_HORS_LIGNE_MS;

  return { mesures, derniere, enLigne, erreur, chargement };
}