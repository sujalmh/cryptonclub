import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import TerminalCard from '../components/TerminalCard';
import Modal from '../components/Modal';
import { Calendar, MapPin, ExternalLink, Activity, Plus, Edit, Trash2 } from 'lucide-react';
import { Event } from '../types';

const Events: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({});

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.status === filter;
  });

  const handleOpenModal = (e?: React.MouseEvent, event?: Event) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (event) {
      setEditingEvent(event);
      setFormData(event);
    } else {
      setEditingEvent(null);
      setFormData({
        type: 'workshop',
        status: 'upcoming',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent({ ...editingEvent, ...formData } as Event);
    } else {
      addEvent({ ...formData, id: Date.now().toString() } as Event);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Use setTimeout to ensure window.confirm doesn't block the event loop prematurely
    setTimeout(() => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            console.log("Confirmed delete for event:", id);
            deleteEvent(id);
        }
    }, 10);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-cyber-neon">./</span>events
          </h1>
          <p className="text-gray-400 text-sm md:text-base">Workshops, CTFs, and meetups.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {isAuthenticated && (
                <button 
                    type="button"
                    onClick={(e) => handleOpenModal(e)}
                    className="bg-cyber-neon text-black px-4 py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors text-sm"
                >
                    <Plus size={18} /> New Event
                </button>
            )}

            {/* Filter Tabs */}
            <div className="flex bg-cyber-dark border border-cyber-dim rounded-lg p-1">
            {(['upcoming', 'past', 'all'] as const).map((type) => (
                <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                className={`flex-1 sm:flex-none px-3 md:px-4 py-1.5 md:py-2 rounded text-xs md:text-sm font-medium transition-colors capitalize ${
                    filter === type
                    ? 'bg-cyber-neon text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
                >
                {type}
                </button>
            ))}
            </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredEvents.length === 0 && (
            <div className="text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded">
                No events found in this category. System standby...
            </div>
        )}
        
        {filteredEvents.map((event) => (
          <TerminalCard 
            key={event.id} 
            title={`event_${event.id}.sh`} 
            className="group"
            actions={isAuthenticated && (
                <div className="flex gap-2">
                    <button 
                        type="button"
                        onClick={(e) => handleOpenModal(e, event)} 
                        className="p-1 text-blue-400 hover:text-white transition-colors"
                        title="Edit"
                    >
                        <Edit size={14} className="pointer-events-none" />
                    </button>
                    <button 
                        type="button"
                        onClick={(e) => handleDelete(e, event.id)} 
                        className="p-1 text-red-400 hover:text-white transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={14} className="pointer-events-none" />
                    </button>
                </div>
            )}
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              
              {/* Date Block */}
              <div className="flex-shrink-0 flex flex-row md:flex-col items-center justify-between md:justify-center px-4 py-3 md:p-0 border border-cyber-dim bg-black/50 w-full md:w-32 h-auto md:h-32 rounded">
                <div className="flex items-baseline gap-2 md:flex-col md:gap-0 md:items-center">
                    <span className="text-2xl md:text-3xl font-bold text-cyber-neon">
                    {new Date(event.date).getDate()}
                    </span>
                    <span className="text-sm uppercase tracking-widest text-gray-400">
                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                    </span>
                </div>
                <span className="text-sm text-gray-600 md:mt-2">
                  {new Date(event.date).getFullYear()}
                </span>
              </div>

              {/* Content */}
              <div className="flex-grow space-y-3">
                <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border
                        ${event.type === 'ctf' ? 'border-red-500 text-red-400' : 
                          event.type === 'workshop' ? 'border-blue-500 text-blue-400' : 
                          'border-purple-500 text-purple-400'
                        }
                    `}>
                        {event.type}
                    </span>
                    {event.status === 'upcoming' && (
                        <span className="flex items-center gap-1 text-[10px] text-cyber-neon animate-pulse">
                            <Activity size={10} /> LIVE
                        </span>
                    )}
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyber-neon transition-colors">
                  {event.title}
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-2xl">
                  {event.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center mt-2 md:mt-0">
                 {event.status === 'upcoming' ? (
                     <a 
                        href={event.googleFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto text-center bg-cyber-dim/20 hover:bg-cyber-neon hover:text-black border border-cyber-neon text-cyber-neon px-6 py-3 rounded transition-all flex items-center justify-center gap-2 font-bold text-sm"
                     >
                        Register <ExternalLink size={16} />
                     </a>
                 ) : (
                     <button disabled className="w-full md:w-auto px-6 py-3 border border-gray-700 text-gray-600 rounded cursor-not-allowed text-sm">
                        Archived
                     </button>
                 )}
              </div>
            </div>
          </TerminalCard>
        ))}
      </div>

      {/* Admin Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingEvent ? "EDIT_EVENT.EXE" : "NEW_EVENT.EXE"}
      >
          <form onSubmit={handleSave} className="space-y-4">
              <div>
                  <label className="text-xs font-mono text-gray-500">TITLE</label>
                  <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-mono text-gray-500">DATE</label>
                    <input type="datetime-local" required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                        value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div>
                    <label className="text-xs font-mono text-gray-500">TYPE</label>
                    <select className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none"
                        value={formData.type || 'workshop'} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                        <option value="workshop">Workshop</option>
                        <option value="ctf">CTF</option>
                        <option value="social">Social</option>
                    </select>
                </div>
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">STATUS</label>
                  <select className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none"
                      value={formData.status || 'upcoming'} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                  </select>
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">LOCATION</label>
                  <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">DESCRIPTION</label>
                  <textarea required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none h-24" 
                    value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">FORM URL</label>
                  <input className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    value={formData.googleFormUrl || ''} onChange={e => setFormData({...formData, googleFormUrl: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-cyber-neon text-black font-bold py-3 rounded mt-4 hover:bg-white transition-colors">
                  SAVE_CHANGES
              </button>
          </form>
      </Modal>
    </div>
  );
};

export default Events;