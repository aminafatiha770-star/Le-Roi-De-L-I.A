import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (container) {
  // Supprime le loader statique avant de monter React pour éviter toute superposition
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.style.display = 'none';
  }
  
  const root = createRoot(container);
  root.render(<App />);
}