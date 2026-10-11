import { MongoClient } from 'mongodb';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'crypton_club';

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const FILES = {
  events: path.join(DATA_DIR, 'events.json'),
  members: path.join(DATA_DIR, 'members.json'),
  achievements: path.join(DATA_DIR, 'achievements.json'),
  blog: path.join(DATA_DIR, 'blog.json')
};

async function migrateData() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    for (const [collectionName, filePath] of Object.entries(FILES)) {
      try {
        // Read JSON file
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        if (data.length === 0) {
          console.log(`⏭️  Skipping ${collectionName} (empty)`);
          continue;
        }
        
        // Get collection
        const collection = db.collection(collectionName);
        
        // Clear existing data (optional, comment out if you want to keep)
        await collection.deleteMany({});
        
        // Insert data
        const result = await collection.insertMany(data);
        console.log(`✅ Migrated ${result.insertedCount} documents to ${collectionName}`);
        
      } catch (error) {
        console.error(`❌ Error migrating ${collectionName}:`, error.message);
      }
    }
    
    console.log('\n🎉 Migration complete!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrateData();
