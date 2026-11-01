export const mesuresFactices = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 20000).toISOString(),
  temperature: 33 + Math.sin(i / 4) * 2 + Math.random(),
  humidite: 60 + Math.cos(i / 5) * 5 + Math.random() * 2,
  cov: 120 + Math.random() * 60,
  entrees: Math.floor(Math.random() * 12),
  sorties: Math.floor(Math.random() * 12),
  poids: 42 + i * 0.02 + Math.random() * 0.05,
  latitude: 36.8065,
  longitude: 10.1815,
  batterie: 85 - i * 0.1,
}));