import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "w-full rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] relative overflow-hidden";
  
  const variants = {
    primary: "bg-brand-blue text-[#1a202c] py-5 shadow-soft hover:shadow-glow hover:bg-[#D4E3F0] border border-white/50 backdrop-blur-sm",
    secondary: "bg-white/90 text-gray-800 border border-white/60 py-4 shadow-sm hover:bg-white hover:shadow-soft",
    ghost: "bg-transparent text-gray-600 hover:text-brand-dark py-2 hover:bg-black/5",
    outline: "border-2 border-brand-blue text-brand-dark py-3 hover:bg-brand-blue/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="opacity-90 transition-transform group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};