import React from 'react';
import { AppView } from '../types';
import { Button } from './Button';
import { Sun, AlertCircle, BookOpen, Moon, Sparkles, ArrowRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: AppView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full justify-between p-8 pt-14 animate-fade-in relative overflow-hidden">
      
      {/* Brand Identity - Horizon Line */}
      <div className="absolute top-0 left-0 w-full h-[45vh] pointer-events-none z-0">
        <svg 
            viewBox="0 0 500 200" 
            preserveAspectRatio="none" 
            className="w-full h-full opacity-20"
        >
            {/* Subtle curve simulating the logo's hill/horizon */}
            <path 
                d="M-50,150 Q250,50 550,150" 
                fill="none" 
                stroke="#A8C5DA" 
                strokeWidth="1.5" 
                strokeLinecap="round"
            />
        </svg>
      </div>

      {/* Header Section */}
      <div className="space-y-8 relative z-10">
        <div className="space-y-1">
          {/* Niche Context Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-gray-400"></span>
            <span className="text-[11px] tracking-[0.2em] font-semibold text-gray-500 uppercase">
              Rotina Escolar
            </span>
          </div>
          
          <div className="flex items-center gap-3">
             <p className="text-gray-600 text-sm uppercase tracking-widest font-bold">Bom dia</p>
             <Sun size={18} className="text-orange-400 animate-spin-slow" />
          </div>

          <h1 className="text-[2.5rem] font-light text-brand-dark leading-[1.1] tracking-tight">
            Hoje vamos <br/> 
            <span className="font-semibold text-[#1a202c]">acordar sem resistência.</span>
          </h1>

          {/* Continuity Indicator */}
          <div className="pt-2 flex items-center gap-2 animate-pulse-slow opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
            <span className="text-xs font-semibold text-gray-500">Sequência ativa</span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="space-y-4 mb-8 relative z-10">
        <Button 
          variant="primary" 
          onClick={() => onNavigate(AppView.GUIDED_AWAKE)}
          className="text-lg shadow-lg shadow-brand-blue/30 border-t border-white/80 group text-brand-dark font-semibold"
          icon={<Sun size={22} className="text-brand-dark/80" />}
        >
          INICIAR DESPERTAR
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="secondary" 
            onClick={() => onNavigate(AppView.QUICK_MODE)}
            className="text-xs font-semibold tracking-wide group text-gray-700"
            icon={<AlertCircle size={16} className="text-orange-700" />}
          >
            Manhã Difícil
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => onNavigate(AppView.FULL_SEQUENCE)}
            className="text-xs font-semibold tracking-wide group text-gray-700"
            icon={<BookOpen size={16} className="text-blue-600/80" />}
          >
            Ver Sequência
          </Button>
        </div>
        
        {/* Visual Divider / Logic Flow */}
        <div className="py-2 flex items-center gap-4 opacity-50">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-[10px] uppercase tracking-widest text-gray-400">Próximo Passo</span>
            <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* Prepare Tomorrow - Prominent Action */}
        <button 
            onClick={() => onNavigate(AppView.PREPARE)}
            className="w-full bg-white/60 hover:bg-white border border-brand-blue/20 p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 shadow-sm hover:shadow-md group text-left relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 w-1 h-full bg-brand-dark/10 group-hover:bg-brand-dark/20 transition-colors"></div>
          
          <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center shrink-0 group-hover:bg-brand-blue/20 transition-colors">
            <Moon size={20} className="text-brand-dark/60 group-hover:text-brand-dark" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-brand-dark leading-tight">Preparar Amanhã</h3>
            <p className="text-[11px] text-gray-500 mt-0.5 font-medium">Ciclo da noite • 30 segundos</p>
          </div>

          <div className="text-gray-300 group-hover:text-brand-dark transition-colors transform group-hover:translate-x-1 duration-300">
            <ArrowRight size={18} />
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center pb-2 relative z-10">
        <div className="flex justify-center mb-2">
            <Sparkles size={12} className="text-blue-400 animate-float" />
        </div>
        <p className="text-[10px] text-gray-500 font-medium tracking-wide opacity-80">
          Baseado em princípios de transição gradual do sono.
        </p>
      </div>
    </div>
  );
};