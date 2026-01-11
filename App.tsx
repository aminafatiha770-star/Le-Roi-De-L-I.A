
import React, { useState } from 'react';
import { ToolId } from './types';
import { TOOLS } from './constants';
import Layout from './components/Layout';
import ToolInterface from './components/ToolInterface';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);

  if (!activeTool) {
    return (
      <Layout activeTool={null} setActiveTool={setActiveTool} onHome={() => setActiveTool(null)}>
        <div className="text-center space-y-16 py-12">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter">
              Le Roi De <span className="text-gold">l'I.A</span>
            </h1>
            <p className="text-turquoise font-black uppercase tracking-[0.5em] text-sm">Le Futur est Gratuit, Puissant et Royal</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className="group bg-black/30 p-8 rounded-[2.5rem] border-2 border-turquoise/20 hover:border-gold transition-all text-left relative overflow-hidden"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition">{tool.icon}</div>
                <h3 className="text-xl font-black text-gold uppercase italic mb-2">{tool.name}</h3>
                <p className="text-white/60 text-[10px] font-bold uppercase">{tool.description}</p>
                <div className="mt-6 text-turquoise font-black text-[9px] uppercase tracking-widest">Activer →</div>
              </button>
            ))}
          </div>

          <div className="bg-gold/10 border-2 border-gold/30 p-12 rounded-[4rem] text-white">
            <h2 className="text-3xl font-black uppercase italic text-gold mb-8">🎁 I.A Gratuites Partenaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-black uppercase">
              <div className="p-4 bg-black/40 rounded-2xl border border-white/10">Gemini 2.5</div>
              <div className="p-4 bg-black/40 rounded-2xl border border-white/10">Veo Video</div>
              <div className="p-4 bg-black/40 rounded-2xl border border-white/10">Flash Lite</div>
              <div className="p-4 bg-black/40 rounded-2xl border border-white/10">Stable Diffusion</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeTool={activeTool} setActiveTool={setActiveTool} onHome={() => setActiveTool(null)}>
      <ToolInterface toolId={activeTool} />
    </Layout>
  );
};

export default App;
