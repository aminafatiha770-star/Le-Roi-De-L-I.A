
import React, { useState } from 'react';
import { ToolId } from '../types';
import { testRoyalKey } from '../services/gemini';

interface LayoutProps {
  children: React.ReactNode;
  activeTool: ToolId | null;
  setActiveTool: (id: ToolId | null) => void;
  onHome: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTool, setActiveTool, onHome }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-20 bg-turquoise flex items-center justify-between px-8 shadow-2xl z-50">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onHome}>
          <span className="text-4xl">👑</span>
          <h1 className="text-2xl font-black text-gold italic uppercase tracking-tighter">Le Roi De l'I.A</h1>
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => setShowHelp(true)} className="text-white font-black text-[10px] uppercase border-b-2 border-white">Guide GitHub</button>
          <button onClick={onHome} className="bg-gold text-mauve px-6 py-2 rounded-full font-black uppercase text-xs shadow-lg hover:scale-105 transition">ACCUEIL</button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-12 relative bg-emerald-custom">
        {children}
      </main>

      {showHelp && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6">
          <div className="bg-emerald-900 border-4 border-gold p-8 rounded-[3rem] max-w-2xl w-full">
            <h2 className="text-2xl font-black text-gold uppercase italic mb-4">Aide Déploiement GitHub 🚀</h2>
            <div className="text-white text-xs space-y-4">
              <p>1. Assurez-vous d'avoir ajouté <code className="bg-black p-1 text-turquoise">API_KEY</code> dans Vercel.</p>
              <p>2. Si le site ne marche pas : Allez sur GitHub, modifiez une lettre dans <b>index.html</b> et cliquez sur <b>Commit</b>.</p>
              <p>3. Vercel relancera la construction automatiquement avec votre clé !</p>
            </div>
            <button onClick={() => setShowHelp(false)} className="w-full mt-8 py-4 bg-gold text-mauve font-black rounded-2xl uppercase">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
