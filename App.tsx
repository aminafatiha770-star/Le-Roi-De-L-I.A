import React, { useState } from 'react';
import { ToolId } from './types';
import { TOOLS } from './components/constants';
import Layout from './components/Layout';
import ToolInterface from './components/ToolInterface';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);

  const categories = ['Image', 'Creative', 'Document', 'Vidéo'] as const;

  const renderHome = () => (
    <div className="py-12 px-6 space-y-16 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-black text-[#FFD700] italic uppercase tracking-tighter drop-shadow-[0_4px_4px_rgba(153,51,204,1)]">
          LE ROI DE <span className="text-white">L'I.A</span>
        </h1>
        <p className="text-[#9933CC] font-black uppercase tracking-[0.5em] text-sm md:text-xl bg-[#FFD700] inline-block px-8 py-2 rounded-full border-2 border-[#9933CC]">
          Studio Royal 100% Gratuit
        </p>
      </div>

      {categories.map(cat => (
        <div key={cat} className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-1 flex-1 bg-[#FFD700]"></div>
            <h2 className="text-2xl font-black text-[#FFD700] uppercase tracking-widest italic">{cat}</h2>
            <div className="h-1 flex-1 bg-[#FFD700]"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TOOLS.filter(t => t.category === cat).map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className="group bg-white/20 hover:bg-white/30 p-8 rounded-[2.5rem] border-4 border-[#FFD700]/20 hover:border-[#FFD700] transition-all text-center flex flex-col items-center shadow-xl hover:-translate-y-2"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{tool.icon}</div>
                <h3 className="text-lg font-black text-[#FFD700] uppercase italic leading-tight drop-shadow-sm">{tool.name}</h3>
                <p className="text-white text-[10px] font-black uppercase mt-2 opacity-70 tracking-tighter">{tool.description}</p>
                <div className="mt-4 bg-[#9933CC] text-[#FFD700] px-4 py-1 rounded-full text-[9px] font-black uppercase border border-[#FFD700]">
                  Accès Royal
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-16 py-12 bg-white/10 rounded-[4rem] border-4 border-[#FFD700] max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-black uppercase text-[#FFD700] mb-8 italic tracking-widest">✨ I.A ROYALEMENT GRATUITES</h2>
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {['Gemini 3 Pro', 'Veo Video', 'Stable Diffusion 3.5', 'Flux.1 Pro', 'Imagen 4', 'DALL-E 3'].map((ia) => (
            <span key={ia} className="px-6 py-3 bg-[#9933CC] rounded-full border-2 border-[#FFD700] text-[#FFD700] font-black uppercase text-[10px] tracking-widest shadow-xl">
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
        <div className="p-4 md:p-10">
          <ToolInterface toolId={activeTool} />
        </div>
      ) : renderHome()}
    </Layout>
  );
};

export default App;