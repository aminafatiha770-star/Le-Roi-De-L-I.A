
import React, { useState } from 'react';
import { ToolId } from './types';
import { TOOLS } from './constants';
import Layout from './components/Layout';
import ToolInterface from './components/ToolInterface';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);

  if (!activeTool) {
    return (
      <Layout onHome={() => setActiveTool(null)}>
        <div className="text-center space-y-24 py-16">
          <div className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-black text-white italic uppercase tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              Le Roi De <span className="text-gold">l'I.A</span>
            </h1>
            <p className="text-turquoise font-black uppercase tracking-[0.8em] text-sm opacity-80">L'Intelligence Artificielle à son apogée</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className="group bg-black/40 p-10 rounded-[3.5rem] border-2 border-turquoise/20 hover:border-gold hover:bg-black/60 transition-all text-left relative overflow-hidden shadow-2xl"
              >
                <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">{tool.icon}</div>
                <h3 className="text-2xl font-black text-gold uppercase italic mb-3 tracking-tighter">{tool.name}</h3>
                <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest leading-relaxed">{tool.description}</p>
                <div className="mt-8 text-turquoise font-black text-[10px] uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity">Activer le Studio →</div>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-gold/5 via-gold/20 to-gold/5 border-y-4 border-gold/40 py-20 rounded-[5rem]">
            <h2 className="text-4xl font-black uppercase italic text-gold mb-12 tracking-widest">💎 I.A Gratuites Partenaires</h2>
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              {['Gemini 3 Pro', 'Veo Video', 'Stable Diffusion XL', 'Flux.1', 'Flash Lite', 'Imagen 4'].map((ia) => (
                <div key={ia} className="px-10 py-5 bg-black/60 rounded-full border-2 border-white/10 text-white font-black uppercase text-xs tracking-widest shadow-xl">
                  {ia}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onHome={() => setActiveTool(null)}>
      <ToolInterface toolId={activeTool} />
    </Layout>
  );
};

export default App;
