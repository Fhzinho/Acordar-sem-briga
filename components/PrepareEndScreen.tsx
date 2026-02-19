import React, { useState } from 'react';
import { AppView } from '../types';
import { Button } from './Button';
import { Smile, Meh, Frown, Moon, CheckCircle2 } from 'lucide-react';

interface PrepareEndScreenProps {
  onNavigate: (view: AppView) => void;
}

export const PrepareEndScreen: React.FC<PrepareEndScreenProps> = ({ onNavigate }) => {
  const [rated, setRated] = useState(false);

  const handleRating = () => {
    // Simple state change for visual feedback, not recording strict stats for preparation yet
    setRated(true);
  };

  if (rated) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-8 bg-[#1a202c] animate-fade-in text-center">
        <div className="bg-white/10 w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-glow border border-white/20">
          <Moon size={40} className="text-brand-gold" />
        </div>
        
        <h2 className="text-3xl font-light text-white mb-4">Boa noite.</h2>
        
        <div className="bg-white/10 px-6 py-3 rounded-xl mb-8 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 justify-center mb-1">
                <CheckCircle2 size={16} className="text-brand-greenSoft" />
                <p className="text-brand-greenSoft font-medium text-sm tracking-wide uppercase">Dever cumprido</p>
            </div>
            <p className="text-sm text-gray-300 mt-1">Sua manhã já está adiantada.</p>
        </div>

        <p className="text-gray-400 mb-12 max-w-xs font-light">
          Durma com a tranquilidade de quem já resolveu o amanhã.
        </p>

        <Button 
          variant="secondary" 
          onClick={() => onNavigate(AppView.HOME)}
          className="bg-brand-gold text-brand-dark border-none shadow-glow max-w-xs mx-auto hover:bg-white font-bold"
        >
          Voltar ao Início
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 pt-12 animate-fade-in bg-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-light text-brand-dark text-center mb-2 leading-tight">
          Amanhã organizado <br/>
          <span className="font-semibold">sem estresse.</span>
        </h2>
        
        <div className="w-16 h-1 bg-brand-dark/10 rounded-full my-8"></div>

        <p className="text-gray-500 mb-8 font-medium">Como foi a preparação?</p>

        <div className="space-y-4 w-full max-w-xs">
          <button 
            onClick={handleRating}
            className="w-full p-4 rounded-xl border border-gray-100 hover:bg-green-50 hover:border-green-100 flex items-center gap-4 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smile size={20} />
            </div>
            <span className="font-medium text-gray-700">Fluiu bem</span>
          </button>

          <button 
            onClick={handleRating}
            className="w-full p-4 rounded-xl border border-gray-100 hover:bg-yellow-50 hover:border-yellow-100 flex items-center gap-4 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Meh size={20} />
            </div>
            <span className="font-medium text-gray-700">Médio</span>
          </button>

          <button 
            onClick={handleRating}
            className="w-full p-4 rounded-xl border border-gray-100 hover:bg-red-50 hover:border-red-100 flex items-center gap-4 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Frown size={20} />
            </div>
            <span className="font-medium text-gray-700">Houve resistência</span>
          </button>
        </div>
      </div>
    </div>
  );
};