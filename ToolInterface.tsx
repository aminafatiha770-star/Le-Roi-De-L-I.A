
import React, { useState } from 'react';
import { ToolId } from '../types';
import { generateImage, editImage, processDocument, imageToPrompt } from '../services/gemini';
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
  const [selectedAngle, setSelectedAngle] = useState(VIEW_ANGLES[0]);

  const handleProcess = async () => {
    setLoading(true);
    try {
      if (toolId === 'text-to-image') {
        const activePrompts = inputs.filter(i => i.trim());
        if (activePrompts.length === 0) throw new Error("Veuillez remplir au moins une case entrante.");
        const results = await Promise.all(activePrompts.map(p => generateImage(p)));
        setOutputs([...results, ...Array(4 - results.length).fill('')]);
      } else if (toolId === 'image-to-image') {
        const activeImages = images.filter(img => img);
        if (activeImages.length === 0) throw new Error("Veuillez uploader au moins une image.");
        const results = await Promise.all(activeImages.map(img => editImage(img, mainPrompt || "Style royal")));
        setOutputs([...results, ...Array(4 - results.length).fill('')]);
      } else if (toolId === 'doc-to-text') {
        if (!images[0]) throw new Error("Document requis dans la première case.");
        const text = await processDocument(images[0].split(',')[1], 'application/pdf');
        setResultText(text);
      } else if (toolId === 'image-to-prompt') {
        if (!images[0]) throw new Error("Image requise.");
        const text = await imageToPrompt(images[0]);
        setResultText(text);
      } else {
        if (!images[0]) throw new Error("Image requise.");
        const finalInstruction = toolId === 'view-angle' 
          ? `Change l'angle de vue pour un style: ${selectedAngle}. ${mainPrompt}`
          : `Action: ${toolId}. Instructions: ${mainPrompt}`;
        const res = await editImage(images[0], finalInstruction);
        setOutputs([res, '', '', '']);
      }
    } catch (e: any) {
      alert("⚠️ " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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

  const downloadImage = (dataUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `LeRoiDeLIA_${toolId}_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeSlot = (index: number, isInput: boolean) => {
    if (isInput) {
      const newData = [...images];
      newData[index] = '';
      setImages(newData);
    } else {
      const newData = [...outputs];
      newData[index] = '';
      setOutputs(newData);
    }
  };

  const renderGrid = (isInput: boolean) => {
    const data = isInput ? images : outputs;
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="group aspect-square bg-black/40 rounded-[2.5rem] border-2 border-turquoise/30 flex items-center justify-center relative overflow-hidden shadow-2xl transition-all hover:border-gold">
            {data[i] ? (
              <>
                <img src={data[i]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={() => downloadImage(data[i], i)}
                    className="bg-gold text-mauve p-4 rounded-full shadow-2xl hover:scale-125 transition flex items-center justify-center border-2 border-white/20"
                  >
                    <span className="text-2xl">⬇️</span>
                  </button>
                  <button 
                    onClick={() => removeSlot(i, isInput)}
                    className="bg-red-600 text-white p-4 rounded-full shadow-2xl hover:scale-125 transition flex items-center justify-center border-2 border-white/20"
                  >
                    <span className="text-2xl leading-none">✕</span>
                  </button>
                </div>
              </>
            ) : (
              isInput ? (
                <button 
                  onClick={() => {
                    const inp = document.createElement('input');
                    inp.type = 'file';
                    inp.accept = "image/*,application/pdf";
                    inp.onchange = (e: any) => onFileUpload(e, i);
                    inp.click();
                  }}
                  className="text-gold flex flex-col items-center gap-2 transition-all hover:scale-110"
                >
                    <span className="text-6xl">+</span>
                    <span className="text-[9px] font-black uppercase text-turquoise">Uploader {i+1}</span>
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2 opacity-10">
                    <span className="text-4xl">👑</span>
                    <span className="text-[8px] text-white uppercase font-black tracking-widest">Résultat {i+1}</span>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-44">
      <div className="flex flex-col md:flex-row justify-between items-center bg-black/30 backdrop-blur-xl p-10 rounded-[3.5rem] border border-gold/30 shadow-[0_0_40px_rgba(0,0,0,0.5)] gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter drop-shadow-lg">{toolId.replace(/-/g, ' ')}</h2>
          <p className="text-turquoise text-[11px] font-black uppercase tracking-[0.5em] mt-2">Le Studio Royal à votre service</p>
        </div>
        <button 
          onClick={() => setSideBySide(!sideBySide)}
          className={`px-10 py-4 rounded-full text-[12px] font-black uppercase shadow-2xl transition-all border-2 ${sideBySide ? 'bg-gold text-mauve border-white/20' : 'bg-turquoise text-white border-white/10'}`}
        >
          {sideBySide ? '📱 Vue Simple' : '↔️ Côte à Côte'}
        </button>
      </div>

      <div className={`grid ${sideBySide ? 'grid-cols-2' : 'grid-cols-1 lg:grid-cols-2'} gap-12`}>
        <div className="space-y-8 bg-emerald-900/40 p-12 rounded-[4.5rem] border border-white/10 shadow-2xl">
          <h3 className="text-gold font-black uppercase italic text-xl flex items-center gap-4">
            <span className="bg-gold text-mauve w-10 h-10 rounded-full flex items-center justify-center text-lg not-italic shadow-xl">1</span>
            Entrées
          </h3>
          {toolId === 'text-to-image' ? (
            <div className="space-y-4">
              {inputs.map((val, idx) => (
                <input 
                  key={idx}
                  placeholder={`Décrivez l'image ${idx+1}...`}
                  className="w-full p-6 bg-black/40 rounded-3xl border-2 border-turquoise/20 text-white font-bold outline-none focus:border-gold focus:bg-black/60 transition-all placeholder:text-white/20"
                  value={val}
                  onChange={(e) => {
                    const n = [...inputs]; n[idx] = e.target.value; setInputs(n);
                  }}
                />
              ))}
            </div>
          ) : renderGrid(true)}
          
          <div className="space-y-4">
            {toolId === 'view-angle' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gold ml-4">Choisir l'Angle</label>
                <select 
                  value={selectedAngle}
                  onChange={(e) => setSelectedAngle(e.target.value)}
                  className="w-full p-6 bg-gold text-mauve font-black rounded-3xl outline-none cursor-pointer border-4 border-white/20"
                >
                  {VIEW_ANGLES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            )}
            <textarea 
              placeholder="Instructions supplémentaires (ex: 'Rendre plus lumineux', 'Style 4k', 'Ajouter du doré')..."
              className="w-full p-6 bg-black/40 rounded-[2.5rem] border-2 border-turquoise/20 text-white text-sm min-h-[140px] outline-none focus:border-gold transition-all"
              value={mainPrompt}
              onChange={(e) => setMainPrompt(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-8 bg-emerald-900/60 p-12 rounded-[4.5rem] border border-white/10 shadow-2xl">
          <h3 className="text-turquoise font-black uppercase italic text-xl flex items-center gap-4">
            <span className="bg-turquoise text-white w-10 h-10 rounded-full flex items-center justify-center text-lg not-italic shadow-xl">2</span>
            Sorties
          </h3>
          {resultText ? (
            <div className="bg-black/60 p-8 rounded-[3rem] border-2 border-gold/30 text-white font-mono text-sm h-[450px] overflow-auto leading-relaxed">
              {resultText}
            </div>
          ) : renderGrid(false)}
          
          <div className="text-center">
            <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em]">
                Résultats générés en temps réel par <span className="text-gold">Le Roi</span>
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl z-[100] px-4">
          <button 
            onClick={handleProcess}
            disabled={loading}
            className={`w-full py-8 btn-royal text-3xl tracking-[0.4em] flex items-center justify-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] ${loading ? 'opacity-70 grayscale cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
          >
            {loading ? (
                <>
                    <span className="animate-spin text-4xl">🌀</span>
                    <span>TRAVAIL DU ROI...</span>
                </>
            ) : (
                <>
                    <span className="text-4xl">👑</span>
                    <span>EXÉCUTER</span>
                </>
            )}
          </button>
      </div>
    </div>
  );
};

export default ToolInterface;
