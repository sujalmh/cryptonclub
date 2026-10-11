import React from 'react';

interface TerminalCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  glowing?: boolean;
  actions?: React.ReactNode;
}

const TerminalCard: React.FC<TerminalCardProps> = ({ 
  children, 
  title = "bash", 
  className = "",
  glowing = false,
  actions
}) => {
  return (
    <div className={`
      relative bg-cyber-dark border border-cyber-dim rounded-lg overflow-hidden
      transition-all duration-300 group
      ${glowing ? 'border-cyber-neon shadow-[0_0_15px_rgba(57,255,20,0.15)]' : 'hover:border-cyber-neon hover:shadow-[0_0_10px_rgba(57,255,20,0.2)]'}
      ${className}
    `}>
      {/* Terminal Header */}
      <div className="bg-cyber-dim/30 border-b border-cyber-dim px-3 py-2 md:px-4 flex items-center justify-between">
        <div className="flex gap-1.5 md:gap-2 items-center">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
          <div className="ml-2 text-[10px] md:text-xs text-gray-400 font-mono select-none truncate max-w-[150px] md:max-w-none">
            {title}
          </div>
        </div>
        
        {/* Actions Container with explicit stopPropagation */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
           {actions}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-6 text-gray-300 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default TerminalCard;