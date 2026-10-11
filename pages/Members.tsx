import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Github, Linkedin, Globe, Twitter, Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import { Member } from '../types';

const Members: React.FC = () => {
  const { members, addMember, updateMember, deleteMember } = useData();
  const { isAuthenticated } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<Partial<Member>>({ socials: {} });

  const handleOpenModal = (e?: React.MouseEvent, member?: Member) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (member) {
        setEditingMember(member);
        setFormData(member);
    } else {
        setEditingMember(null);
        setFormData({ socials: {} });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
        updateMember({ ...editingMember, ...formData } as Member);
    } else {
        addMember({ ...formData, id: Date.now().toString() } as Member);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      e.stopPropagation();
      // Use setTimeout to ensure window.confirm doesn't block the event loop prematurely
      setTimeout(() => {
        if(window.confirm("Disavow this agent?")) {
            console.log("Confirmed delete for member:", id);
            deleteMember(id);
        }
      }, 10);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                <span className="text-cyber-neon">./</span>agents
            </h1>
            <p className="text-gray-400 text-sm md:text-base">The team behind the operations.</p>
        </div>
        {isAuthenticated && (
            <button 
                type="button"
                onClick={(e) => handleOpenModal(e)}
                className="bg-cyber-neon text-black px-4 py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors text-sm"
            >
                <Plus size={18} /> Recruit Agent
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {members.map((member) => (
            <div key={member.id} className="relative group bg-cyber-dark border border-cyber-dim rounded-lg overflow-hidden hover:border-cyber-neon transition-all duration-300">
                {/* Header with Admin Controls */}
                {isAuthenticated && (
                    <div className="absolute top-0 right-0 p-2 z-30 flex gap-2 bg-black/60 rounded-bl-lg backdrop-blur-sm">
                        <button 
                            type="button"
                            onClick={(e) => handleOpenModal(e, member)} 
                            className="p-1.5 text-blue-400 hover:text-white transition-colors"
                        >
                            <Edit size={14} className="pointer-events-none" />
                        </button>
                        <button 
                            type="button"
                            onClick={(e) => handleDelete(e, member.id)} 
                            className="p-1.5 text-red-400 hover:text-white transition-colors"
                        >
                            <Trash2 size={14} className="pointer-events-none" />
                        </button>
                    </div>
                )}
                
                <div className="p-5 md:p-6 relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-cyber-dim group-hover:border-cyber-neon mb-4">
                        <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold text-white">{member.name}</h3>
                    <div className="text-cyber-neon text-xs md:text-sm font-mono mt-1 mb-3">{`[${member.role}]`}</div>
                    
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                        {member.bio}
                    </p>

                    <div className="mt-auto flex gap-4">
                        {member.socials.github && (
                            <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                <Github size={18} />
                            </a>
                        )}
                        {member.socials.linkedin && (
                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </a>
                        )}
                        {member.socials.twitter && (
                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                <Twitter size={18} />
                            </a>
                        )}
                        {member.socials.website && (
                            <a href={member.socials.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                <Globe size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        ))}
      </div>

       {/* Admin Modal */}
       <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingMember ? "UPDATE_AGENT.EXE" : "NEW_RECRUIT.EXE"}
      >
          <form onSubmit={handleSave} className="space-y-4">
              <div>
                  <label className="text-xs font-mono text-gray-500">NAME</label>
                  <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">ROLE</label>
                  <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">PHOTO URL</label>
                  <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">BIO</label>
                  <textarea required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none h-24" 
                    value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} />
              </div>
              
              <div className="border-t border-gray-800 pt-4 mt-4">
                  <h3 className="text-sm font-bold text-cyber-neon mb-2">Social Links</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-mono text-gray-500">GITHUB</label>
                        <input className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                            value={formData.socials?.github || ''} 
                            onChange={e => setFormData({...formData, socials: {...formData.socials, github: e.target.value}})} />
                    </div>
                    <div>
                        <label className="text-xs font-mono text-gray-500">LINKEDIN</label>
                        <input className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                            value={formData.socials?.linkedin || ''} 
                            onChange={e => setFormData({...formData, socials: {...formData.socials, linkedin: e.target.value}})} />
                    </div>
                    <div>
                        <label className="text-xs font-mono text-gray-500">TWITTER</label>
                        <input className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                            value={formData.socials?.twitter || ''} 
                            onChange={e => setFormData({...formData, socials: {...formData.socials, twitter: e.target.value}})} />
                    </div>
                    <div>
                        <label className="text-xs font-mono text-gray-500">WEBSITE</label>
                        <input className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                            value={formData.socials?.website || ''} 
                            onChange={e => setFormData({...formData, socials: {...formData.socials, website: e.target.value}})} />
                    </div>
                  </div>
              </div>

              <button type="submit" className="w-full bg-cyber-neon text-black font-bold py-3 rounded mt-4 hover:bg-white transition-colors">
                  SAVE_RECORD
              </button>
          </form>
      </Modal>
    </div>
  );
};

export default Members;