
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const startApp = () => {
  const container = document.getElementById('root');
  if (!container) return;
  
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erreur fatale lors du chargement du Palais Royal:", error);
    container.innerHTML = `
      <div style="color: white; text-align: center; padding: 50px; font-family: Arial;">
        <h1 style="color: #FFD700;">Une erreur est survenue</h1>
        <p>Le Roi demande de rafraîchir la page.</p>
      </div>
    `;
  }
};

// On s'assure que le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
