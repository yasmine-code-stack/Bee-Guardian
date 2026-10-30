
import { useEffect, useRef, useState } from "react";
import "./CameraMonitor.css";

export default function CameraMonitor() {
  // Référence vers l'élément vidéo
  const videoRef = useRef(null);

  // Référence pour stocker le flux vidéo de la caméra
  const streamRef = useRef(null);

  // États du composant
  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fonction pour démarrer la caméra
  async function startCamera() {
    setError("");

    // Vérifier si le navigateur permet d'accéder à la caméra
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(
        "L'accès à la caméra est indisponible. Ouvrez le tableau de bord avec localhost ou HTTPS."
      );
      return;
    }

    try {
      setLoading(true);

      // Demander l'autorisation d'utiliser la webcam
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      // Enregistrer le flux vidéo
      streamRef.current = stream;

      // Associer le flux vidéo à l'élément vidéo
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // Indiquer que la caméra est activée
      setCameraOn(true);

    } catch (err) {

      // Afficher un message selon le type d'erreur rencontré
      if (err.name === "NotAllowedError") {
        setError("Accès à la caméra refusé. Autorisez son utilisation dans Chrome.");

      } else if (err.name === "NotFoundError") {
        setError("Aucune webcam n'a été détectée sur cet ordinateur.");

      } else if (err.name === "NotReadableError") {
        setError("La caméra est déjà utilisée par une autre application.");

      } else {
        setError("Impossible de démarrer la webcam : " + err.message);
      }

    } finally {
      // Arrêter l'indicateur de chargement
      setLoading(false);
    }
  }

  // Fonction pour arrêter la caméra
  function stopCamera() {

    // Arrêter toutes les pistes du flux vidéo
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Supprimer le flux vidéo de l'élément vidéo
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    // Indiquer que la caméra est désactivée
    setCameraOn(false);
  }

  // Nettoyer le flux vidéo lorsque le composant est supprimé
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <section className="camera-card">

      {/* En-tête de la caméra */}
      <div className="camera-header">
        <div>
          <h2>Surveillance en direct</h2>
          <p>Surveillance visuelle de votre ruche</p>
        </div>

        {/* Afficher l'état actuel de la caméra */}
        <span className={cameraOn ? "camera-status live" : "camera-status"}>
          {cameraOn ? "● EN DIRECT" : "● HORS LIGNE"}
        </span>
      </div>

      {/* Zone d'affichage de la vidéo */}
      <div className="camera-screen">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
        />

        {/* Message affiché lorsque la caméra est éteinte */}
        {!cameraOn && (
          <div className="camera-placeholder">
            <span className="camera-icon">📷</span>
            <h3>La caméra est désactivée</h3>
            <p>Démarrez votre webcam pour surveiller l'environnement.</p>
          </div>
        )}
      </div>

      {/* Afficher les éventuelles erreurs */}
      {error && (
        <div className="camera-error">
          {error}
        </div>
      )}

      {/* Boutons de contrôle de la caméra */}
      <div className="camera-controls">
        {!cameraOn ? (
          <button
            className="start-camera"
            onClick={startCamera}
            disabled={loading}
          >
            {loading ? "Démarrage..." : "▶ Démarrer la caméra"}
          </button>
        ) : (
          <button
            className="stop-camera"
            onClick={stopCamera}
          >
            ■ Arrêter la caméra
          </button>
        )}
      </div>

    </section>
  );
}
