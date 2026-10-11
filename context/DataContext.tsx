import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, Member, Achievement, BlogPost, Writeup } from '../types';

interface DataContextType {
  events: Event[];
  members: Member[];
  achievements: Achievement[];
  blogPosts: BlogPost[];
  writeups: Writeup[];
  
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

  addWriteup: (item: Writeup) => void;
  updateWriteup: (item: Writeup) => void;
  deleteWriteup: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_BASE_URL = '/api';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [writeups, setWriteups] = useState<Writeup[]>([]);

  // Fetch initial data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, membersRes, achievementsRes, blogRes, writeupsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/events`),
          fetch(`${API_BASE_URL}/members`),
          fetch(`${API_BASE_URL}/achievements`),
          fetch(`${API_BASE_URL}/blog`),
          fetch(`${API_BASE_URL}/writeups`)
        ]);
        
        setEvents(await eventsRes.json());
        setMembers(await membersRes.json());
        setAchievements(await achievementsRes.json());
        setBlogPosts(await blogRes.json());
        setWriteups(await writeupsRes.json());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    
    fetchData();
  }, []);

  // Event Actions
  const addEvent = async (item: Event) => {
    try {
      const res = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        const newEvent = await res.json();
        setEvents(prev => [...prev, newEvent]);
      }
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  const updateEvent = async (item: Event) => {
    try {
      const res = await fetch(`${API_BASE_URL}/events/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        setEvents(prev => prev.map(i => i.id === item.id ? item : i));
      }
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setEvents(prev => prev.filter(i => String(i.id) !== String(id)));
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  // Member Actions
  const addMember = async (item: Member) => {
    try {
      const res = await fetch(`${API_BASE_URL}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        const newMember = await res.json();
        setMembers(prev => [...prev, newMember]);
      }
    } catch (error) {
      console.error('Failed to add member:', error);
    }
  };

  const updateMember = async (item: Member) => {
    try {
      const res = await fetch(`${API_BASE_URL}/members/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        setMembers(prev => prev.map(i => i.id === item.id ? item : i));
      }
    } catch (error) {
      console.error('Failed to update member:', error);
    }
  };

  const deleteMember = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/members/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setMembers(prev => prev.filter(i => String(i.id) !== String(id)));
      }
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  // Achievement Actions
  const addAchievement = async (item: Achievement) => {
    try {
      const res = await fetch(`${API_BASE_URL}/achievements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        const newAchievement = await res.json();
        setAchievements(prev => [...prev, newAchievement]);
      }
    } catch (error) {
      console.error('Failed to add achievement:', error);
    }
  };

  const updateAchievement = async (item: Achievement) => {
    try {
      const res = await fetch(`${API_BASE_URL}/achievements/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        setAchievements(prev => prev.map(i => i.id === item.id ? item : i));
      }
    } catch (error) {
      console.error('Failed to update achievement:', error);
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/achievements/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setAchievements(prev => prev.filter(i => String(i.id) !== String(id)));
      }
    } catch (error) {
      console.error('Failed to delete achievement:', error);
    }
  };

  // Blog Actions
  const addBlogPost = async (item: BlogPost) => {
    try {
      const res = await fetch(`${API_BASE_URL}/blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        const newPost = await res.json();
        setBlogPosts(prev => [newPost, ...prev]);
      }
    } catch (error) {
      console.error('Failed to add blog post:', error);
    }
  };

  const updateBlogPost = async (item: BlogPost) => {
    try {
      const res = await fetch(`${API_BASE_URL}/blog/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        setBlogPosts(prev => prev.map(i => i.id === item.id ? item : i));
      }
    } catch (error) {
      console.error('Failed to update blog post:', error);
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setBlogPosts(prev => prev.filter(i => String(i.id) !== String(id)));
      }
    } catch (error) {
      console.error('Failed to delete blog post:', error);
    }
  };

  // Writeup Actions
  const addWriteup = async (item: Writeup) => {
    try {
      const res = await fetch(`${API_BASE_URL}/writeups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        const newWriteup = await res.json();
        setWriteups(prev => [newWriteup, ...prev]);
      }
    } catch (error) {
      console.error('Failed to add writeup:', error);
    }
  };

  const updateWriteup = async (item: Writeup) => {
    try {
      const res = await fetch(`${API_BASE_URL}/writeups/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        setWriteups(prev => prev.map(i => i.id === item.id ? item : i));
      }
    } catch (error) {
      console.error('Failed to update writeup:', error);
    }
  };

  const deleteWriteup = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/writeups/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setWriteups(prev => prev.filter(i => String(i.id) !== String(id)));
      }
    } catch (error) {
      console.error('Failed to delete writeup:', error);
    }
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