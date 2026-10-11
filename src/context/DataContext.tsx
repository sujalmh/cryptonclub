import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, Member, Achievement, BlogPost, Writeup } from '../../types';

interface DataContextType {
  events: Event[];
  members: Member[];
  achievements: Achievement[];
  blogPosts: BlogPost[];
  
  addEvent: (item: Event) => void;
  updateEvent: (item: Event) => void;
  deleteEvent: (id: string) => void;
  
  addMember: (item: Member) => void;
  updateMember: (item: Member) => void;
  deleteMember: (id: string) => void;
  
  addAchievement: (item: Achievement) => void;
  updateAchievement: (item: Achievement) => void;
  deleteAchievement: (id: string) => void;

  addBlogPost: (item: BlogPost) => void;
  updateBlogPost: (item: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  
  writeups: Writeup[];
  addWriteup: (item: Writeup) => void;
  updateWriteup: (item: Writeup) => void;
  deleteWriteup: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [writeups, setWriteups] = useState<Writeup[]>([]);

  // Initial Fetch
  useEffect(() => {
    fetch('/api/events').then(res => res.json()).then(setEvents).catch(console.error);
    fetch('/api/members').then(res => res.json()).then(setMembers).catch(console.error);
    fetch('/api/achievements').then(res => res.json()).then(setAchievements).catch(console.error);
    fetch('/api/blog').then(res => res.json()).then(setBlogPosts).catch(console.error);
    fetch('/api/writeups').then(res => res.json()).then(setWriteups).catch(console.error);
  }, []);

  // Helper to persist data to backend
  const saveData = (endpoint: string, data: any[]) => {
    fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.error(`Failed to save ${endpoint}:`, err));
  };

  // Event Actions
  const addEvent = (item: Event) => {
    const newData = [...events, item];
    setEvents(newData);
    saveData('events', newData);
  };
  const updateEvent = (item: Event) => {
    const newData = events.map(i => i.id === item.id ? item : i);
    setEvents(newData);
    saveData('events', newData);
  };
  const deleteEvent = (id: string) => {
    console.log('Deleting Event:', id);
    const newData = events.filter(i => String(i.id) !== String(id));
    setEvents(newData);
    saveData('events', newData);
  };

  // Member Actions
  const addMember = (item: Member) => {
    const newData = [...members, item];
    setMembers(newData);
    saveData('members', newData);
  };
  const updateMember = (item: Member) => {
    const newData = members.map(i => i.id === item.id ? item : i);
    setMembers(newData);
    saveData('members', newData);
  };
  const deleteMember = (id: string) => {
    console.log('Deleting Member:', id);
    const newData = members.filter(i => String(i.id) !== String(id));
    setMembers(newData);
    saveData('members', newData);
  };

  // Achievement Actions
  const addAchievement = (item: Achievement) => {
    const newData = [...achievements, item];
    setAchievements(newData);
    saveData('achievements', newData);
  };
  const updateAchievement = (item: Achievement) => {
    const newData = achievements.map(i => i.id === item.id ? item : i);
    setAchievements(newData);
    saveData('achievements', newData);
  };
  const deleteAchievement = (id: string) => {
    console.log('Deleting Achievement:', id);
    const newData = achievements.filter(i => String(i.id) !== String(id));
    setAchievements(newData);
    saveData('achievements', newData);
  };

  // Blog Actions
  const addBlogPost = (item: BlogPost) => {
    const newData = [item, ...blogPosts];
    setBlogPosts(newData);
    saveData('blog', newData);
  }; 
  const updateBlogPost = (item: BlogPost) => {
    const newData = blogPosts.map(i => i.id === item.id ? item : i);
    setBlogPosts(newData);
    saveData('blog', newData);
  };
  const deleteBlogPost = (id: string) => {
    console.log('Deleting Blog:', id);
    const newData = blogPosts.filter(i => String(i.id) !== String(id));
    setBlogPosts(newData);
    saveData('blog', newData);
  };

  // Writeup Actions (Corrected API usage)
  const addWriteup = (item: Writeup) => {
    fetch('/api/writeups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(savedItem => setWriteups([...writeups, savedItem]))
    .catch(console.error);
  };
  
  const updateWriteup = (item: Writeup) => {
    fetch(`/api/writeups/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(() => {
      setWriteups(writeups.map(w => w.id === item.id ? item : w));
    })
    .catch(console.error);
  };
  
  const deleteWriteup = (id: string) => {
    fetch(`/api/writeups/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => {
      setWriteups(writeups.filter(w => w.id !== id));
    })
    .catch(console.error);
  };

  return (
    <DataContext.Provider value={{
      events, addEvent, updateEvent, deleteEvent,
      members, addMember, updateMember, deleteMember,
      achievements, addAchievement, updateAchievement, deleteAchievement,
      blogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
      writeups, addWriteup, updateWriteup, deleteWriteup
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};