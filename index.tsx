import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("👑 LE ROI DE L'IA : Initialisation...");

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("👑 ERREUR: Racine introuvable.");
}