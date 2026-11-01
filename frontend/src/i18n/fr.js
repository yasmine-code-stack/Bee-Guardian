const fr = {
  app: {
    titre: "Ruche connectée",
    sousTitre: "Tableau de bord apicole",
  },
  menu: {
    tableau: "Tableau de bord",
    environnement: "Environnement",
    activite: "Activité",
    poids: "Poids",
    localisation: "Localisation",
    systeme: "Système",
    alertes: "Alertes",
  },
  capteurs: {
    temperature: { nom: "Température", unite: "°C" },
    humidite: { nom: "Humidité", unite: "%" },
    cov: { nom: "COV (qualité de l'air)", unite: "ppm" },
    entrees: { nom: "Entrées", unite: "abeilles" },
    sorties: { nom: "Sorties", unite: "abeilles" },
    poids: { nom: "Poids de la ruche", unite: "kg" },
    batterie: { nom: "Batterie", unite: "%" },
  },
  etats: { ok: "Normal", attention: "Attention", danger: "Critique" },
  pages: {
    environnement: { titre: "Environnement de la ruche" },
    activite: { titre: "Activité de la ruche", bilan: "Bilan (entrées - sorties)" },
    poids: {
      titre: "Évolution du poids",
      actuel: "Poids actuel",
      variation: "Variation sur la période",
    },
    localisation: {
      titre: "Localisation de la ruche",
      aucunGps: "Aucune position GPS reçue pour le moment.",
      derniere: "Dernière position connue",
    },
    systeme: {
      titre: "État du système",
      connexion: "Connexion ThingSpeak",
      enLigne: "En ligne",
      horsLigne: "Hors ligne",
      derniereReception: "Dernière réception",
      capteurs: "Statut des capteurs",
      capteurOk: "Fonctionne",
      capteurAbsent: "Aucune donnée",
    },
  },
  commun: {
    chargement: "Chargement des données...",
    aucuneDonnee: "Aucune donnée disponible.",
    il_y_a: "il y a",
    secondes: "s",
    minutes: "min",
  },
};

export default fr;