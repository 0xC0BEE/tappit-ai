// Fix: Add file extension to satisfy bundler/type checker.
import { CardTemplate } from '../types.ts';

export const templates: CardTemplate[] = [
    { id: 't1', name: 'Emerald', className: 'bg-gradient-to-br from-bamboo-9 to-bamboo-11', textColor: 'text-white' },
    { id: 't2', name: 'Forest', className: 'bg-bamboo-12', textColor: 'text-bamboo-4' },
    { id: 't3', name: 'Mint', className: 'bg-gradient-to-br from-bamboo-3 to-bamboo-5', textColor: 'text-bamboo-12' },
    { id: 't4', name: 'Charcoal', className: 'bg-gray-800', textColor: 'text-bamboo-7' },
    { id: 't5', name: 'Jade', className: 'bg-gradient-to-tr from-green-900 via-emerald-900 to-green-800', textColor: 'text-white' },
    { id: 't6', name: 'Ghost', className: 'bg-white/90 backdrop-blur-sm', textColor: 'text-gray-800' },
    { id: 't7', name: 'Sunset', className: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500', textColor: 'text-white' },
    { id: 't8', name: 'Ocean', className: 'bg-gradient-to-br from-blue-500 to-cyan-400', textColor: 'text-white' },
    { id: 't9', name: 'Noir', className: 'bg-black', textColor: 'text-bamboo-8' },
    { id: 't10', name: 'Sakura', className: 'bg-gradient-to-br from-pink-200 to-pink-300', textColor: 'text-gray-900' },
    { id: 't11', name: 'Gold', className: 'bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-500', textColor: 'text-black' },
    { id: 't12', name: 'Royal', className: 'bg-gradient-to-br from-indigo-700 to-purple-800', textColor: 'text-white' },
];