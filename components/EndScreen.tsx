import React, { useState } from 'react';
import { AppView } from '../types';
import { Button } from './Button';
import { Smile, Meh, Frown, RefreshCw } from 'lucide-react';

interface EndScreenProps {
  onNavigate: (view: AppView) => void;
  onRecord: (rating: 'good' | 'medium' | 'hard') => void;
  streak: number;
}

export const EndScreen: React.FC<EndScreenProps> = ({ onNavigate, onRecord, streak }) => {
  const [rated, setRated] = useState(false);

  const handleRating = (rating: 'good' | 'medium' | 'hard') => {
    onRecord(rating);
    setRated(true);
  };

  if (rated) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-8 bg-brand-blue animate-fade-in text-center">
        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-lg">
          <RefreshCw size={40} className="text-brand-dark" />
        </div>
        
        <h2 className="text-3xl font-light text-brand-dark mb-4">Dia iniciado.</h2>
        
        {streak >= 3 && (
          <div className="bg-white/50 px-6 py-3 rounded-xl mb-8">
            <p className="text-brand-dark font-medium">✨ Você está criando um novo padrão.</p>
            <p className="text-sm text-gray-600 mt-1">{streak} dias seguidos positivos!</p>
          </div>
        )}

        <p className="text-gray-600 mb-12 max-w-xs">
          Lembre-se: a consistência é mais importante que a perfeição.
        </p>

        <Button 
          variant="secondary" 
          onClick={() => onNavigate(AppView.HOME)}
          className="bg-white border-none shadow-md max-w-xs mx-auto"
        >
          Repetir amanhã
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 pt-12 animate-fade-in bg-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-light text-brand-dark text-center mb-2">
          Dia iniciado <br/>
          <span className="font-semibold">sem confronto.</span>
        </h2>
        
        <div className="w-16 h-1 bg-brand-blue rounded-full my-8"></div>

        <p className="text-gray-500 mb-8">Como foi hoje?</p>

        <div className="space-y-4 w-full max-w-xs">
          <button 
            onClick={() => handleRating('good')}
            className="w-full p-4 rounded-xl border border-gray-100 hover:bg-green-50 hover:border-green-100 flex items-center gap-4 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smile size={20} />
            </div>
            <span className="font-medium text-gray-700">Funcionou bem</span>
          </button>

          <button 
            onClick={() => handleRating('medium')}
            className="w-full p-4 rounded-xl border border-gray-100 hover:bg-yellow-50 hover:border-yellow-100 flex items-center gap-4 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Meh size={20} />
            </div>
            <span className="font-medium text-gray-700">Médio</span>
          </button>

          <button 
            onClick={() => handleRating('hard')}
            className="w-full p-4 rounded-xl border border-gray-100 hover:bg-red-50 hover:border-red-100 flex items-center gap-4 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Frown size={20} />
            </div>
            <span className="font-medium text-gray-700">Difícil</span>
          </button>
        </div>
      </div>
    </div>
  );
};