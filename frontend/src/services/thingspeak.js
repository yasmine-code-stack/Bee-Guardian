const CHANNEL_ID = import.meta.env.VITE_THINGSPEAK_CHANNEL_ID;
const READ_KEY = import.meta.env.VITE_THINGSPEAK_READ_KEY;

export async function getHiveData() {
  if (!CHANNEL_ID) {
    throw new Error("ThingSpeak Channel ID is missing.");
  }

  const url = new URL(
    `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json`
  );

  url.searchParams.set("results", "20");

  if (READ_KEY) {
    url.searchParams.set("api_key", READ_KEY);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to connect to ThingSpeak.");
  }

  const result = await response.json();

  return (result.feeds || [])
    .map((feed) => ({
      time: feed.created_at,
      temperature: parseFloat(feed.field1),
      humidity: parseFloat(feed.field2),
      weight: parseFloat(feed.field3),
      activity: parseFloat(feed.field4)
    }))
    .filter((item) => 
        item.time &&
        Number.isFinite(item.temperature) &&
        Number.isFinite(item.humidity) &&
        Number.isFinite(item.weight)
    );
}