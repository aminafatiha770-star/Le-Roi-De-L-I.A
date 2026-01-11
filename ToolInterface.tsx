
import React, { useState } from 'react';
import { ToolId } from '../types';
import { generateImage, editImage, processDocument, imageToPrompt } from '../services/gemini';
import { VIEW_ANGLES } from './constants';

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
        const results = await Promise.all(activeImages.map(img => editImage(img, mainPrompt || "Chef d'œuvre royal")));
        setOutputs([...results, ...Array(4 - results.length).fill('')]);
      } else if (toolId === 'doc-to-text') {
        if (!images[0]) throw new Error("Document requis dans la première case.");
        const base64 = images[0].split(',')[1];
        const text = await processDocument(base64, 'application/pdf');
        setResultText(text);
      } else if (toolId === 'image-to-prompt') {
        if (!images[0]) throw new Error("Image requise.");
        const text = await imageToPrompt(images[0]);
        setResultText(text);
      } else {
        if (!images[0]) throw new Error("Image requise.");
        const finalInstruction = toolId === 'view-angle' 
          ? `Change l'angle de vue pour: ${selectedAngle}. ${mainPrompt}`
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
    link.download = `LeRoi_IA_${toolId}_${index + 1}.png`;
    link.click();
  };

  const removeSlot = (index: number, isInput: boolean) => {
    if (isInput) {
      const newData = [...images]; newData[index] = ''; setImages(newData);
    } else {
      const newData = [...outputs]; newData[index] = ''; setOutputs(newData);
    }
  };

  const renderGrid = (isInput: boolean) => {
    const data = isInput ? images : outputs;
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="group aspect-square bg-[#00AFAF] rounded-[2rem] border-4 border-[#FFD700]/30 flex items-center justify-center relative overflow-hidden shadow-xl hover:border-[#FFD700] transition-all">
            {data[i] ? (
              <>
                <img src={data[i]} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#9933CC]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => downloadImage(data[i], i)} className="bg-[#FFD700] text-[#9933CC] p-3 rounded-full hover:scale-110">⬇️</button>
                  <button onClick={() => removeSlot(i, isInput)} className="bg-red-500 text-white p-3 rounded-full hover:scale-110">✕</button>
                </div>
              </>
            ) : (
              isInput ? (
                <button onClick={() => { const inp = document.createElement('input'); inp.type = 'file'; inp.onchange = (e: any) => onFileUpload(e, i); inp.click(); }} className="text-[#FFD700] flex flex-col items-center gap-1 hover:scale-110 transition">
                    <span className="text-5xl">+</span>
                    <span className="text-[10px] font-black uppercase text-white">CASE {i+1}</span>
                </button>
              ) : (
                <div className="opacity-20 flex flex-col items-center">
                    <span className="text-3xl">👑</span>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#FFD700] p-6 rounded-[2.5rem] border-4 border-[#9933CC] shadow-2xl gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black text-[#9933CC] uppercase italic tracking-tighter">{toolId.replace(/-/g, ' ')}</h2>
          <p className="text-white bg-[#9933CC] inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mt-1">Édition Royale</p>
        </div>
        <button 
          onClick={() => setSideBySide(!sideBySide)}
          className={`px-8 py-3 rounded-full text-[11px] font-black uppercase shadow-lg transition-all border-2 ${sideBySide ? 'bg-[#9933CC] text-[#FFD700] border-[#FFD700]' : 'bg-white text-[#9933CC] border-[#9933CC]'}`}
        >
          {sideBySide ? '↔️ VUE SIMPLE' : '↔️ CÔTE À CÔTE'}
        </button>
      </div>

      <div className={`grid ${sideBySide ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-8`}>
        <div className="space-y-6 bg-white/10 p-8 rounded-[3rem] border-4 border-[#FFD700]/40">
          <h3 className="text-[#FFD700] font-black uppercase italic text-xl flex items-center gap-3">
            <span className="bg-[#FFD700] text-[#9933CC] w-10 h-10 rounded-full flex items-center justify-center not-italic">1</span>
            ENTRÉES DU ROI
          </h3>
          
          {toolId === 'text-to-image' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inputs.map((val, idx) => (
                <input 
                  key={idx}
                  placeholder={`Description Image ${idx+1}...`}
                  className="w-full p-4 bg-white/20 rounded-2xl border-2 border-[#FFD700]/30 text-white font-bold outline-none focus:border-[#FFD700] placeholder:text-white/40"
                  value={val}
                  onChange={(e) => { const n = [...inputs]; n[idx] = e.target.value; setInputs(n); }}
                />
              ))}
            </div>
          ) : renderGrid(true)}

          <div className="space-y-4">
            {toolId === 'view-angle' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[#FFD700]">ANGLE DE VUE</label>
                <select 
                  value={selectedAngle}
                  onChange={(e) => setSelectedAngle(e.target.value)}
                  className="w-full p-4 bg-[#FFD700] text-[#9933CC] font-black rounded-2xl outline-none"
                >
                  {VIEW_ANGLES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            )}
            <textarea 
              placeholder="Instructions royales (ex: style 4k, lumière dorée, cinématique)..."
              className="w-full p-4 bg-white/20 rounded-[1.5rem] border-2 border-[#FFD700]/30 text-white text-sm min-h-[100px] outline-none focus:border-[#FFD700]"
              value={mainPrompt}
              onChange={(e) => setMainPrompt(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6 bg-white/10 p-8 rounded-[3rem] border-4 border-[#9933CC]/40">
          <h3 className="text-[#9933CC] font-black uppercase italic text-xl flex items-center gap-3">
            <span className="bg-[#9933CC] text-[#FFD700] w-10 h-10 rounded-full flex items-center justify-center not-italic">2</span>
            SORTIES DU ROI
          </h3>
          {resultText ? (
            <div className="bg-white/10 p-6 rounded-[1.5rem] border-2 border-[#FFD700]/30 text-white font-mono text-sm h-[350px] overflow-auto whitespace-pre-wrap">
              {resultText}
            </div>
          ) : renderGrid(false)}
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-[100]">
          <button 
            onClick={handleProcess}
            disabled={loading}
            className={`w-full py-6 rounded-full bg-[#FFD700] text-[#9933CC] text-2xl font-black uppercase tracking-widest shadow-[0_8px_0_rgba(153,51,204,1)] border-4 border-[#9933CC] ${loading ? 'opacity-50' : 'hover:translate-y-1 hover:shadow-[0_4px_0_rgba(153,51,204,1)] active:scale-95 transition-all'}`}
          >
            {loading ? '👑 TRAVAIL EN COURS...' : '👑 EXÉCUTER'}
          </button>
      </div>
    </div>
  );
};

export default ToolInterface;
