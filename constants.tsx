
import { Tool } from './types';

export const TOOLS: Tool[] = [
  { id: 'text-to-image', name: 'Texte vers Image', description: 'Générez 4 images (4 entrées / 4 sorties)', icon: '🎨', category: 'Image' },
  { id: 'image-to-image', name: 'Image vers Image', description: 'Transformez vos photos (4 entrées / 4 sorties)', icon: '🖼️', category: 'Image' },
  { id: 'image-to-prompt', name: 'Image vers Prompt', description: 'Obtenez le code secret d\'une image', icon: '📝', category: 'Creative' },
  { id: 'view-angle', name: 'Angle de Vue', description: 'Toutes les positions de vue IA', icon: '📐', category: 'Image' },
  { id: 'swap-angle', name: 'Swap Angle', description: 'Échangez les perspectives', icon: '🔄', category: 'Image' },
  { id: 'upscaler', name: 'Upscaler Image', description: 'Haute résolution instantanée', icon: '✨', category: 'Image' },
  { id: 'colorize', name: 'Coloriser Image', description: 'Donnez vie au noir et blanc', icon: '🌈', category: 'Image' },
  { id: 'retouch', name: 'Retouche Photo Pro', description: 'Toutes les options de retouche', icon: '🖌️', category: 'Image' },
  { id: 'convert-format', name: 'Convertir Formats', icon: '🔁', category: 'Image', description: 'PNG, JPG, WEBP...' },
  { id: 'logo-maker', name: 'Créations Logo', description: 'Identité visuelle royale', icon: '💎', category: 'Creative' },
  { id: 'ai-stylist', name: 'AI Stylist', description: 'Relooking vestimentaire IA', icon: '👔', category: 'Creative' },
  { id: 'skin-enhancer', name: 'Skin Enhancer', description: 'Peau parfaite et lisse', icon: '👤', category: 'Image' },
  { id: 'magic-enhancer', name: 'Image Enhancer Magic', description: 'Amélioration automatique', icon: '🪄', category: 'Image' },
  { id: 'remove-bg', name: 'Suppression Arrière-plan', description: 'Détourage propre', icon: '✂️', category: 'Image' },
  { id: 'remove-fg', name: 'Suppression Premier-plan', description: 'Nettoyage du sujet avant', icon: '🧹', category: 'Image' },
  { id: 'magic-eraser', name: 'Eraser Magic', description: 'Effacez des objets gênants', icon: '🧽', category: 'Image' },
  { id: 'art-generator', name: 'AI Art Generator', description: 'Générez de l\'art pur', icon: '🎭', category: 'Creative' },
  { id: 'relight', name: 'Relight', description: 'Changez l\'éclairage du studio', icon: '💡', category: 'Image' },
  { id: 'shot', name: 'Shot IA', description: 'Nouveaux angles de prise de vue', icon: '📸', category: 'Image' },
  { id: 'remove-emoji', name: 'Suppression Emojis', description: 'Nettoyez vos photos', icon: '😀', category: 'Image' },
  { id: 'restoration', name: 'Restauration Old Photo', description: 'Réparez le passé', icon: '🕰️', category: 'Image' },
  { id: 'doc-to-text', name: 'Document vers TXT', description: 'PDF, DOCX, ODT vers texte', icon: '📄', category: 'Document' },
  { id: 'text-to-doc', name: 'Texte vers Document', description: 'Créez des fichiers textes', icon: '📝', category: 'Document' },
  { id: 'text-to-video', name: 'Vidéo Royale', description: 'Génération vidéo Veo', icon: '🎬', category: 'Vidéo' },
];

export const VIEW_ANGLES = [
  'Grand-angle', 'Portrait', 'Vue de dessus (Top Down)', 'Vue de dessous (Low Angle)', 
  'Macro', 'Cinématique', 'Fisheye', 'Profil', 'Vue Drone', 'Plan américain'
];
