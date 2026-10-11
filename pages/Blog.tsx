import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import TerminalCard from '../components/TerminalCard';
import Modal from '../components/Modal';
import { Hash, ChevronRight, Plus, Edit, Trash2, Check, X, Search, FileText } from 'lucide-react';
import { BlogPost, Writeup } from '../types';

const Blog: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, writeups } = useData();
  const { isAuthenticated } = useAuth();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [tagsInput, setTagsInput] = useState('');
  
  // New State for Writeup Integration
  const [entryType, setEntryType] = useState<'intel' | 'writeup'>('intel');
  const [selectedWriteupIds, setSelectedWriteupIds] = useState<string[]>([]);
  const [writeupSearch, setWriteupSearch] = useState('');

  const handleOpenModal = (e?: React.MouseEvent, post?: BlogPost) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (post) {
      setEditingPost(post);
      setFormData(post);
      setTagsInput(post.tags.join(', '));
      setEntryType(post.type || 'intel');
      setSelectedWriteupIds(post.writeupIds || []);
    } else {
      setEditingPost(null);
      setFormData({
        date: new Date().toISOString().split('T')[0]
      });
      setTagsInput('');
      setEntryType('intel');
      setSelectedWriteupIds([]);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    const postData: Partial<BlogPost> = {
        ...formData,
        tags: tagsArray,
        type: entryType,
        author: formData.author,
        excerpt: formData.excerpt,
        writeupIds: entryType === 'writeup' ? selectedWriteupIds : undefined,
        // If writeup type, content might be empty or used for description
        content: entryType === 'writeup' ? (formData.content || '') : formData.content 
    };

    if (editingPost) {
      updateBlogPost({ ...editingPost, ...postData } as BlogPost);
    } else {
      addBlogPost({ 
        ...postData, 
        id: Date.now().toString(),
      } as BlogPost);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Use setTimeout to ensure window.confirm doesn't block the event loop prematurely
    setTimeout(() => {
        if (window.confirm('Are you sure you want to delete this intel report?')) {
            console.log("Confirmed delete for blog:", id);
            deleteBlogPost(id);
        }
    }, 10);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="text-cyber-neon">./</span>intel
          </h1>
          <p className="text-gray-400">Tutorials, Clues, Mission Briefings, and Club Updates.</p>
        </div>
        
        {isAuthenticated && (
            <button 
                type="button"
                onClick={(e) => handleOpenModal(e)}
                className="bg-cyber-neon text-black px-4 py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
                <Plus size={18} /> New Entry
            </button>
        )}
      </div>

      <div className="space-y-8">
        {blogPosts.length === 0 && (
            <div className="text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded">
                No intel found. Database empty.
            </div>
        )}

        {[...blogPosts]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((post) => (
          <TerminalCard 
            key={post.id} 
            title={`${post.date}_log.txt`} 
            className="group"
            actions={isAuthenticated && (
                <div className="flex gap-2">
                    <button 
                        type="button"
                        onClick={(e) => handleOpenModal(e, post)} 
                        className="p-1 text-blue-400 hover:text-white transition-colors"
                    >
                        <Edit size={14} className="pointer-events-none" />
                    </button>
                    <button 
                        type="button"
                        onClick={(e) => handleDelete(e, post.id)} 
                        className="p-1 text-red-400 hover:text-white transition-colors"
                    >
                        <Trash2 size={14} className="pointer-events-none" />
                    </button>
                </div>
            )}
          >
            <article>
              <Link to={`/blog/${post.id}`}>
                <h2 className="text-2xl font-bold text-white group-hover:text-cyber-neon cursor-pointer transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              
              <div className="flex gap-4 text-xs text-gray-500 mb-4 font-mono">
                 <span>AUTHOR: {post.author?.toUpperCase()}</span>
                 <span>DATE: {post.date}</span>
              </div>

              <div className="flex gap-2 mb-4">
                {post.tags.map(tag => (
                    <span key={tag} className="flex items-center text-xs bg-cyber-dim/30 text-cyber-neon px-2 py-1 rounded">
                        <Hash size={10} className="mr-1"/> {tag}
                    </span>
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <Link 
                to={`/blog/${post.id}`}
                className="inline-flex items-center text-cyber-neon text-sm hover:underline hover:text-white transition-colors"
              >
                Read full entry <ChevronRight size={14} className="ml-1" />
              </Link>
            </article>
          </TerminalCard>
        ))}
      </div>

      {/* Admin Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingPost ? "EDIT_ENTRY.EXE" : "NEW_ENTRY.EXE"}
      >
          <div className="flex gap-4 mb-6 border-b border-gray-800 pb-4">
              <button 
                  type="button"
                  onClick={() => {
                      setEntryType('intel');
                      setFormData(prev => ({ ...prev, author: '' }));
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-sm transition-colors ${entryType === 'intel' ? 'bg-cyber-neon text-black font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                  <FileText size={16} /> STANDARD_INTEL
              </button>
              <button 
                  type="button"
                  onClick={() => {
                      setEntryType('writeup');
                      setFormData(prev => ({ ...prev, author: 'Crypton Intel' }));
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-sm transition-colors ${entryType === 'writeup' ? 'bg-cyber-neon text-black font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                  <Hash size={16} /> WRITEUP_MISSION
              </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
              <div>
                  <label className="text-xs font-mono text-gray-500">TITLE</label>
                  <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none text-sm font-mono" 
                    placeholder="OPERATION_NAME / INTEL_TITLE"
                    value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-xs font-mono text-gray-500">AUTHOR</label>
                      <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none text-sm font-mono" 
                        placeholder="AGENT_CODENAME"
                        value={formData.author || ''} onChange={e => setFormData({...formData, author: e.target.value})} />
                  </div>
                  <div>
                      <label className="text-xs font-mono text-gray-500">DATE</label>
                      <input type="date" required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none text-sm font-mono" 
                        value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">TAGS (Comma separated)</label>
                  <input className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none text-sm font-mono" 
                    placeholder="CTF, CRYPTOGRAPHY, OPSEC"
                    value={tagsInput} onChange={e => setTagsInput(e.target.value)} />
              </div>
               <div>
                   <label className="text-xs font-mono text-gray-500">EXCERPT (Short summary)</label>
                   <textarea required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none h-20 text-sm font-mono" 
                     placeholder="BRIEF_MISSION_SUMMARY / INTEL_ABSTRACT..."
                     value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
               </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">
                      {entryType === 'writeup' ? 'EVENT DESCRIPTION (Markdown)' : 'CONTENT (Markdown Supported)'}
                  </label>
                  <textarea required={entryType === 'intel'} className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none h-64 font-mono text-sm" 
                    value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} 
                    placeholder={entryType === 'writeup' ? "MISSION_DETAILS_AND_LOGS..." : "CLASSIFIED_INTEL_REPORT..."} />
              </div>

              {entryType === 'writeup' && (
                  <div className="border-t border-gray-800 pt-4 mt-4">
                      <label className="text-xs font-mono text-cyber-neon mb-2 block">LINKED WRITEUPS</label>
                      
                      <div className="relative mb-4">
                          <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                          <input 
                              type="text" 
                              placeholder="Search writeups..." 
                              className="w-full bg-black border border-gray-800 p-2 pl-9 text-white rounded focus:border-cyber-neon outline-none text-sm"
                              value={writeupSearch}
                              onChange={(e) => setWriteupSearch(e.target.value)}
                          />
                      </div>

                      <div className="max-h-48 overflow-y-auto space-y-2 mb-4 pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
                         {writeups
                            .filter(w => w.challengeName.toLowerCase().includes(writeupSearch.toLowerCase()) || w.category.toLowerCase().includes(writeupSearch.toLowerCase()))
                            .map(writeup => {
                                const isSelected = selectedWriteupIds.includes(writeup.id);
                                return (
                                    <div 
                                        key={writeup.id}
                                        onClick={() => {
                                            if (isSelected) {
                                                setSelectedWriteupIds(prev => prev.filter(id => id !== writeup.id));
                                            } else {
                                                setSelectedWriteupIds(prev => [...prev, writeup.id]);
                                            }
                                        }}
                                        className={`p-2 rounded border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-cyber-neon/10 border-cyber-neon' : 'bg-gray-900/50 border-gray-800 hover:border-gray-600'}`}
                                    >
                                        <div>
                                            <div className="text-sm font-bold text-gray-200">{writeup.challengeName}</div>
                                            <div className="text-xs text-gray-500 flex gap-2">
                                                <span>{writeup.category}</span>
                                                <span>•</span>
                                                <span>{writeup.author}</span>
                                            </div>
                                        </div>
                                        {isSelected && <Check size={16} className="text-cyber-neon" />}
                                    </div>
                                );
                            })
                         }
                         {writeups.length === 0 && <div className="text-gray-500 text-sm text-center">No writeups found. Create one first!</div>}
                      </div>
                      
                      <div className="text-xs text-gray-400">
                          {selectedWriteupIds.length} writeups selected
                      </div>
                  </div>
              )}
              
              <button type="submit" className="w-full bg-cyber-neon text-black font-bold py-3 rounded mt-4 hover:bg-white transition-colors">
                  SAVE_INTEL
              </button>
          </form>
      </Modal>
    </div>
  );
};

export default Blog;