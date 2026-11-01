const ID = import.meta.env.VITE_THINGSPEAK_CHANNEL_ID;
const KEY = import.meta.env.VITE_THINGSPEAK_READ_KEY;

const num = (v) => (v === null || v === undefined || v === "" ? null : Number(v));

export async function fetchMesures(n = 100) {
  let url = `https://api.thingspeak.com/channels/${ID}/feeds.json?results=${n}`;
  if (KEY) url += `&api_key=${KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`ThingSpeak a répondu ${res.status}`);
  const data = await res.json();

  return (data.feeds || []).map((f) => ({
    date: f.created_at,                 // chaîne ISO, comme mockData
    temperature: num(f.field1),
    humidite: num(f.field2),
    poids: num(f.field3),
    cov: num(f.field4),
    entrees: num(f.field5) ?? 0,
    sorties: num(f.field6) ?? 0,
    latitude: num(f.field7),
    longitude: num(f.field8),
    batterie: null,                     // pas de capteur de batterie
  }));
}