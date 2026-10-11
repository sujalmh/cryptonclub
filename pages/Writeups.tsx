import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Terminal, Plus, User, Tag, Calendar, ChevronRight, Edit, Trash2, Save } from 'lucide-react';
import Modal from '../components/Modal';
import { Writeup } from '../types';
import NotFound from './NotFound';

const Writeups: React.FC = () => {
    const { writeups, addWriteup, updateWriteup, deleteWriteup } = useData();
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <NotFound />;
    }
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingWriteup, setEditingWriteup] = useState<Writeup | null>(null);
    const [formData, setFormData] = useState<Partial<Writeup>>({});

    // Sort by date, newest first
    const sortedWriteups = [...writeups].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const handleOpenModal = (e?: React.MouseEvent, writeup?: Writeup) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (writeup) {
            setEditingWriteup(writeup);
            setFormData(writeup);
        } else {
            setEditingWriteup(null);
            setFormData({
                date: new Date().toISOString()
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingWriteup) {
            updateWriteup({ ...editingWriteup, ...formData } as Writeup);
        } else {
            addWriteup({ 
                ...formData, 
                id: Date.now().toString(),
                date: new Date().toISOString() 
            } as Writeup);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => {
            if(window.confirm("Delete this mission report?")) {
                deleteWriteup(id);
            }
        }, 10);
    };



    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            
            {/* Header */}
            <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        <span className="text-cyber-neon">./</span>writeups
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">Detailed mission reports, challenge solutions, and security analysis.</p>
                </div>
                
                {isAuthenticated && (
                    <button 
                        type="button"
                        onClick={(e) => handleOpenModal(e)}
                        className="bg-cyber-neon text-black px-4 py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors text-sm shadow-[0_0_10px_rgba(57,255,20,0.2)]"
                    >
                        <Plus size={18} /> New Report
                    </button>
                )}
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedWriteups.length > 0 ? (
                    sortedWriteups.map((writeup) => (
                        <Link 
                            key={writeup.id} 
                            to={`/writeups/${writeup.id}`}
                            className="group relative bg-cyber-dark border border-cyber-dim rounded-lg overflow-hidden hover:border-cyber-neon transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] flex flex-col h-full"
                        >
                             {/* Admin Controls */}
                             {isAuthenticated && (
                                <div className="absolute top-0 right-0 p-2 z-30 flex gap-2 bg-black/60 rounded-bl-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        type="button"
                                        onClick={(e) => handleOpenModal(e, writeup)} 
                                        className="p-1.5 text-blue-400 hover:text-white transition-colors"
                                    >
                                        <Edit size={14} className="pointer-events-none" />
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={(e) => handleDelete(e, writeup.id)} 
                                        className="p-1.5 text-red-400 hover:text-white transition-colors"
                                    >
                                        <Trash2 size={14} className="pointer-events-none" />
                                    </button>
                                </div>
                            )}

                            {/* Header Decoration */}
                            <div className="h-1 w-full bg-gradient-to-r from-cyber-neon to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="p-6 flex flex-col flex-1 relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="flex items-center gap-2 text-xs font-mono text-cyber-neon px-2 py-1 bg-cyber-neon/10 rounded border border-cyber-neon/20">
                                        <Tag size={12} />
                                        {writeup.category}
                                    </span>
                                    <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(writeup.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-neon transition-colors line-clamp-2">
                                    {writeup.challengeName}
                                </h3>
                                
                                <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-400 border-t border-cyber-dim group-hover:border-cyber-dim/50 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-cyber-dim flex items-center justify-center text-xs text-white">
                                            <User size={12} />
                                        </div>
                                        <span className="font-mono text-xs">{writeup.author}</span>
                                    </div>
                                    <ChevronRight size={16} className="text-cyber-dim group-hover:text-cyber-neon transform group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border border-dashed border-cyber-dim rounded-lg bg-cyber-dark/30">
                        <Terminal size={48} className="mx-auto text-gray-600 mb-4" />
                        <h3 className="text-xl text-gray-400 mb-2">No Reports Found</h3>
                        <p className="text-gray-600">Be the first to document a successful mission.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={editingWriteup ? "EDIT_REPORT.EXE" : "NEW_REPORT.EXE"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-mono text-gray-500">CHALLENGE NAME</label>
                            <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                                value={formData.challengeName || ''} onChange={e => setFormData({...formData, challengeName: e.target.value})} />
                        </div>
                         <div>
                            <label className="text-xs font-mono text-gray-500">CATEGORY</label>
                            <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                                value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                        </div>
                     </div>
                     <div>
                        <label className="text-xs font-mono text-gray-500">AUTHOR</label>
                        <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                            value={formData.author || ''} onChange={e => setFormData({...formData, author: e.target.value})} />
                    </div>
                    <div>
                         <div className="flex justify-between items-center mb-1">
                             <label className="text-xs font-mono text-gray-500">CONTENT (MARKDOWN)</label>
                             <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noreferrer" className="text-xs text-cyber-neon hover:underline font-mono">MD Help</a>
                        </div>
                        <textarea required className="w-full bg-black border border-gray-700 p-2 text-gray-300 font-mono text-sm rounded focus:border-cyber-neon outline-none min-h-[300px] resize-y" 
                            value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
                    </div>

                    <button type="submit" className="w-full bg-cyber-neon text-black font-bold py-3 rounded mt-4 hover:bg-white transition-colors flex items-center justify-center gap-2">
                         <Save size={18} /> SAVE RECORD
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Writeups;
