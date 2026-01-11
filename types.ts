
export type ToolId = 
  | 'text-to-image' 
  | 'image-to-image' 
  | 'image-to-prompt' 
  | 'view-angle'
  | 'swap-angle'
  | 'upscaler'
  | 'colorize'
  | 'retouch'
  | 'convert-format'
  | 'logo-maker'
  | 'ai-stylist'
  | 'skin-enhancer'
  | 'magic-enhancer'
  | 'remove-bg'
  | 'remove-fg'
  | 'magic-eraser'
  | 'art-generator'
  | 'relight'
  | 'shot'
  | 'remove-emoji'
  | 'restoration'
  | 'doc-to-text'
  | 'text-to-doc'
  | 'text-to-video';

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: string;
  category: 'Image' | 'Document' | 'Creative' | 'Vidéo';
}
