import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Agents', path: '/members' },
    { name: 'Trophies', path: '/achievements' },
    { name: 'Intel', path: '/blog' },

    ...(isAuthenticated ? [{ name: 'Writeups', path: '/writeups' }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cyber-black/95 backdrop-blur-md border-b border-cyber-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand / Logos */}
          <div className="flex items-center gap-4">
            {/* College Logo */}
            <a href="https://mite.ac.in" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                <div className="bg-white/90 p-1 rounded-sm">
                  <img 
                    src="/mite-logo.png" 
                    alt="MITE" 
                    className="h-8 w-auto" 
                  />
                  <span className="hidden text-black font-bold text-xs px-1">MITE</span>
                </div>
            </a>
            
            <div className="h-8 w-px bg-cyber-dim hidden sm:block"></div>

            {/* Club Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/crypton-logo.png" 
                alt="Crypton Logo" 
                className="h-10 w-10 object-contain drop-shadow-[0_0_2px_#39FF14] group-hover:drop-shadow-[0_0_8px_#39FF14] transition-all" 
              />
              <span className="text-xl font-bold tracking-tighter text-white hidden sm:block">
                CRYPTON<span className="text-cyber-neon">_CLUB</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => `px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2
                    ${isActive 
                      ? 'text-cyber-neon border-cyber-neon' 
                      : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
                    }
                  `}
                >
                  <span className="text-cyber-neon opacity-50 mr-1">{'>'}</span>
                  {link.name}
                </NavLink>
              ))}
            </div>

            {isAuthenticated && (
               <>
                 <div className="h-6 w-px bg-cyber-dim mx-2"></div>
                 <button 
                   onClick={logout}
                   className="flex items-center gap-2 text-xs font-mono text-red-400 hover:text-red-300 border border-red-900/50 bg-red-900/10 px-3 py-1.5 rounded transition-all"
                 >
                   <LogOut size={14} />
                   LOGOUT
                 </button>
               </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu (Hacker Style) */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-cyber-neon/30 shadow-[0_10px_40px_-10px_rgba(57,255,20,0.3)] animate-slideDown">
          
          {/* Decorative Terminal Header */}
          <div className="px-4 py-2 border-b border-cyber-dim/30 flex justify-between items-center bg-cyber-dim/5">
             <span className="text-[10px] font-mono text-cyber-neon/70">SYSTEM_ACCESS_GRANTED</span>
             <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
             </div>
          </div>

          <div className="px-2 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `group flex items-center px-4 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-300 border-l-2
                  ${isActive 
                    ? 'border-cyber-neon bg-cyber-neon/10 text-cyber-neon pl-6 shadow-[inset_10px_0_20px_-10px_rgba(57,255,20,0.1)]' 
                    : 'border-transparent text-gray-400 hover:text-white hover:border-cyber-neon/50 hover:bg-cyber-neon/5 hover:pl-6'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className={`mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-cyber-neon ${isActive ? 'opacity-100' : ''}`}>
                        {'>'}
                    </span>
                    {link.name}
                  </>
                )}
              </NavLink>
            ))}
             
             {/* Auth Buttons Mobile */}
             <div className="mt-4 pt-4 border-t border-cyber-dim/30 px-2">
             {isAuthenticated && (
               <button 
                 onClick={() => { logout(); setIsOpen(false); }}
                 className="w-full flex items-center justify-center gap-2 px-4 py-3 font-mono text-red-400 border border-red-900/30 hover:bg-red-900/10 rounded transition-all group"
               >
                 <LogOut size={16} className="group-hover:animate-pulse" /> 
                 <span className="tracking-widest">TERMINATE_SESSION</span>
               </button>
             )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;