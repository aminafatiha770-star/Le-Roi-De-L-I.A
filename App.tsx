
import React, { useState } from 'react';
import { ToolId } from './types';
import { TOOLS } from './constants';
import Layout from './components/Layout';
import ToolInterface from './components/ToolInterface';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);

  const renderHome = () => (
    <div className="text-center space-y-16 py-10 px-4 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter drop-shadow-2xl">
          Le Roi De <span className="text-gold">l'I.A</span>
        </h1>
        <div className="h-1 w-32 bg-gold mx-auto rounded-full"></div>
        <p className="text-turquoise font-black uppercase tracking-[0.5em] text-[10px] md:text-xs">
          Studio Royal d'Intelligence Artificielle
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className="group bg-black/40 p-8 rounded-[3rem] border-2 border-turquoise/10 hover:border-gold hover:bg-black/60 transition-all text-left flex flex-col items-start shadow-xl active:scale-95"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
            <h3 className="text-lg font-black text-gold uppercase italic tracking-tight">{tool.name}</h3>
            <p className="text-white/40 text-[9px] font-bold uppercase mt-2 leading-tight">{tool.description}</p>
            <div className="mt-6 text-turquoise font-black text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Ouvrir l'Outil →
            </div>
          </button>
        ))}
      </div>

      <div className="mt-20 py-16 bg-gradient-to-b from-transparent to-black/20 rounded-[5rem] border-t border-white/5">
        <h2 className="text-xl font-black uppercase text-gold/60 mb-8 tracking-[0.3em] italic">💎 Technologies Intégrées</h2>
        <div className="flex flex-wrap justify-center gap-3 px-6">
          {['Gemini 3 Pro', 'Veo Video', 'Stable Diffusion', 'Flux.1', 'Imagen 4', 'DALL-E 3'].map((ia) => (
            <span key={ia} className="px-5 py-2 bg-emerald-900/40 rounded-full border border-white/5 text-white/50 font-black uppercase text-[9px] tracking-widest">
              {ia}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout onHome={() => setActiveTool(null)}>
      {activeTool ? (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <ToolInterface toolId={activeTool} />
        </div>
      ) : renderHome()}
    </Layout>
  );
};

export default App;
