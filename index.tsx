import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Log de diagnostic pour confirmer que le script s'exécute
console.log("Le Roi de l'IA : Ouverture des portes du Palais...");

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Erreur critique : Conteneur #root introuvable.");
}