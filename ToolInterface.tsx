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
    if (activeInputs.length === 0 && toolId === 'image-to-image') {
      alert("Veuillez ajouter au moins une image dans l'une des 4 cases d'entrée.");
      return;
    }

    setLoading(true);
    try {
      if (toolId === 'image-to-image') {
        const results = await Promise.all(
          activeInputs.map(img => editImage(img, prompt || "Qualité studio pro, haute définition"))
        );
        const newOutputs = [...outputs];
        results.forEach((res, i) => { newOutputs[i] = res; });
        setOutputs(newOutputs);
      } else {
        const res = await generateImage(prompt || "Image magnifique et royale");
        setOutputs([res, '', '', '']);
      }
    } catch (err) {
      alert("Erreur lors de la génération. Vérifiez votre connexion.");
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
      <div className="aspect-square bg-white/5 border-2 border-[#FFD700]/20 rounded-3xl relative overflow-hidden group hover:border-[#FFD700] transition-all flex items-center justify-center">
        {content ? (
          <>
            <img src={content} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
              <button onClick={() => {
                const n = type === 'input' ? [...inputs] : [...outputs];
                n[index] = '';
                type === 'input' ? setInputs(n) : setOutputs(n);
              }} className="bg-red-600 text-white p-3 rounded-full font-bold shadow-lg">✕</button>
              {type === 'output' && (
                <a href={content} download={`roi-ia-${index}.png`} className="bg-[#FFD700] text-black p-3 rounded-full font-bold shadow-lg">⬇️</a>
              )}
            </div>
          </>
        ) : (
          type === 'input' ? (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-[#FFD700]/5">
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, index)} />
              <span className="text-4xl text-[#FFD700] mb-1">+</span>
              <span className="text-[10px] font-black uppercase text-[#FFD700]/30">CASE {index + 1}</span>
            </label>
          ) : (
            <span className="text-4xl opacity-5">👑</span>
          )
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Header Outil */}
      <div className="flex justify-between items-center bg-[#FFD700] text-black p-6 rounded-[2rem] shadow-2xl">
        <div>
          <h2 className="text-2xl font-black uppercase italic leading-none">{toolId.replace(/-/g, ' ')}</h2>
          <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-70">Studio Photo Haute Précision</p>
        </div>
        <button onClick={onBack} className="bg-black text-[#FFD700] px-6 py-2 rounded-full font-black uppercase text-[10px] hover:scale-110 transition-transform">Retour Accueil</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* SECTION ENTRÉE */}
        <div className="space-y-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
          <h3 className="font-black uppercase tracking-widest text-sm text-[#FFD700] flex items-center gap-2">
            <span className="bg-[#FFD700] text-black w-6 h-6 rounded-full flex items-center justify-center text-[10px]">1</span>
            4 Cases Entrantes (Photo)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map(i => renderSlot('input', i))}
          </div>
          <div className="pt-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Instructions de modification</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Transforme ces visages en style cartoon, ajoute un chapeau de roi, change le fond en or..."
              className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white font-bold text-sm focus:border-[#FFD700] outline-none h-32 transition-colors"
            />
          </div>
        </div>

        {/* SECTION SORTIE */}
        <div className="space-y-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
          <h3 className="font-black uppercase tracking-widest text-sm text-white flex items-center gap-2">
            <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-[10px]">2</span>
            4 Cases Sortantes (Résultats)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map(i => renderSlot('output', i))}
          </div>
        </div>
      </div>

      {/* Bouton Action */}
      <div className="text-center">
        <button 
          onClick={handleProcess}
          disabled={loading}
          className={`group px-16 py-8 rounded-full bg-[#FFD700] text-black text-2xl font-black uppercase shadow-[0_0_50px_rgba(255,215,0,0.3)] border-4 border-white transition-all ${loading ? 'opacity-50 cursor-wait' : 'hover:scale-105 active:scale-95'}`}
        >
          {loading ? '🌀 TRAITEMENT EN COURS...' : '👑 GÉNÉRER LA MAGIE'}
        </button>
      </div>
    </div>
  );
};

export default ToolInterface;