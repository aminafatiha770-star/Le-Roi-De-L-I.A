import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("👑 Le Roi de l'IA : Système prêt.");

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}