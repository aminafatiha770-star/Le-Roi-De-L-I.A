
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onHome: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onHome }) => {
  return (
    <div className="min-h-screen flex flex-col font-[Arial]">
      <header className="h-24 bg-[#00CED1] flex items-center justify-between px-6 md:px-10 shadow-2xl z-50 border-b-8 border-[#FFD700]">
        <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition" onClick={onHome}>
          <span className="text-4xl md:text-5xl">👑</span>
          <h1 className="text-2xl md:text-4xl font-black text-[#FFD700] italic uppercase tracking-tighter drop-shadow-[0_2px_2px_rgba(153,51,204,0.8)]">
            Le Roi De l'I.A
          </h1>
        </div>
        
        <button 
          onClick={onHome} 
          className="bg-[#FFD700] text-[#9933CC] px-6 md:px-10 py-3 rounded-full font-black uppercase text-sm shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all border-2 border-[#9933CC]"
        >
          ACCUEIL
        </button>
      </header>

      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>

      <footer className="py-8 bg-[#00CED1] border-t-4 border-[#FFD700] text-center text-[#9933CC] text-[12px] uppercase font-black tracking-[0.3em]">
        © LE ROI DE L'I.A - STUDIO ROYAL 100% GRATUIT
      </footer>
    </div>
  );
};

export default Layout;
