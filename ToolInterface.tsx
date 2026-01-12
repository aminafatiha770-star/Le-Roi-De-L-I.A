import React, { useState } from 'react';
import { ToolId } from '../types';
import { editImage, generateImage } from '../services/gemini';

interface ToolInterfaceProps {
  toolId: ToolId;
  onBack: () => void;
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ toolId, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<string[]>(['', '', '', '']);
  const [outputs, setOutputs] = useState<string[]>(['', '', '', '']);
  const [prompt, setPrompt] = useState('');

  const handleProcess = async () => {
    const activeInputs = inputs.filter(img => img !== '');
    
    if (toolId === 'image-to-image' && activeInputs.length === 0) {
      alert("Majesté, veuillez ajouter au moins une image dans les cases d'entrée.");
      return;
    }

    setLoading(true);
    try {
      if (toolId === 'image-to-image') {
        const results = await Promise.all(
          activeInputs.map(img => editImage(img, prompt || "Sublime transformation royale, haute définition"))
        );
        const newOutputs = [...outputs];
        results.forEach((res, i) => { newOutputs[i] = res; });
        setOutputs(newOutputs);
      } else {
        const res = await generateImage(prompt || "Chef-d'œuvre royal, perfection visuelle");
        setOutputs([res, '', '', '']);
      }
    } catch (err) {
      alert("Une erreur technique est survenue au Palais. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newInputs = [...inputs];
        newInputs[index] = ev.target?.result as string;
        setInputs(newInputs);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderSlot = (type: 'input' | 'output', index: number) => {
    const content = type === 'input' ? inputs[index] : outputs[index];
    
    return (
      <div className="aspect-square bg-gradient-to-tr from-white/5 to-white/10 border-2 border-[#FFD700]/20 rounded-[2rem] relative overflow-hidden group hover:border-[#FFD700] transition-all flex items-center justify-center shadow-inner">
        {content ? (
          <>
            <img src={content} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-opacity">
              <button onClick={() => {
                const n = type === 'input' ? [...inputs] : [...outputs];
                n[index] = '';
                type === 'input' ? setInputs(n) : setOutputs(n);
              }} className="bg-red-600 text-white w-12 h-12 rounded-full font-black text-xl shadow-2xl hover:scale-110 transition-transform">✕</button>
              {type === 'output' && (
                <a href={content} download={`roi-ia-result-${index}.png`} className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-black text-[10px] uppercase shadow-2xl hover:scale-105 transition-transform">Télécharger</a>
              )}
            </div>
          </>
        ) : (
          type === 'input' ? (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-[#FFD700]/10 transition-colors">
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, index)} />
              <span className="text-5xl text-[#FFD700] mb-2">+</span>
              <span className="text-[11px] font-black uppercase tracking-tighter text-[#FFD700]/40">Case Entrée {index + 1}</span>
            </label>
          ) : (
            <div className="flex flex-col items-center opacity-10">
              <span className="text-6xl">👑</span>
              <span className="text-[10px] font-black mt-2">SORTIE {index + 1}</span>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-32">
      {/* Barre d'Outil */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#FFD700] to-[#b8860b] text-black p-8 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-4 border-black">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-black uppercase italic leading-none">{toolId.replace(/-/g, ' ')}</h2>
          <p className="text-[11px] font-black uppercase tracking-widest mt-2 opacity-80">Studio Royal Haute Performance</p>
        </div>
        <button onClick={onBack} className="bg-black text-[#FFD700] px-10 py-4 rounded-full font-black uppercase text-xs hover:scale-110 transition-transform border-2 border-white shadow-2xl">Quitter le Studio</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* SECTION ENTRÉE */}
        <div className="space-y-8 bg-white/5 p-10 rounded-[3.5rem] border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#FFD700]/20 pb-6">
            <h3 className="font-black uppercase tracking-widest text-lg text-[#FFD700] flex items-center gap-4">
              <span className="bg-[#FFD700] text-black w-10 h-10 rounded-full flex items-center justify-center text-sm">01</span>
              Images Source (4 Cases)
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[0, 1, 2, 3].map(i => renderSlot('input', i))}
          </div>
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-white/50 block ml-2">Instructions pour l'I.A</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Exprimez vos désirs : 'Change le style en peinture royale', 'Améliore les détails', 'Ajoute une couronne'..."
              className="w-full bg-black/50 border-2 border-white/10 rounded-[2rem] p-8 text-white font-bold text-lg focus:border-[#FFD700] outline-none h-44 transition-all shadow-inner placeholder:text-white/10"
            />
          </div>
        </div>

        {/* SECTION SORTIE */}
        <div className="space-y-8 bg-white/5 p-10 rounded-[3.5rem] border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <h3 className="font-black uppercase tracking-widest text-lg text-white flex items-center gap-4">
              <span className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center text-sm">02</span>
              Résultats (4 Cases)
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[0, 1, 2, 3].map(i => renderSlot('output', i))}
          </div>
          <div className="bg-black/40 p-8 rounded-3xl border border-white/5 text-center italic text-white/30 text-sm">
            "Chaque pixel est traité avec la plus grande noblesse."
          </div>
        </div>
      </div>

      {/* Bouton Action Géant */}
      <div className="flex justify-center pt-8">
        <button 
          onClick={handleProcess}
          disabled={loading}
          className={`group relative overflow-hidden px-20 py-10 rounded-full bg-gradient-to-r from-[#FFD700] via-white to-[#FFD700] text-black text-3xl font-black uppercase shadow-[0_20px_80px_rgba(255,215,0,0.5)] border-4 border-black transition-all ${loading ? 'opacity-50 cursor-wait' : 'hover:scale-105 active:scale-95'}`}
        >
          <span className="relative z-10">{loading ? '🌀 Création en cours...' : '👑 Créer la Magie'}</span>
          {!loading && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />}
        </button>
      </div>
    </div>
  );
};

export default ToolInterface;