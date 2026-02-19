import React, { useState, useEffect, useRef } from 'react';
import { AppView } from '../types';
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Sun } from 'lucide-react';
import { playSoftChime } from '../services/audioService';

interface GuidedAwakeProps {
  onNavigate: (view: AppView) => void;
}

const TOTAL_TIME = 180; // 3 minutes

// Mapeamento visual e sensorial das etapas - Refined Palette (Abstract Sun)
const STEP_CONFIG = [
  {
    header: "Etapa 1 — Acalmar",
    emotionalIndicator: "Luz suave...",
    color: "from-brand-blue/30 to-brand-gold/10", // Blue to very faint gold
    glow: "bg-brand-blue/20"
  },
  {
    header: "Etapa 2 — Conectar",
    emotionalIndicator: "Despertar gradual...",
    color: "from-brand-blue/20 to-brand-gold/30", // Transitioning
    glow: "bg-brand-gold/20"
  },
  {
    header: "Etapa 3 — Conduzir",
    emotionalIndicator: "Dia começando...",
    color: "from-brand-gold/20 to-brand-gold/40", // Golden morning
    glow: "bg-brand-gold/30"
  }
];

const STEPS = [
  {
    id: 1,
    title: "Transição",
    instruction: "Não peça nada ainda. O corpo ainda está acordando.",
    bullets: ["Fale baixo", "Toque levemente", "Abra a cortina devagar"],
    duration: 60
  },
  {
    id: 2,
    title: "Estímulo",
    instruction: "Estimule. Não exija.",
    quote: "“Bom dia... já está quase na hora...”",
    subtext: "Sem pressa. Sem cobrança. Sem repetir.",
    duration: 60
  },
  {
    id: 3,
    title: "Primeira Ação",
    instruction: "Agora sim: peça a primeira ação simples.",
    quote: "“Senta na cama.”",
    subtext: "Sem negociar. Apenas conduzir.",
    duration: 60
  }
];

