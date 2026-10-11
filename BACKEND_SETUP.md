# Crypton Club Website - Backend Setup

## Overview
The website now uses a backend API server for persistent data storage instead of browser localStorage. All changes to events, members, achievements, and blog posts are now permanently saved.

## Setup Instructions

### 1. Install Backend Dependencies
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

### 2. Install Frontend Dependencies
If you haven't already, install the concurrently package in the main directory:
```bash
cd ..
npm install
```

### 3. Run Both Frontend and Backend
You have two options:

**Option A: Run both servers with one command (Recommended)**
```bash
npm run dev:all
```

**Option B: Run servers separately**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

## Server Details

- **Backend Server**: Runs on `http://localhost:3001`
- **Frontend Server**: Runs on `http://localhost:5173` (default Vite port)

## Data Storage

Data is stored in JSON files in the `server/data/` directory:
- `events.json` - All events
- `members.json` - Team members
- `achievements.json` - Achievements
- `blog.json` - Blog posts

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Achievements
- `GET /api/achievements` - Get all achievements
- `POST /api/achievements` - Create new achievement
- `PUT /api/achievements/:id` - Update achievement
- `DELETE /api/achievements/:id` - Delete achievement

### Blog Posts
- `GET /api/blog` - Get all blog posts
- `POST /api/blog` - Create new blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post

## Troubleshooting

### Backend server not connecting
- Make sure the backend server is running on port 3001
- Check console for any error messages
- Verify that `server/data/` directory exists

### Data not persisting
- Ensure both frontend and backend servers are running
- Check browser console for API errors
- Verify backend server logs for errors
