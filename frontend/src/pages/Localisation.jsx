import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import fr from "../i18n/fr";

// Correction de l'icône par défaut (problème classique avec Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Recentre la carte quand la position change
function Recentrer({ position }) {
  const map = useMap();
  useEffect(() => { map.setView(position); }, [position, map]);
  return null;
}

export default function Localisation({ mesures }) {
  const derniere = mesures && mesures.length > 0 ? mesures[mesures.length - 1] : null;
  const lat = derniere?.latitude;
  const lng = derniere?.longitude;
  const valide = Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);

  return (
    <>
      <h2 className="page-titre">{fr.pages.localisation.titre}</h2>

      {!valide ? (
        <p className="message-vide">{fr.pages.localisation.aucunGps}</p>
      ) : (
        <MapContainer center={[lat, lng]} zoom={15} className="carte-leaflet">
          <TileLayer
            attribution='&copy; contributeurs <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>
              {fr.pages.localisation.derniere}<br />
              {lat.toFixed(5)}, {lng.toFixed(5)}
            </Popup>
          </Marker>
          <Recentrer position={[lat, lng]} />
        </MapContainer>
      )}
    </>
  );
}