export const GuidedAwake: React.FC<GuidedAwakeProps> = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isActive, setIsActive] = useState(true);
  
  // Calculate current step index
  const elapsed = TOTAL_TIME - timeLeft;
  let currentStepIndex = 0;
  if (elapsed >= 120) currentStepIndex = 2;
  else if (elapsed >= 60) currentStepIndex = 1;

  const currentStep = STEPS[currentStepIndex];
  const visualConfig = STEP_CONFIG[currentStepIndex];
  
  // Circular progress math
  const radius = 125; // Slightly larger
  const circumference = 2 * Math.PI * radius;
  const stepProgress = (elapsed % 60) / 60; 
  const strokeDashoffset = circumference - stepProgress * circumference;

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      playSoftChime();
      onNavigate(AppView.END_SCREEN);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onNavigate]);

  // Sensory effects on step change
  const prevStepRef = useRef(currentStepIndex);
  useEffect(() => {
    if (currentStepIndex !== prevStepRef.current) {
      // Audio
      playSoftChime();
      // Haptic feedback (Mobile only)
      if (navigator.vibrate) navigator.vibrate(50);
      
      prevStepRef.current = currentStepIndex;
    }
  }, [currentStepIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col h-full bg-[#FDFCF8] animate-fade-in relative overflow-hidden">
      
      {/* Ambient Background Light (Refined Golden/Blue Mix) */}
      <div className={`absolute top-[-10%] left-0 right-0 h-[70%] bg-gradient-radial ${visualConfig.color} opacity-50 blur-[80px] pointer-events-none transition-all duration-1000`} />
      
      {/* Header */}
      <div className="relative z-10 flex justify-between items-center px-6 py-6 shrink-0">
        <button onClick={() => onNavigate(AppView.HOME)} className="text-brand-gray p-2 hover:text-brand-dark transition-colors bg-white/50 rounded-full backdrop-blur-md">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-white/40">
           <Sun size={14} className="text-brand-gold animate-spin-slow" />
           <span className="text-[11px] font-bold text-brand-gray tracking-widest uppercase">
             {visualConfig.header}
           </span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Main Content - Perfectly Centered */}
      <div className="flex-1 flex flex-col items-center justify-evenly relative z-10 px-6 w-full max-w-md mx-auto">
        
        {/* Timer Visualization - Abstract Sun */}
        <div className="relative flex items-center justify-center">
          {/* Enhanced Glow behind timer (Golden) */}
          <div className={`absolute inset-0 ${visualConfig.glow} blur-3xl rounded-full transform scale-110 transition-colors duration-1000`} />
          
          <svg width="290" height="290" className="transform -rotate-90 relative z-10">
            <defs>
              <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F2D696" /> {/* Brand Gold */}
                <stop offset="100%" stopColor="#E3EBF3" /> {/* Brand Blue (Soft) */}
              </linearGradient>
              <filter id="goldGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Track (Very subtle) */}
            <circle
              cx="145"
              cy="145"
              r={radius}
              stroke="#F3F4F6"
              strokeWidth="4"
              fill="transparent"
            />
            {/* Progress (Abstract Sun Arc) */}
            <circle
              cx="145"
              cy="145"
              r={radius}
              stroke="url(#sunGradient)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              filter="url(#goldGlow)"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <span className="text-[4rem] font-light text-brand-dark tabular-nums tracking-tighter leading-none opacity-90">
              {formatTime(timeLeft)}
            </span>
            <p className="text-sm font-medium text-brand-accent mt-4 animate-pulse tracking-wide px-4 text-center">
              {visualConfig.emotionalIndicator}
            </p>
          </div>
        </div>

        {/* Step Info Cards - Fixed height container */}
        <div className="text-center w-full max-w-sm flex flex-col items-center justify-start min-h-[180px]">
          <h2 className="text-3xl font-serif text-brand-dark transition-all duration-500 tracking-tight mb-3">
            {currentStep.title}
          </h2>
          <p className="text-gray-600 font-medium text-lg leading-relaxed transition-all duration-500 max-w-xs mx-auto">
            {currentStep.instruction}
          </p>

          {currentStep.bullets && (
            <div className="flex gap-2 mt-4 justify-center flex-wrap">
              {currentStep.bullets.map((b, i) => (
                <span key={i} className="text-xs font-semibold text-gray-500 bg-white/70 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                  {b}
                </span>
              ))}
            </div>
          )}

          {currentStep.quote && (
            <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-brand-blue/30 mt-4 shadow-sm w-full max-w-[300px]">
              <p className="font-serif font-medium text-brand-dark text-lg italic">
                {currentStep.quote}
              </p>
            </div>
          )}
           
          {currentStep.subtext && (
             <p className="text-xs font-semibold text-brand-gray/60 mt-3 uppercase tracking-widest">{currentStep.subtext}</p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 px-6 pb-10 pt-2 flex items-center justify-center gap-6 shrink-0">
        {/* Back Step Button */}
        <button 
             onClick={() => {
                if (navigator.vibrate) navigator.vibrate(30);
                const remainder = timeLeft % 60;
                let add = remainder === 0 ? 60 : (60 - remainder);
                let newTime = timeLeft + add;
                if (newTime > TOTAL_TIME) newTime = TOTAL_TIME;
                setTimeLeft(newTime);
             }}
             className={`p-4 rounded-full transition-all duration-300 ${timeLeft >= TOTAL_TIME ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/60 text-brand-gray hover:text-brand-dark'}`}
             disabled={timeLeft >= TOTAL_TIME}
           >
             <SkipBack size={28} />
        </button>

        {/* Play/Pause Main Button - Refined styles */}
        <button 
          onClick={() => {
            setIsActive(!isActive);
            if (navigator.vibrate) navigator.vibrate(20);
          }}
          className="w-20 h-20 rounded-full bg-white shadow-soft border border-white/60 flex items-center justify-center text-brand-dark hover:scale-105 active:scale-95 transition-all duration-300 group ring-4 ring-brand-warmBeige"
        >
          {isActive ? (
            <Pause size={32} className="text-brand-dark/70 group-hover:text-brand-dark fill-brand-dark/5" />
          ) : (
            <Play size={32} className="ml-1 text-brand-gold fill-brand-gold/20" />
          )}
        </button>
        
        {/* Next Step Button */}
        <button 
            onClick={() => {
            if (navigator.vibrate) navigator.vibrate(30);
            const remainder = timeLeft % 60;
            const nextBoundary = timeLeft - remainder;
            if (nextBoundary <= 0) {
                onNavigate(AppView.END_SCREEN);
            } else {
                setTimeLeft(nextBoundary);
            }
            }}
            className="p-4 rounded-full hover:bg-white/60 text-brand-gray hover:text-brand-dark transition-all"
        >
            <SkipForward size={28} />
        </button>
      </div>
    </div>
  );
};