import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Members from './pages/Members';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Achievements from './pages/Achievements';
import Login from './pages/Login';
import Writeups from './pages/Writeups';
import WriteupDetail from './pages/WriteupDetail';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#050505] text-gray-200 selection:bg-cyber-neon selection:text-black">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/members" element={<Members />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/writeups" element={<Writeups />} />
                <Route path="/writeups/:id" element={<WriteupDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Footer */}
            <footer className="border-t border-cyber-dim mt-20 py-12 bg-cyber-dark/30">
              <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
                
                {/* Logos in Footer */}
                <div className="flex items-center gap-6 opacity-70 hover:opacity-100 transition-opacity">
                   <div className="bg-white/90 p-1.5 rounded-sm">
                      <img 
                        src="/mite-logo.png" 
                        alt="MITE" 
                        className="h-8 w-auto grayscale hover:grayscale-0 transition-all" 
                      />
                   </div>
                   <span className="text-gray-600 font-mono text-xs">x</span>
                   <img 
                     src="/crypton-logo.png" 
                     alt="Crypton" 
                     className="h-10 w-10 grayscale hover:grayscale-0 transition-all drop-shadow-[0_0_5px_rgba(57,255,20,0.3)]" 
                   />
                </div>

                <div className="text-center">
                  <p className="font-mono text-sm text-gray-500 mb-2">
                    &copy; {new Date().getFullYear()} CRYPTON CLUB
                  </p>
                  <p className="text-xs text-cyber-dim uppercase tracking-widest">
                    Mangalore Institute of Technology & Engineering
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;