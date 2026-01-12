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
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-in fade-in duration-700">
      {/* Header Royal */}
      <div className="text-center space-y-6 pt-12">
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter gold-glow uppercase leading-none">
          LE ROI <span className="text-white">DE L'I.A</span>
        </h1>
        <div className="flex justify-center">
          <p className="bg-gradient-to-r from-[#FFD700] via-white to-[#FFD700] text-black px-10 py-4 rounded-full font-black uppercase text-sm shadow-[0_10px_40px_rgba(255,215,0,0.4)] border-4 border-black inline-block">
            Studio Intelligence Artificielle
          </p>
        </div>
      </div>

      {/* Navigation Onglets Royale */}
      <div className="flex justify-center sticky top-6 z-50">
        <div className="bg-black/80 backdrop-blur-3xl p-3 rounded-full border-2 border-[#FFD700]/40 flex gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`flex items-center gap-3 px-10 py-5 rounded-full transition-all font-black uppercase text-[12px] tracking-[0.2em] border-2 ${
                activeTab === cat.id 
                ? 'bg-[#FFD700] text-black border-white shadow-xl scale-105' 
                : 'text-white/40 border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grille des Outils */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 pb-20">
        {TOOLS.filter(t => t.category === activeTab).map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className="group relative bg-gradient-to-br from-white/10 to-transparent p-10 rounded-[3.5rem] border border-white/5 hover:border-[#FFD700] transition-all text-center flex flex-col items-center hover:-translate-y-4 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-8xl mb-8 group-hover:scale-110 transition-transform drop-shadow-2xl">{tool.icon}</div>
            <h3 className="text-xl font-black uppercase italic text-[#FFD700] leading-tight mb-4">{tool.name}</h3>
            <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest leading-relaxed">{tool.description}</p>
            <div className="mt-10 bg-white/5 text-white w-full py-4 rounded-2xl text-[11px] font-black group-hover:bg-[#FFD700] group-hover:text-black transition-all uppercase">
              Ouvrir l'outil
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Layout onHome={() => setActiveTool(null)}>
      <div className="min-h-screen bg-black text-white selection:bg-[#FFD700] selection:text-black">
        {activeTool ? (
          <div className="p-4 md:p-12 animate-in slide-in-from-bottom-10 duration-500">
            <ToolInterface toolId={activeTool} onBack={() => setActiveTool(null)} />
          </div>
        ) : renderHome()}
      </div>
    </Layout>
  );
};

export default App;