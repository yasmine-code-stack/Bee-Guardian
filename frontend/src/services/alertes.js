const ok = (v) => v !== null && v !== undefined && !Number.isNaN(v);

export function distanceMetres(lat1, lon1, lat2, lon2) {
  const R = 6371000, r = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * r) / 2) ** 2 +
    Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(((lon2 - lon1) * r) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function genererAlertes(mesures, positionRef = null, enLigne = true) {
  const alertes = [];
  const add = (niveau, titre, explication, action) =>
    alertes.push({ niveau, titre, explication, action });

  const m = mesures[mesures.length - 1];
  if (!m) return alertes;

  if (!enLigne)
    add("avertissement", "Capteurs hors ligne",
      "Aucune donnée reçue depuis plus de 2 minutes.",
      "Vérifier que la simulation Wokwi tourne et que le Wi-Fi de l'ESP32 est connecté.");

  if (ok(m.temperature) && m.temperature > 38)
    add("critique", "Surchauffe de la ruche",
      `${m.temperature.toFixed(1)} °C : au-delà de 38 °C, le couvain et la cire risquent de souffrir.`,
      "Ombrager la ruche, vérifier la ventilation et la présence d'eau à proximité.");
  else if (ok(m.temperature) && m.temperature < 32)
    add("avertissement", "Température trop basse",
      `${m.temperature.toFixed(1)} °C : sous 32 °C, le couvain peut se refroidir (colonie faible ou orpheline).`,
      "Vérifier la taille de la colonie et réduire l'entrée de la ruche.");

  if (ok(m.humidite) && m.humidite > 75)
    add("avertissement", "Humidité excessive",
      `${m.humidite.toFixed(0)} % : risque de moisissures et de maladies (nosémose, mycoses).`,
      "Améliorer l'aération et vérifier l'inclinaison de la ruche.");
  else if (ok(m.humidite) && m.humidite < 40)
    add("info", "Air très sec",
      `${m.humidite.toFixed(0)} % : le couvain peut se dessécher.`,
      "Prévoir un point d'eau proche de la ruche.");

  // Le sketch envoie le COV brut du potentiomètre (0 à 4095) ; B l'affiche en ppm
  if (ok(m.cov) && m.cov > 250)
    add("avertissement", "Air de mauvaise qualité",
      `COV ${Math.round(m.cov)} : fumée, produits chimiques ou fermentation possibles (normal : moins de 250).`,
      "Inspecter la ruche et éloigner toute source de pollution.");

  const avecPoids = mesures.filter((x) => ok(x.poids) && x.poids !== 0);
  if (avecPoids.length >= 2) {
    const perte = avecPoids[avecPoids.length - 2].poids - avecPoids[avecPoids.length - 1].poids;
    if (perte > 1.5)
      add("critique", "Chute brutale du poids : essaimage possible ?",
        `Perte de ${perte.toFixed(1)} kg entre deux mesures.`,
        "Inspecter la ruche immédiatement : un essaim a peut-être quitté la ruche.");
  }

  const recent = mesures.slice(-10);
  if (recent.length === 10 && ok(m.temperature) && m.temperature > 15 &&
      recent.every((x) => x.entrees + x.sorties === 0))
    add("avertissement", "Aucune activité à l'entrée",
      "Aucun passage détecté sur les 10 dernières mesures malgré une température douce.",
      "Vérifier la vitalité de la colonie et l'état des capteurs.");

  if (positionRef && ok(m.latitude) && ok(m.longitude)) {
    const d = distanceMetres(positionRef.lat, positionRef.lng, m.latitude, m.longitude);
    if (d > 50)
      add("critique", "Ruche déplacée : vol possible",
        `La ruche est à ${Math.round(d)} m de sa position de référence.`,
        "Contacter l'apiculteur et suivre la position sur la carte.");
  }

  const ordre = { critique: 0, avertissement: 1, info: 2 };
  return alertes.sort((a, b) => ordre[a.niveau] - ordre[b.niveau]);
}