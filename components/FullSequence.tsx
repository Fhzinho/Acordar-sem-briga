import React, { useState, useRef, useEffect } from 'react';
import { AppView } from '../types';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';

interface FullSequenceProps {
  onNavigate: (view: AppView) => void;
}

export const FullSequence: React.FC<FullSequenceProps> = ({ onNavigate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Updated content: Shorter, punchier, authoritative.
  const cards = [
    {
      step: "01",
      label: "BASE",
      title: "O erro invisível",
      content: "Acordar não é um botão. Exigir rapidez nesse momento ativa a defesa biológica da criança.",
      law: "Forçar acelera o conflito."
    },
    {
      step: "02",
      label: "REGRA",
      title: "O primeiro passo",
      content: "Tire do sono profundo sem susto. Abra cortinas, toque levemente. Sem comandos verbais ainda.",
      law: "Conexão antes de correção."
    },
    {
      step: "03",
      label: "SEQUÊNCIA",
      title: "Ativação sensorial",
      content: "Movimente o ambiente. Use tom de voz normal. Não exija resposta ou conversa agora.",
      law: "O ambiente acorda primeiro."
    },
    {
      step: "04",
      label: "APLICAÇÃO",
      title: "O comando único",
      content: "Olhos abertos? Dê uma instrução motora clara: 'Senta na cama'. Nada de escolhas.",
      law: "Uma coisa de cada vez."
    },
    {
      step: "05",
      label: "CONSISTÊNCIA",
      title: "A nova regra",
      content: "Repita por 7 dias. O cérebro passará a associar o despertar com segurança, não ameaça.",
      law: "Segurança elimina resistência."
    }
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const isAtEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) < 20;
      const isAtStart = scrollLeft < 20;
      
      setCanScrollRight(!isAtEnd);
      setCanScrollLeft(!isAtStart);
    }
  };

  useEffect(() => {
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = 320;
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = 320;
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FDFCF8] relative">
      {/* Header */}
      <div className="p-6 pb-2 flex items-center justify-between bg-[#FDFCF8] z-20 shrink-0">
        <div className="flex items-center">
            <button onClick={() => onNavigate(AppView.HOME)} className="p-2 -ml-2 text-brand-gray hover:text-brand-dark transition-colors">
            <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-medium text-brand-dark ml-2 tracking-tight">Sequência Ideal</h2>
        </div>
        {/* Removed 'Método' badge as requested */}
      </div>

      {/* Main Content Area */}
      <div 
        className="flex-1 relative w-full overflow-hidden flex flex-col justify-center pb-8 group/container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-center overflow-x-auto gap-6 px-8 snap-x snap-mandatory no-scrollbar h-full py-4 relative z-10"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className="snap-center shrink-0 w-[85vw] max-w-[320px] h-[65vh] max-h-[540px] bg-white rounded-[1.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] flex flex-col relative group border border-stone-100 overflow-hidden"
            >
              {/* Architectural Numbering (Watermark Anchor) */}
              <div className="absolute -right-4 -top-8 text-[12rem] font-serif text-[#F0F2F5] font-bold select-none pointer-events-none z-0 leading-none opacity-60">
                {card.step}
              </div>

              {/* Card Header */}
              <div className="relative z-10 px-8 pt-10 pb-4">
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-brand-dark/30 font-serif">
                            {card.step}
                        </span>
                        <div className="h-px w-8 bg-brand-dark/10"></div>
                        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-dark/50 font-bold">
                            {card.label}
                        </span>
                    </div>
                    <span className="text-[10px] text-brand-blue font-bold uppercase tracking-wider mt-1">
                        Etapa Estratégica {idx + 1}/5
                    </span>
                 </div>
              </div>

              {/* Card Body */}
              <div className="relative z-10 px-8 flex-1 flex flex-col justify-center">
                <h3 className="text-3xl font-serif text-brand-dark leading-[1.1] tracking-tight mb-5">
                    {card.title}
                </h3>
                
                {/* Visual Divider */}
                <div className="w-10 h-[3px] bg-brand-blue mb-6"></div>
                
                <p className="text-stone-600 text-[1.05rem] leading-relaxed font-medium">
                  {card.content}
                </p>
              </div>

              {/* Card Footer (The Law) */}
              <div className="relative z-10 px-8 pb-10 pt-6 mt-auto bg-gradient-to-t from-white via-white to-transparent">
                 <div className="border-l-2 border-brand-accent/40 pl-4 py-1">
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">
                        Lei da manhã
                    </p>
                    <p className="text-base font-serif italic text-brand-dark/90">
                        {card.law}
                    </p>
                 </div>
              </div>
            </div>
          ))}
          
          {/* Spacer */}
          <div className="w-4 shrink-0 h-1" />
        </div>

        {/* Floating Indicator Overlays */}
        <div 
           className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FDFCF8] via-[#FDFCF8]/80 to-transparent pointer-events-none transition-opacity duration-500 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} 
        />
        <div 
           className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FDFCF8] via-[#FDFCF8]/80 to-transparent pointer-events-none transition-opacity duration-500 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} 
        />

        {/* Floating Arrow Left */}
        <div 
            className={`absolute left-6 top-1/2 -translate-y-1/2 z-30 transition-all duration-500 transform ${
                canScrollLeft && isHovering 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 -translate-x-4 scale-90 pointer-events-none'
            }`}
        >
            <button 
                onClick={handleScrollLeft}
                className="bg-white text-brand-dark p-4 rounded-full shadow-xl shadow-stone-200 hover:bg-brand-blue hover:text-brand-dark transition-all flex items-center justify-center border border-stone-100"
                aria-label="Anterior"
            >
                <ChevronLeft size={22} />
            </button>
        </div>

        {/* Floating Arrow Right - Updated to White */}
        <div 
            className={`absolute right-6 top-1/2 -translate-y-1/2 z-30 transition-all duration-500 transform ${
                canScrollRight && isHovering 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-4 scale-90 pointer-events-none'
            }`}
        >
            <button 
                onClick={handleScrollRight}
                className="bg-white text-brand-dark p-4 rounded-full shadow-xl shadow-stone-200 hover:bg-brand-blue hover:text-brand-dark transition-all flex items-center justify-center border border-stone-100"
                aria-label="Próximo"
            >
                <ChevronRight size={22} />
            </button>
        </div>
      </div>
      
      {/* Footer Hint */}
      <div className="p-6 text-center shrink-0 z-10">
        <p className="text-[10px] uppercase tracking-widest text-brand-gray/40 font-bold">
            Estrutura do Método
        </p>
      </div>
    </div>
  );
};