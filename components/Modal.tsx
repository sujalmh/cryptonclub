import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-cyber-neon/50 rounded-lg shadow-[0_0_20px_rgba(57,255,20,0.2)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-dim bg-cyber-dim/20">
            <h2 className="text-xl font-bold text-white font-mono">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={24} />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;