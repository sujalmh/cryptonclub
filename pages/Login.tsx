import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TerminalCard from '../components/TerminalCard';
import { Lock, Terminal } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/events'); // Redirect to a protected page or home
    } else {
      setError('Access Denied: Invalid Authentication Token');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md">
        <TerminalCard title="auth_protocol.exe" glowing={true}>
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-full bg-cyber-dim/30 border border-cyber-neon mb-4">
              <Lock className="w-8 h-8 text-cyber-neon" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Restricted Area</h1>
            <p className="text-gray-400 text-sm">Enter admin credentials to proceed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-cyber-neon text-xs font-bold mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#050505] border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon font-mono transition-all pl-10"
                  placeholder="********"
                  autoFocus
                />
                <Terminal className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded text-xs font-mono">
                {'>'} {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-cyber-neon text-black font-bold py-3 rounded hover:bg-white hover:shadow-[0_0_15px_#39FF14] transition-all"
            >
              Authenticate
            </button>
          </form>
        </TerminalCard>
      </div>
    </div>
  );
};

export default Login;