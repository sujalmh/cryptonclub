import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3001;

import dotenv from 'dotenv';
dotenv.config();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://www.crypton-club.xyz',
  'https://crypton-club.xyz'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    let isVercel = false;
    try {
      const hostname = new URL(origin).hostname;
      isVercel = hostname.endsWith('.vercel.app');
    } catch (e) {
      isVercel = false;
    }

    if (allowedOrigins.includes(origin) || isVercel) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'crypton_club';

let db;
let client;

// Initialize MongoDB connection
async function connectToDatabase() {
  try {
    if (db) return db;

    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);

    console.log('✅ Connected to MongoDB');

    // Initialize collections if they don't exist
    await ensureCollections();

    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Ensure collections exist
async function ensureCollections() {
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(c => c.name);

  const requiredCollections = ['events', 'members', 'achievements', 'blog', 'writeups'];

  for (const collectionName of requiredCollections) {
    if (!collectionNames.includes(collectionName)) {
      await db.createCollection(collectionName);
      console.log(`Created collection: ${collectionName}`);
    }
  }
}

// Helper function to get collection
async function getCollection(name) {
  const database = await connectToDatabase();
  return database.collection(name);
}

// ===== EVENTS ENDPOINTS =====
app.get('/api/events', async (req, res) => {
  try {
    const collection = await getCollection('events');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const collection = await getCollection('events');
    const result = await collection.insertOne(req.body);
    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const collection = await getCollection('events');
    const { _id, ...updateData } = req.body;
    const result = await collection.updateOne(
      { id: req.params.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Event not found' });
    } else {
      res.json(req.body);
    }
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const collection = await getCollection('events');
    const result = await collection.deleteOne({ id: req.params.id });
    res.json({ success: result.deletedCount > 0 });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// ===== MEMBERS ENDPOINTS =====
app.get('/api/members', async (req, res) => {
  try {
    const collection = await getCollection('members');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

app.post('/api/members', async (req, res) => {
  try {
    const collection = await getCollection('members');
    const result = await collection.insertOne(req.body);
    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({ error: 'Failed to create member' });
  }
});

app.put('/api/members/:id', async (req, res) => {
  try {
    const collection = await getCollection('members');
    const { _id, ...updateData } = req.body;
    const result = await collection.updateOne(
      { id: req.params.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Member not found' });
    } else {
      res.json(req.body);
    }
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

app.delete('/api/members/:id', async (req, res) => {
  try {
    const collection = await getCollection('members');
    const result = await collection.deleteOne({ id: req.params.id });
    res.json({ success: result.deletedCount > 0 });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

// ===== ACHIEVEMENTS ENDPOINTS =====
app.get('/api/achievements', async (req, res) => {
  try {
    const collection = await getCollection('achievements');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

app.post('/api/achievements', async (req, res) => {
  try {
    const collection = await getCollection('achievements');
    const result = await collection.insertOne(req.body);
    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating achievement:', error);
    res.status(500).json({ error: 'Failed to create achievement' });
  }
});

app.put('/api/achievements/:id', async (req, res) => {
  try {
    const collection = await getCollection('achievements');
    const { _id, ...updateData } = req.body;
    const result = await collection.updateOne(
      { id: req.params.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Achievement not found' });
    } else {
      res.json(req.body);
    }
  } catch (error) {
    console.error('Error updating achievement:', error);
    res.status(500).json({ error: 'Failed to update achievement' });
  }
});

app.delete('/api/achievements/:id', async (req, res) => {
  try {
    const collection = await getCollection('achievements');
    const result = await collection.deleteOne({ id: req.params.id });
    res.json({ success: result.deletedCount > 0 });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).json({ error: 'Failed to delete achievement' });
  }
});

// ===== BLOG ENDPOINTS =====
app.get('/api/blog', async (req, res) => {
  try {
    const collection = await getCollection('blog');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.post('/api/blog', async (req, res) => {
  try {
    const collection = await getCollection('blog');
    const result = await collection.insertOne(req.body);
    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

app.put('/api/blog/:id', async (req, res) => {
  try {
    const collection = await getCollection('blog');
    const { _id, ...updateData } = req.body;
    const result = await collection.updateOne(
      { id: req.params.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json(req.body);
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

app.delete('/api/blog/:id', async (req, res) => {
  try {
    const collection = await getCollection('blog');
    const result = await collection.deleteOne({ id: req.params.id });
    res.json({ success: result.deletedCount > 0 });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// ===== WRITEUPS ENDPOINTS =====
app.get('/api/writeups', async (req, res) => {
  try {
    const collection = await getCollection('writeups');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching writeups:', error);
    res.status(500).json({ error: 'Failed to fetch writeups' });
  }
});

app.get('/api/writeups/:id', async (req, res) => {
  try {
    const collection = await getCollection('writeups');
    const data = await collection.findOne({ id: req.params.id });
    if (!data) {
      return res.status(404).json({ error: 'Writeup not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching writeup:', error);
    res.status(500).json({ error: 'Failed to fetch writeup' });
  }
});

app.post('/api/writeups', async (req, res) => {
  try {
    const collection = await getCollection('writeups');
    const result = await collection.insertOne(req.body);
    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating writeup:', error);
    res.status(500).json({ error: 'Failed to create writeup' });
  }
});

app.put('/api/writeups/:id', async (req, res) => {
  try {
    const collection = await getCollection('writeups');
    const { _id, ...updateData } = req.body;
    const result = await collection.updateOne(
      { id: req.params.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Writeup not found' });
    } else {
      res.json(req.body);
    }
  } catch (error) {
    console.error('Error updating writeup:', error);
    res.status(500).json({ error: 'Failed to update writeup' });
  }
});

app.delete('/api/writeups/:id', async (req, res) => {
  try {
    const collection = await getCollection('writeups');
    const result = await collection.deleteOne({ id: req.params.id });
    res.json({ success: result.deletedCount > 0 });
  } catch (error) {
    console.error('Error deleting writeup:', error);
    res.status(500).json({ error: 'Failed to delete writeup' });
  }
});

// Start server if running directly (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  }).catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

// For Vercel serverless
export default app;
