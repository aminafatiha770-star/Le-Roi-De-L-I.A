import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("👑 LE ROI DE L'IA : Chargement du Studio Royal...");

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("👑 ERREUR: Impossible de trouver le conteneur racine.");
}