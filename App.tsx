
import React, { useState } from 'react';
import { ToolId } from './types';
import { TOOLS } from './constants';
import Layout from './components/Layout';
import ToolInterface from './components/ToolInterface';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);

  const renderHome = () => (
    <div className="py-12 px-4 space-y-16 animate-in fade-in duration-1000">
      <div className="text-center space-y-6">
        <h1 className="text-6xl md:text-9xl font-black text-[#FFD700] italic uppercase tracking-tighter drop-shadow-[0_5px_5px_rgba(153,51,204,1)]">
          Le Roi De <span className="text-white">l'I.A</span>
        </h1>
        <div className="h-2 w-48 bg-[#FFD700] mx-auto rounded-full shadow-lg"></div>
        <p className="text-[#9933CC] font-black uppercase tracking-[0.4em] text-sm md:text-lg bg-white/20 inline-block px-6 py-2 rounded-full">
          Studio Royal d'Intelligence Artificielle
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className="group bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border-4 border-[#FFD700]/30 hover:border-[#FFD700] hover:bg-white/20 transition-all text-left flex flex-col items-center shadow-2xl active:scale-95"
          >
            <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300 drop-shadow-md">{tool.icon}</div>
            <h3 className="text-xl font-black text-[#FFD700] uppercase italic tracking-tight text-center drop-shadow-sm">{tool.name}</h3>
            <p className="text-[#9933CC] text-[10px] font-black uppercase mt-3 text-center leading-tight bg-white/40 px-3 py-1 rounded-full">{tool.description}</p>
            <div className="mt-6 text-white font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-[#9933CC] px-4 py-2 rounded-full shadow-lg">
              ENTRER DANS LE PALAIS →
            </div>
          </button>
        ))}
      </div>

      <div className="mt-20 py-16 bg-[#FFD700]/10 rounded-[5rem] border-4 border-[#FFD700]/20 text-center">
        <h2 className="text-2xl font-black uppercase text-[#9933CC] mb-8 tracking-[0.3em] italic">💎 PUISSANCE ROYALE GRATUITE</h2>
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {['Gemini 3 Pro', 'Veo Video', 'Stable Diffusion', 'Flux.1', 'Imagen 4', 'DALL-E 3'].map((ia) => (
            <span key={ia} className="px-6 py-3 bg-[#00CED1] rounded-full border-2 border-[#FFD700] text-white font-black uppercase text-[10px] tracking-widest shadow-lg">
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
        <div className="animate-in slide-in-from-bottom-10 duration-500 p-4 md:p-8">
          <ToolInterface toolId={activeTool} />
        </div>
      ) : renderHome()}
    </Layout>
  );
};

export default App;
