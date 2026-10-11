import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001; // Backend runs on 3001

app.use(cors());
app.use(bodyParser.json());

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Helper to read/write
const getFilePath = (resource) => path.join(DATA_DIR, `${resource}.json`);

const readData = (resource) => {
  const filePath = getFilePath(resource);
  if (!fs.existsSync(filePath)) return [];
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${resource}:`, err);
    return [];
  }
};

const writeData = (resource, data) => {
  try {
    fs.writeFileSync(getFilePath(resource), JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error(`Error writing ${resource}:`, err);
    return false;
  }
};

// --- API Routes ---

// Generic GET
app.get('/api/:resource', (req, res) => {
  const { resource } = req.params;
  const data = readData(resource);
  res.json(data);
});

// Generic POST (Save All)
app.post('/api/:resource', (req, res) => {
  const { resource } = req.params;
  const data = req.body;
  
  if (writeData(resource, data)) {
    res.json({ success: true, message: `${resource} updated` });
  } else {
    res.status(500).json({ error: 'Failed to write to disk' });
  }
});

// --- Serve Static Frontend (for Production) ---
// If you build the app, this server will also serve the website
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React Routing (return index.html for unknown routes)
app.get('*', (req, res) => {
  // Only serve index.html if it exists (production mode)
  if (fs.existsSync(path.join(__dirname, 'dist', 'index.html'))) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    res.send('API Server Running. Run "npm run dev" in another terminal for Frontend.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Data stored in: ${DATA_DIR}`);
});