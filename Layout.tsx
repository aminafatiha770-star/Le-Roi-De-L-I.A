
import React from 'react';
import { ToolId } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onHome: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onHome }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-24 bg-turquoise flex items-center justify-between px-10 shadow-2xl z-50 border-b-4 border-gold">
        <div className="flex items-center gap-4 cursor-pointer hover:scale-105 transition" onClick={onHome}>
          <span className="text-5xl">👑</span>
          <h1 className="text-3xl font-black text-gold italic uppercase tracking-tighter drop-shadow-md">Le Roi De l'I.A</h1>
        </div>
        
        <button onClick={onHome} className="bg-gold text-mauve px-10 py-3 rounded-full font-black uppercase text-sm shadow-[0_5px_15px_rgba(255,215,0,0.4)] hover:scale-110 active:scale-95 transition-all">
          ACCUEIL
        </button>
      </header>

      <main className="flex-1 p-6 md:p-12">
        {children}
      </main>

      <footer className="py-6 text-center text-white/40 text-[10px] uppercase font-black tracking-[0.5em]">
        © Studio Royal - Tout est Gratuit et Puissant
      </footer>
    </div>
  );
};

export default Layout;
