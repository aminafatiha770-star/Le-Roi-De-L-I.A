import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("👑 LE ROI DE L'IA : Initialisation du Palais...");

const container = document.getElementById('root');
if (container) {
  try {
    const root = createRoot(container);
    root.render(<App />);
    console.log("👑 LE ROI DE L'IA : Montage réussi.");
  } catch (error) {
    console.error("👑 ERREUR CRITIQUE AU MONTAGE:", error);
    container.innerHTML = `<div style="color:red; padding: 20px; font-family: Arial; background: white;">Erreur de chargement: ${error.message}</div>`;
  }
} else {
  console.error("👑 ERREUR: Conteneur #root introuvable.");
}