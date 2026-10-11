export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  googleFormUrl: string;
  type: 'workshop' | 'ctf' | 'social';
  status: 'upcoming' | 'past';
}

export interface Socials {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socials: Socials;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // Markdown content
  author: string;
  tags: string[];
  type?: 'intel' | 'writeup';
  writeupIds?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  category: 'competition' | 'certification' | 'recognition';
  rank?: string; // e.g. "1st Place", "Finalist"
  imageUrl?: string;
  team?: string[]; // Optional list of team members
}

export interface Writeup {
  id: string;
  challengeName: string;
  author: string;
  category: string;
  content: string; // Markdown content
  date: string;
}