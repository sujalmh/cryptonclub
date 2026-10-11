import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, AlertTriangle, ChevronRight } from 'lucide-react';
import TerminalCard from '../components/TerminalCard';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
            <div className="max-w-xl w-full">
                <TerminalCard title="system_error.log" glowing>
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="relative">
                            <AlertTriangle size={64} className="text-red-500 animate-pulse" />
                            <div className="absolute top-0 left-0 w-full h-full animate-ping opacity-20 bg-red-500 rounded-full"></div>
                        </div>

                        <div className="space-y-2">
                             <h1 className="text-6xl font-bold font-mono text-white tracking-tighter">
                                4<span className="text-red-500">0</span>4
                             </h1>
                             <h2 className="text-xl font-mono text-red-400 tracking-widest uppercase">
                                PAGE_NOT_FOUND
                             </h2>
                        </div>

                        <div className="font-mono text-sm text-gray-400 bg-black/50 p-4 rounded border border-gray-800 w-full text-left">
                            <p>&gt; Initializing search sequence...</p>
                            <p>&gt; Targeting URL... <span className="text-red-500">FAILED</span></p>
                            <p>&gt; Error: The requested resource does not exist or has been moved to a classified sector.</p>
                            <p className="animate-pulse mt-2">&gt; _</p>
                        </div>

                        <Link 
                            to="/" 
                            className="group flex items-center gap-2 bg-cyber-neon text-black px-6 py-3 rounded font-bold font-mono hover:bg-white transition-all transform hover:scale-105"
                        >
                            RETURN_TO_BASE
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </TerminalCard>
            </div>
        </div>
    );
};

export default NotFound;
