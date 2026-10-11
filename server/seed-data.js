import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'crypton_club';

const members = [
  {
    name: 'Sujal M H',
    role: 'President',
    image: 'https://via.placeholder.com/150',
    socials: { linkedin: '#', github: '#' }
  },
  {
    name: 'Sujnan Kumar',
    role: 'Tech Lead',
    image: 'https://via.placeholder.com/150',
    socials: { linkedin: '#', github: '#' }
  },
  {
    name: 'Yashas Shetty',
    role: 'Treasurer',
    image: 'https://via.placeholder.com/150',
    socials: { linkedin: '#', github: '#' }
  },
  {
    name: 'Suhan D Shet',
    role: 'PR Manager',
    image: 'https://via.placeholder.com/150',
    socials: { linkedin: '#', github: '#' }
  }
];

const achievements = [
  {
    title: '1st Place – SeaTF',
    description: 'National-level cybersecurity CTF organized by ACM, IET, and IE at NIT Karnataka. Demonstrated strong skills in reverse engineering, web security, cryptography, and forensics.',
    date: '2025',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    title: '2nd Place – Veni Vidi Vici CTF',
    description: 'Capture The Flag competition organized by the Indian Institute of Technology (IIT), Dharwad on January 30–31, 2025.',
    date: 'Jan 2025',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    title: '3rd Place – ACN Capture The Flag',
    description: 'Held during Amrita CyberNation 3rd Edition (Sept 11–12, 2024), organized by the Department of Computer Science and Engineering, Amrita School of Computing, Chennai. (Certificate)',
    date: 'Sept 2024',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    title: '3rd Place – KLE GIT × IITB CTF',
    description: 'Conducted by IEEE CS, KLE GIT Belgaum in collaboration with the Trust Lab, IIT Bombay on May 15, 2025, at KLE GIT, Belgaum.',
    date: 'May 2025',
    image: 'https://via.placeholder.com/300x200'
  }
];

async function seed() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    const db = client.db(DB_NAME);

    // 1. Clear existing data
    await db.collection('events').deleteMany({});
    console.log('✅ Cleared events');
    
    await db.collection('members').deleteMany({});
    console.log('✅ Cleared members');
    
    await db.collection('achievements').deleteMany({});
    console.log('✅ Cleared achievements');

    // 2. Add new data
    if (members.length > 0) {
      await db.collection('members').insertMany(members);
      console.log(`✅ Added ${members.length} members`);
    }

    if (achievements.length > 0) {
      await db.collection('achievements').insertMany(achievements);
      console.log(`✅ Added ${achievements.length} achievements`);
    }

    console.log('🎉 Seeding complete!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await client.close();
  }
}

seed();
