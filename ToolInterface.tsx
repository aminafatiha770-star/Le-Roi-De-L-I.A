
import React, { useState, useRef } from 'react';
import { ToolId } from '../types';
import { generateImage, editImage, processDocument, imageToPrompt, generateVideo } from '../services/gemini';
import { VIEW_ANGLES } from '../constants';

interface ToolInterfaceProps {
  toolId: ToolId;
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ toolId }) => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<string[]>(['', '', '', '']); 
  const [images, setImages] = useState<string[]>(['', '', '', '']);
  const [outputs, setOutputs] = useState<string[]>(['', '', '', '']);
  const [mainPrompt, setMainPrompt] = useState<string>(''); 
  const [resultText, setResultText] = useState<string>('');
  const [sideBySide, setSideBySide] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcess = async () => {
    setLoading(true);
    try {
      if (toolId === 'text-to-image') {
        const activePrompts = inputs.filter(i => i.trim());
        if (activePrompts.length === 0) throw new Error("Entrez au moins un texte.");
        const results = await Promise.all(activePrompts.map(p => generateImage(p)));
        setOutputs([...results, ...Array(4 - results.length).fill('')]);
      } else if (toolId === 'image-to-image') {
        const activeImages = images.filter(img => img);
        if (activeImages.length === 0) throw new Error("Uploadez au moins une image.");
        const results = await Promise.all(activeImages.map(img => editImage(img, mainPrompt || "Enhance this image")));
        setOutputs([...results, ...Array(4 - results.length).fill('')]);
      } else if (toolId === 'doc-to-text') {
        if (!images[0]) throw new Error("Document requis.");
        const text = await processDocument(images[0].split(',')[1], 'application/pdf');
        setResultText(text);
      } else {
        // Autres outils single-image
        if (!images[0]) throw new Error("Image requise.");
        const res = await editImage(images[0], `Tool: ${toolId}. ${mainPrompt}`);
        setOutputs([res, '', '', '']);
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number = 0) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newData = [...images];
        newData[index] = ev.target?.result as string;
        setImages(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderGrid = (isInput: boolean) => {
    const data = isInput ? images : outputs;
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-square bg-black/40 rounded-3xl border-2 border-turquoise/30 flex items-center justify-center relative overflow-hidden">
            {data[i] ? (
              <img src={data[i]} className="w-full h-full object-cover" />
            ) : (
              isInput ? (
                <button 
                  onClick={() => {
                    const inp = document.createElement('input');
                    inp.type = 'file';
                    inp.onchange = (e: any) => onFileUpload(e, i);
                    inp.click();
                  }}
                  className="text-gold text-4xl hover:scale-125 transition"
                >+</button>
              ) : <span className="text-[10px] text-white/20 uppercase font-black">Résultat {i+1}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32">
      <div className="flex justify-between items-center bg-black/20 p-6 rounded-[2rem] border border-gold/20">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase">{toolId.replace(/-/g, ' ')}</h2>
          <p className="text-turquoise text-[10px] font-bold uppercase tracking-widest">Le Roi opère pour vous</p>
        </div>
        <button 
          onClick={() => setSideBySide(!sideBySide)}
          className="px-6 py-2 bg-turquoise text-white font-black rounded-full text-[10px] uppercase shadow-lg hover:brightness-110"
        >
          {sideBySide ? 'Mode Normal' : 'Bouton Side-by-Side'}
        </button>
      </div>

      <div className={`grid ${sideBySide ? 'grid-cols-2' : 'grid-cols-1 lg:grid-cols-2'} gap-8`}>
        {/* ENTRÉES */}
        <div className="space-y-6 bg-emerald-900/40 p-8 rounded-[3rem] border border-white/5">
          <h3 className="text-gold font-black uppercase italic">Cases Entrantes (4)</h3>
          {toolId === 'text-to-image' ? (
            <div className="space-y-3">
              {inputs.map((val, idx) => (
                <input 
                  key={idx}
                  placeholder={`Prompt ${idx+1}...`}
                  className="w-full p-4 bg-black/30 rounded-2xl border border-turquoise/20 text-white font-bold outline-none focus:border-gold"
                  value={val}
                  onChange={(e) => {
                    const n = [...inputs]; n[idx] = e.target.value; setInputs(n);
                  }}
                />
              ))}
            </div>
          ) : renderGrid(true)}
          
          <textarea 
            placeholder="Instructions supplémentaires pour le Roi..."
            className="w-full p-4 bg-black/30 rounded-2xl border border-turquoise/20 text-white text-sm min-h-[100px]"
            value={mainPrompt}
            onChange={(e) => setMainPrompt(e.target.value)}
          />

          {toolId === 'view-angle' && (
            <select className="w-full p-4 bg-gold text-mauve font-black rounded-2xl outline-none">
              {VIEW_ANGLES.map(a => <option key={a}>{a}</option>)}
            </select>
          )}
        </div>

        {/* SORTIES */}
        <div className="space-y-6 bg-emerald-900/40 p-8 rounded-[3rem] border border-white/5">
          <h3 className="text-turquoise font-black uppercase italic">Cases Sortantes (4)</h3>
          {resultText ? (
            <div className="bg-black/50 p-6 rounded-3xl border border-gold/30 text-white font-mono text-xs whitespace-pre-wrap h-[300px] overflow-auto">
              {resultText}
            </div>
          ) : renderGrid(false)}
        </div>
      </div>

      <button 
        onClick={handleProcess}
        disabled={loading}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-xl py-6 btn-royal text-xl tracking-[0.3em] z-50 disabled:opacity-50"
      >
        {loading ? '⚡ TRAITEMENT ROYAL...' : '👑 EXÉCUTER'}
      </button>
    </div>
  );
};

export default ToolInterface;
