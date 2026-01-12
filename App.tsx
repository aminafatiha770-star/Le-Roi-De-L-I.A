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
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter gold-glow uppercase">
          LE ROI <span className="text-white">DE L'I.A</span>
        </h1>
        <p className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-black uppercase text-[10px] inline-block shadow-xl">
          Studio Photo Intelligence Artificielle
        </p>
      </div>

      {/* Barre de Navigation (Onglets) */}
      <div className="flex justify-center gap-2 md:gap-4 sticky top-4 z-50 bg-black/90 p-2 rounded-full border border-white/10 backdrop-blur-lg">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-black uppercase text-[10px] tracking-widest ${
              activeTab === cat.id 
              ? 'bg-[#FFD700] text-black shadow-lg scale-105' 
              : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Grille des Outils */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TOOLS.filter(t => t.category === activeTab).map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className="group bg-gradient-to-b from-white/10 to-transparent p-8 rounded-[2.5rem] border border-white/5 hover:border-[#FFD700] transition-all text-center flex flex-col items-center hover:-translate-y-2 shadow-2xl"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{tool.icon}</div>
            <h3 className="text-lg font-black uppercase italic text-[#FFD700]">{tool.name}</h3>
            <p className="text-white/30 text-[9px] uppercase font-bold mt-2 leading-tight">{tool.description}</p>
            <div className="mt-6 bg-white/10 text-white px-6 py-2 rounded-full text-[9px] font-black uppercase group-hover:bg-[#FFD700] group-hover:text-black">
              OUVRIR L'OUTIL
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Layout onHome={() => setActiveTool(null)}>
      {activeTool ? (
        <div className="p-4 md:p-8 min-h-screen">
          <ToolInterface toolId={activeTool} onBack={() => setActiveTool(null)} />
        </div>
      ) : renderHome()}
    </Layout>
  );
};

export default App;