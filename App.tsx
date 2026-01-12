import React, { useState } from 'react';
import { ToolId } from './types';
import { TOOLS } from './components/constants';
import Layout from './components/Layout';
import ToolInterface from './components/ToolInterface';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [activeTab, setActiveTab] = useState<'Image' | 'Creative' | 'Document'>('Image');

  const categories = [
    { id: 'Image', icon: '📸', label: 'OUTILS PHOTO' },
    { id: 'Creative', icon: '🎨', label: 'CRÉATION ART' },
    { id: 'Document', icon: '📄', label: 'DOCUMENTS' }
  ] as const;

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Titre Principal */}
      <div className="text-center space-y-4 pt-10">
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter gold-glow uppercase">
          LE ROI <span className="text-white">DE L'I.A</span>
        </h1>
        <p className="bg-[#FFD700] text-black px-8 py-3 rounded-full font-black uppercase text-xs inline-block shadow-2xl border-4 border-white animate-bounce">
          Studio Photo Royal & Gratuit
        </p>
      </div>

      {/* Barre de Navigation (Onglets) - Plus visible */}
      <div className="flex justify-center gap-3 sticky top-4 z-50">
        <div className="bg-white/5 backdrop-blur-2xl p-2 rounded-full border-2 border-[#FFD700]/30 flex gap-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all font-black uppercase text-[11px] tracking-widest ${
                activeTab === cat.id 
                ? 'bg-[#FFD700] text-black shadow-lg scale-105' 
                : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="hidden md:inline">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grille des Outils */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {TOOLS.filter(t => t.category === activeTab).map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className="group relative bg-white/5 p-8 rounded-[3rem] border border-white/10 hover:border-[#FFD700] transition-all text-center flex flex-col items-center hover:-translate-y-3"
          >
            <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">{tool.icon}</div>
            <h3 className="text-lg font-black uppercase italic text-[#FFD700] leading-tight">{tool.name}</h3>
            <p className="text-white/30 text-[9px] uppercase font-bold mt-4 tracking-tighter">{tool.description}</p>
            <div className="mt-8 bg-white/10 text-white px-6 py-2 rounded-full text-[10px] font-black group-hover:bg-[#FFD700] group-hover:text-black transition-colors">
              OUVRIR L'OUTIL
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Layout onHome={() => setActiveTool(null)}>
      <div className="min-h-screen bg-black text-white">
        {activeTool ? (
          <div className="p-4 md:p-12">
            <ToolInterface toolId={activeTool} onBack={() => setActiveTool(null)} />
          </div>
        ) : renderHome()}
      </div>
    </Layout>
  );
};

export default App;