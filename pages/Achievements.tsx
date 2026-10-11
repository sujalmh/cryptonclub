import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Trophy, Medal, Star, ShieldCheck, Plus, Edit, Trash2, Users, X } from 'lucide-react';
import Modal from '../components/Modal';
import { Achievement } from '../types';

const Achievements: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useData();
  const { isAuthenticated } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState<Partial<Achievement>>({});
  const [teamInput, setTeamInput] = useState('');

  const handleOpenModal = (e?: React.MouseEvent, item?: Achievement) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (item) {
        setEditingItem(item);
        setFormData(item);
    } else {
        setEditingItem(null);
        setFormData({ category: 'competition', year: new Date().getFullYear().toString(), team: [] });
    }
    setIsModalOpen(true);
  };

  const handleOpenDetailModal = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedAchievement(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
        updateAchievement({ ...editingItem, ...formData } as Achievement);
    } else {
        addAchievement({ ...formData, id: Date.now().toString() } as Achievement);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        if(window.confirm("Revoke this achievement?")) {
            console.log("Confirmed delete for achievement:", id);
            deleteAchievement(id);
        }
      }, 10);
  }

  const addTeamMember = () => {
    if (teamInput.trim()) {
      const currentTeam = formData.team || [];
      setFormData({ ...formData, team: [...currentTeam, teamInput.trim()] });
      setTeamInput('');
    }
  };

  const removeTeamMember = (index: number) => {
    const currentTeam = formData.team || [];
    setFormData({ ...formData, team: currentTeam.filter((_, i) => i !== index) });
  };

  // ESC key handler for detail modal
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDetailModalOpen) {
        handleCloseDetailModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isDetailModalOpen]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                <span className="text-cyber-neon">./</span>trophies
            </h1>
            <p className="text-gray-400 text-sm md:text-base">Hall of fame and club recognitions.</p>
        </div>
        {isAuthenticated && (
            <button 
                type="button"
                onClick={(e) => handleOpenModal(e)}
                className="bg-cyber-neon text-black px-4 py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors text-sm"
            >
                <Plus size={18} /> Add Trophy
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {achievements.map((achievement) => (
            <div 
                key={achievement.id} 
                className="relative bg-cyber-dark border border-cyber-dim rounded-lg p-5 md:p-6 group hover:border-cyber-neon transition-all hover:shadow-[0_0_15px_rgba(57,255,20,0.15)] overflow-hidden cursor-pointer"
                onClick={() => handleOpenDetailModal(achievement)}
            >
                
                {isAuthenticated && (
                    <div className="absolute top-0 right-0 p-2 z-30 flex gap-2 bg-black/60 rounded-bl-lg backdrop-blur-sm">
                        <button 
                            type="button"
                            onClick={(e) => handleOpenModal(e, achievement)} 
                            className="p-1.5 text-blue-400 hover:text-white transition-colors"
                        >
                            <Edit size={14} className="pointer-events-none" />
                        </button>
                        <button 
                            type="button"
                            onClick={(e) => handleDelete(e, achievement.id)} 
                            className="p-1.5 text-red-400 hover:text-white transition-colors"
                        >
                            <Trash2 size={14} className="pointer-events-none" />
                        </button>
                    </div>
                )}

                {/* Always show Trophy icon, no image on card */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <Trophy size={64} className="text-cyber-neon" />
                </div>

                <div className="flex items-center gap-2 mb-4 relative z-10">
                    {achievement.category === 'competition' ? (
                        <Trophy className="text-yellow-500" size={20} />
                    ) : achievement.category === 'certification' ? (
                        <ShieldCheck className="text-blue-500" size={20} />
                    ) : (
                        <Star className="text-purple-500" size={20} />
                    )}
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                        {achievement.category}
                    </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyber-neon transition-colors relative z-10 pr-12">
                    {achievement.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed relative z-10 line-clamp-2">
                    {achievement.description}
                </p>

                {achievement.team && achievement.team.length > 0 && (
                    <div className="mb-4 relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <Users size={14} className="text-cyber-neon" />
                            <span className="text-xs font-mono text-gray-500 uppercase">Team</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {achievement.team.slice(0, 3).map((member, i) => (
                                <span key={i} className="text-xs bg-cyber-dim/30 text-gray-300 px-2 py-1 rounded border border-cyber-dim">
                                    {member}
                                </span>
                            ))}
                            {achievement.team.length > 3 && (
                                <span className="text-xs bg-cyber-dim/30 text-cyber-neon px-2 py-1 rounded border border-cyber-dim">
                                    +{achievement.team.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-cyber-dim/50 relative z-10">
                    <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm font-mono text-white bg-cyber-dim/30 px-2 py-1 rounded border border-cyber-dim">
                            {achievement.year}
                        </span>
                    </div>
                    {achievement.rank && (
                        <div className="flex items-center gap-1 text-cyber-neon font-bold text-xs md:text-sm">
                            <Medal size={14} />
                            {achievement.rank}
                        </div>
                    )}
                </div>
            </div>
        ))}
      </div>

      {/* Admin Modal */}
       <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? "EDIT_RECORD.EXE" : "NEW_TROPHY.EXE"}
      >
          <form onSubmit={handleSave} className="space-y-4">
              <div>
                  <label className="text-xs font-mono text-gray-500">TITLE</label>
                  <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-xs font-mono text-gray-500">YEAR</label>
                      <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                        value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} />
                  </div>
                  <div>
                      <label className="text-xs font-mono text-gray-500">CATEGORY</label>
                      <select className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none"
                          value={formData.category || 'competition'} onChange={e => setFormData({...formData, category: e.target.value as any})}>
                          <option value="competition">Competition</option>
                          <option value="certification">Certification</option>
                          <option value="recognition">Recognition</option>
                      </select>
                  </div>
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">IMAGE URL</label>
                  <input className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    placeholder="/achievements/trophy.png"
                    value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">RANK (Optional)</label>
                  <input className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    placeholder="e.g. 1st Place"
                    value={formData.rank || ''} onChange={e => setFormData({...formData, rank: e.target.value})} />
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">DESCRIPTION</label>
                  <textarea required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none h-24" 
                    value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              {/* Team Members Section */}
              <div>
                  <label className="text-xs font-mono text-gray-500 mb-2 block">TEAM MEMBERS (Optional)</label>
                  <div className="flex gap-2 mb-2">
                      <input 
                          className="flex-1 bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                          placeholder="Enter team member name"
                          value={teamInput}
                          onChange={e => setTeamInput(e.target.value)}
                          onKeyPress={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTeamMember();
                            }
                          }}
                      />
                      <button 
                          type="button"
                          onClick={addTeamMember}
                          className="bg-cyber-neon/20 border border-cyber-neon text-cyber-neon px-4 py-2 rounded hover:bg-cyber-neon/30 transition-colors"
                      >
                          <Plus size={18} />
                      </button>
                  </div>
                  {formData.team && formData.team.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                          {formData.team.map((member, index) => (
                              <div key={index} className="bg-cyber-dim/30 text-white px-3 py-1 rounded border border-cyber-dim flex items-center gap-2">
                                  <span className="text-sm">{member}</span>
                                  <button
                                      type="button"
                                      onClick={() => removeTeamMember(index)}
                                      className="text-red-400 hover:text-red-300 transition-colors"
                                  >
                                      <X size={14} />
                                  </button>
                              </div>
                          ))}
                      </div>
                  )}
              </div>
              
              <button type="submit" className="w-full bg-cyber-neon text-black font-bold py-3 rounded mt-4 hover:bg-white transition-colors">
                  SAVE_RECORD
              </button>
          </form>
      </Modal>

      {/* Detail Modal - Hacker Style */}
      {isDetailModalOpen && selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={handleCloseDetailModal}>
          <div 
            className="bg-black border-2 border-cyber-neon rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(57,255,20,0.3)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header - Terminal Style */}
            <div className="bg-cyber-neon/10 border-b-2 border-cyber-neon p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-cyber-neon font-mono text-sm ml-2">achievement_viewer.exe</span>
              </div>
              <button 
                onClick={handleCloseDetailModal}
                className="text-gray-400 hover:text-cyber-neon transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 font-mono">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                {selectedAchievement.category === 'competition' ? (
                  <Trophy className="text-yellow-500" size={24} />
                ) : selectedAchievement.category === 'certification' ? (
                  <ShieldCheck className="text-blue-500" size={24} />
                ) : (
                  <Star className="text-purple-500" size={24} />
                )}
                <span className="text-xs uppercase tracking-widest text-gray-500 bg-cyber-dim/30 px-3 py-1 rounded border border-cyber-dim">
                  {selectedAchievement.category}
                </span>
                <span className="text-xs text-white bg-cyber-dim/30 px-3 py-1 rounded border border-cyber-dim ml-auto">
                  {selectedAchievement.year}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-cyber-neon mb-2">
                <span className="text-gray-500">{'>'}</span> {selectedAchievement.title}
              </h2>

              {/* Rank */}
              {selectedAchievement.rank && (
                <div className="flex items-center gap-2 mb-6">
                  <Medal className="text-cyber-neon" size={20} />
                  <span className="text-cyber-neon font-bold text-lg">{selectedAchievement.rank}</span>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-cyber-dim my-6"></div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm uppercase text-gray-500 mb-2 tracking-wider">
                  <span className="text-cyber-neon">$</span> Description
                </h3>
                <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-cyber-dim">
                  {selectedAchievement.description}
                </p>
              </div>

              {/* Team Members */}
              {selectedAchievement.team && selectedAchievement.team.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm uppercase text-gray-500 mb-3 tracking-wider flex items-center gap-2">
                    <span className="text-cyber-neon">$</span> Team Members
                    <Users size={16} className="text-cyber-neon" />
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                    {selectedAchievement.team.map((member, i) => (
                      <div key={i} className="flex items-center gap-2 bg-cyber-dim/20 border border-cyber-dim rounded p-2">
                        <div className="w-2 h-2 bg-cyber-neon rounded-full animate-pulse"></div>
                        <span className="text-white">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Preview */}
              {selectedAchievement.imageUrl && (
                <div className="mb-6">
                  <h3 className="text-sm uppercase text-gray-500 mb-3 tracking-wider">
                    <span className="text-cyber-neon">$</span> Badge
                  </h3>
                  <div className="border-2 border-cyber-dim rounded-lg p-4 bg-cyber-dim/10">
                    <img 
                      src={selectedAchievement.imageUrl} 
                      alt={selectedAchievement.title}
                      className="w-full max-w-xs mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Footer Info */}
              <div className="mt-6 pt-4 border-t border-cyber-dim">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>ID: {selectedAchievement.id}</span>
                  <span className="text-cyber-neon">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;