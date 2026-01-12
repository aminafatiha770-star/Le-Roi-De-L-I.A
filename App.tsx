import React, { useState } from 'react';
import { ToolId } from './types';
import { TOOLS } from './components/constants';
import Layout from './components/Layout';
import ToolInterface from './components/ToolInterface';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [activeTab, setActiveTab] = useState<'Image' | 'Creative' | 'Document'>('Image');

  const categories = [
    { id: 'Image', icon: '📸', label: 'PHOTO' },
    { id: 'Creative', icon: '🎨', label: 'CRÉATION' },
    { id: 'Document', icon: '📄', label: 'DOCS' }
  ] as const;

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header Royal */}
      <div className="text-center space-y-6 pt-12">
        <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter gold-glow uppercase leading-none">
          LE ROI <span className="text-white">DE L'I.A</span>
        </h1>
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-[#FFD700] via-white to-[#FFD700] p-[2px] rounded-full shadow-[0_10px_40px_rgba(255,215,0,0.3)]">
            <p className="bg-black text-[#FFD700] px-10 py-3 rounded-full font-black uppercase text-xs tracking-[0.3em]">
              Studio Intelligence Artificielle
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Onglets */}
      <div className="flex justify-center sticky top-6 z-50">
        <div className="bg-zinc-900/90 backdrop-blur-xl p-2 rounded-full border border-white/10 flex gap-2 shadow-2xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all font-black uppercase text-[10px] tracking-widest ${
                activeTab === cat.id 
                ? 'bg-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.4)] scale-105' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grille des Outils */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-24">
        {TOOLS.filter(t => t.category === activeTab).map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className="group relative bg-zinc-900/50 p-8 rounded-[2.5rem] border border-white/5 hover:border-[#FFD700]/50 transition-all text-center flex flex-col items-center hover:-translate-y-2 shadow-xl"
          >
            <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
            <h3 className="text-lg font-black uppercase italic text-[#FFD700] leading-tight mb-2">{tool.name}</h3>
            <p className="text-white/30 text-[9px] uppercase font-bold tracking-tighter leading-tight h-8 overflow-hidden">{tool.description}</p>
            <div className="mt-8 bg-white/5 text-white w-full py-3 rounded-xl text-[10px] font-black group-hover:bg-[#FFD700] group-hover:text-black transition-colors uppercase tracking-widest">
              Entrer
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
          <div className="p-4 md:p-8">
            <ToolInterface toolId={activeTool} onBack={() => setActiveTool(null)} />
          </div>
        ) : renderHome()}
      </div>
    </Layout>
  );
};

export default App;