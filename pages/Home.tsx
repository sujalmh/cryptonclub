import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ChevronRight, Target, Award, Users } from 'lucide-react';
import TerminalCard from '../components/TerminalCard';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { events, achievements, members } = useData();
  const [text, setText] = useState('');
  const fullText = "join the hunt...";

  const upcomingEvents = events.filter(e => e.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);
  const recentAchievements = achievements.sort((a, b) => parseInt(b.year) - parseInt(a.year)).slice(0, 3);
  const featuredMembers = members.slice(0, 4);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12 md:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] h-auto py-10 md:py-0 flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)', 
               backgroundSize: '50px 50px' 
             }}>
        </div>
        
        <div className="z-10 w-full max-w-3xl">
          <TerminalCard title="crypton@root:~" glowing={true} className="shadow-2xl">
            <div className="text-lg md:text-xl space-y-4">
              <div className="flex flex-col md:flex-row gap-2">
                <span className="text-cyber-neon font-bold">crypton@root:~$</span>
                <span className="text-white">init protocol --secure</span>
              </div>
              <div className="text-gray-400 text-sm italic">
                {'>'} Loading modules...<br/>
                {'>'} Establishing secure connection...<br/>
                {'>'} Access granted.
              </div>
              <div className="pt-4 text-3xl md:text-5xl font-bold text-white tracking-wide">
                <span className="text-cyber-neon">{'>'}</span> {text}
                <span className="animate-cursor-blink inline-block w-3 h-6 md:h-12 bg-cyber-neon ml-2 align-middle"></span>
              </div>
              <p className="pt-6 text-gray-300 max-w-xl text-sm md:text-base">
                The premier cybersecurity student organization. We break things to learn how to fix them. CTFs, Workshops, and Ethical Hacking.
              </p>
              
              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/events" className="bg-cyber-neon text-black font-bold px-6 py-3 rounded hover:bg-white hover:shadow-[0_0_20px_#39FF14] transition-all flex items-center justify-center gap-2">
                  <Terminal size={18} />
                  Start Hacking
                </Link>
                <Link to="/members" className="border border-cyber-neon text-cyber-neon px-6 py-3 rounded hover:bg-cyber-neon/10 transition-all text-center">
                  Meet the Agents
                </Link>
              </div>
            </div>
          </TerminalCard>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="p-6 border border-cyber-dim rounded bg-cyber-dark hover:border-cyber-neon transition-colors group">
          <Target className="w-12 h-12 text-cyber-neon mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-2">Capture The Flag</h3>
          <p className="text-gray-400 text-sm">
            Compete in jeopardy-style and attack-defense CTFs. Test your skills in web, crypto, pwn, and reverse engineering.
          </p>
        </div>
        <div className="p-6 border border-cyber-dim rounded bg-cyber-dark hover:border-cyber-neon transition-colors group">
          <Users className="w-12 h-12 text-cyber-neon mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-2">Community & Networking</h3>
          <p className="text-gray-400 text-sm">
            Connect with like-minded security enthusiasts and industry professionals. Your network is your net worth.
          </p>
        </div>
        <div className="p-6 border border-cyber-dim rounded bg-cyber-dark hover:border-cyber-neon transition-colors group">
          <Award className="w-12 h-12 text-cyber-neon mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-2">Skill Building</h3>
          <p className="text-gray-400 text-sm">
            Weekly workshops ranging from Linux basics to advanced binary exploitation. Zero to hero.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="relative bg-cyber-dark border border-cyber-dim rounded-lg p-5 md:p-6 group hover:border-cyber-neon transition-all hover:shadow-[0_0_15px_rgba(57,255,20,0.15)] overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border
                    ${event.type === 'ctf' ? 'border-red-500 text-red-400' :
                      event.type === 'workshop' ? 'border-blue-500 text-blue-400' :
                      'border-purple-500 text-purple-400'
                    }
                  `}>
                    {event.type}
                  </span>
                  <span className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyber-neon transition-colors pr-12">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {event.description}
                </p>
                <div className="text-sm text-gray-500">
                  {event.location}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mb-8">No upcoming events scheduled.</p>
        )}
        <Link to="/events" className="inline-flex items-center text-cyber-neon hover:text-white transition-colors text-lg border-b border-cyber-neon pb-1">
          View More Events <ChevronRight className="ml-1" />
        </Link>
      </section>

      {/* Achievements */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="relative bg-cyber-dark border border-cyber-dim rounded-lg p-5 md:p-6 group hover:border-cyber-neon transition-all hover:shadow-[0_0_15px_rgba(57,255,20,0.15)] overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                  {achievement.category}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyber-neon transition-colors pr-12">
                {achievement.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {achievement.description}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-cyber-dim/50">
                <span className="text-xs md:text-sm font-mono text-white bg-cyber-dim/30 px-2 py-1 rounded border border-cyber-dim">
                  {achievement.year}
                </span>
                {achievement.rank && (
                  <span className="flex items-center gap-1 text-cyber-neon font-bold text-xs md:text-sm">
                    {achievement.rank}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <Link to="/achievements" className="inline-flex items-center text-cyber-neon hover:text-white transition-colors text-lg border-b border-cyber-neon pb-1">
          View More Achievements <ChevronRight className="ml-1" />
        </Link>
      </section>

      {/* Members */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {featuredMembers.map((member) => (
            <div key={member.id} className="relative group bg-cyber-dark border border-cyber-dim rounded-lg p-5 md:p-6 overflow-hidden hover:border-cyber-neon transition-all duration-300">
              <div className="p-5 md:p-6 relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-cyber-dim group-hover:border-cyber-neon mb-4">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">{member.name}</h3>
                <div className="text-cyber-neon text-xs md:text-sm font-mono mt-1 mb-3">{`[${member.role}]`}</div>
                <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/members" className="inline-flex items-center text-cyber-neon hover:text-white transition-colors text-lg border-b border-cyber-neon pb-1">
          View More Members <ChevronRight className="ml-1" />
        </Link>
      </section>

      {/* Featured CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
         <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 neon-text-shadow">
           Are you ready to join the simulation?
         </h2>
         <Link to="/events" className="inline-flex items-center text-cyber-neon hover:text-white transition-colors text-lg border-b border-cyber-neon pb-1">
           Check Upcoming Deployments <ChevronRight className="ml-1" />
         </Link>
      </section>
    </div>
  );
};

export default Home;
