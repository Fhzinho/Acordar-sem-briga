import React, { useState, useEffect } from 'react';
import { AppView, AppState } from './types';
import { Home } from './components/Home';
import { PrepareTomorrow } from './components/PrepareTomorrow';
import { GuidedAwake } from './components/GuidedAwake';
import { QuickMode } from './components/QuickMode';
import { FullSequence } from './components/FullSequence';
import { EndScreen } from './components/EndScreen';
import { PrepareEndScreen } from './components/PrepareEndScreen';

const STORAGE_KEY = 'acordar_sem_erro_data';

// Splash Screen Component
const SplashScreen: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#E3EBF3] via-[#FDFCF8] to-[#FDFCF8] transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative animate-rise">
        {/* CSS Composition of the Logo: Sun + Hills */}
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-16 overflow-hidden mb-[-1px]">
                 {/* Rays */}
                 <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-32 h-32">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-brand-gold rounded-full origin-bottom transform -translate-y-4" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-brand-gold rounded-full origin-bottom transform rotate-45 -translate-y-2 translate-x-5" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-brand-gold rounded-full origin-bottom transform -rotate-45 -translate-y-2 -translate-x-5" />
                 </div>
                 {/* Sun Body */}
                 <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-16 h-16 bg-brand-gold rounded-full shadow-[0_0_25px_rgba(242,214,150,0.6)]" />
            </div>
            {/* Hills */}
            <div className="relative w-32 h-6 overflow-hidden mt-[-8px] z-10 flex justify-center">
                <div className="absolute bottom-0 w-24 h-8 bg-[#A8C5DA] rounded-[50%] transform -translate-x-4 opacity-80" />
                <div className="absolute bottom-0 w-24 h-8 bg-[#9BC4BC] rounded-[50%] transform translate-x-4 opacity-80" />
            </div>
        </div>
        
        {/* Text */}
        <div className="text-center mt-4 space-y-0.5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-2xl font-bold text-brand-dark tracking-tight">Acordar</h1>
            <p className="text-sm font-light text-brand-dark/80 tracking-wide">Sem Briga</p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [showSplash, setShowSplash] = useState(true);
  const [data, setData] = useState<AppState>({
    streak: 0,
    lastCompleted: null,
    history: []
  });

  // Handle Splash Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 2 seconds total display
    return () => clearTimeout(timer);
  }, []);

  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load data", e);
      }
    }
  }, []);

  const handleRecordFeedback = (rating: 'good' | 'medium' | 'hard') => {
    const today = new Date().toISOString().split('T')[0];
    
    // Calculate streak
    let newStreak = data.streak;
    
    if (rating === 'good') {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (data.lastCompleted === yesterdayStr) {
            newStreak += 1;
        } else if (data.lastCompleted !== today) {
            newStreak = 1; 
        }
    } else {
        newStreak = 0;
    }

    const newData = {
      streak: newStreak,
      lastCompleted: today,
      history: [...data.history, { date: today, rating }]
    };

    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Home onNavigate={setCurrentView} />;
      case AppView.PREPARE:
        return <PrepareTomorrow onNavigate={setCurrentView} />;
      case AppView.PREPARE_END:
        return <PrepareEndScreen onNavigate={setCurrentView} />;
      case AppView.GUIDED_AWAKE:
        return <GuidedAwake onNavigate={setCurrentView} />;
      case AppView.QUICK_MODE:
        return <QuickMode onNavigate={setCurrentView} />;
      case AppView.FULL_SEQUENCE:
        return <FullSequence onNavigate={setCurrentView} />;
      case AppView.END_SCREEN:
        return <EndScreen onNavigate={setCurrentView} onRecord={handleRecordFeedback} streak={data.streak} />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-brand-dark flex justify-center items-center">
      {/* 
         Mobile First Container 
         Updated background to specific gradients and grain
      */}
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] md:max-h-[90vh] md:rounded-3xl shadow-2xl relative overflow-hidden bg-grain bg-gradient-to-b from-[#EFF5F9] via-[#FDFCF8] to-[#FAF9F6]">
        
        {/* Splash Overlay - Fades out but stays in DOM briefly */}
        <div className={`absolute inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${showSplash ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
            <SplashScreen visible={true} />
        </div>

        <div className={`relative z-10 h-full transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default App;