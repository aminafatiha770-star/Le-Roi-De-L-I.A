import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Forcer le nettoyage du loader une fois React prêt
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
  console.log("👑 Studio Royal déverrouillé avec succès.");
} else {
  throw new Error("Conteneur racine introuvable.");
}