import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onHome: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onHome }) => {
  return (
    <div className="min-h-screen flex flex-col font-[Arial]">
      <header className="h-24 bg-[#00CED1] flex items-center justify-between px-6 md:px-12 shadow-2xl z-50 border-b-[6px] border-[#FFD700]">
        <div 
          className="flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform active:scale-95" 
          onClick={onHome}
        >
          <span className="text-5xl drop-shadow-lg">👑</span>
          <h1 className="text-3xl md:text-4xl font-black text-[#FFD700] italic uppercase tracking-tighter drop-shadow-[0_2px_2px_rgba(153,51,204,1)]">
            Le Roi De l'I.A
          </h1>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={onHome} 
            className="bg-[#FFD700] text-[#9933CC] px-8 py-3 rounded-full font-black uppercase text-sm shadow-[0_4px_0_rgba(153,51,204,1)] hover:translate-y-1 hover:shadow-none transition-all border-2 border-[#9933CC]"
          >
            🏰 ACCUEIL
          </button>
        </div>
      </header>

      <main className="flex-1 bg-[#00CED1] relative">
        {/* Motif de fond subtil */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>

      <footer className="py-6 bg-[#00CED1] border-t-4 border-[#FFD700] text-center">
        <p className="text-[#9933CC] text-[11px] uppercase font-black tracking-[0.4em]">
          © LE ROI DE L'I.A - STUDIO ROYAL 100% GRATUIT
        </p>
      </footer>
    </div>
  );
};

export default Layout;