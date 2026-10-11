# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for the Crypton Club website.

## Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** and create an account
3. Choose the **FREE M0** cluster (512MB storage)

## Step 2: Create a Database Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select your preferred cloud provider (AWS recommended)
4. Choose a region closest to your users
5. Name your cluster (e.g., `crypton-cluster`)
6. Click **"Create"**

⏱️ Wait 3-5 minutes for the cluster to be created.

## Step 3: Configure Database Access

### Create Database User

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `crypton_admin` (or your choice)
5. Password: Click **"Autogenerate Secure Password"** and **save it**
6. Under "Built-in Role", select **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Configure Network Access

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Vercel deployment)
   - This adds `0.0.0.0/0`
4. Click **"Confirm"**

> ⚠️ For production, you should restrict this to Vercel's IP ranges

## Step 5: Get Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Drivers"**
4. Select **"Node.js"** and version **6.0 or later**
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://crypton_admin:<password>@crypton-cluster.xxxxx.mongodb.net/
   ```
6. Replace `<password>` with your actual password from Step 3

**Your final connection string should look like:**
```
mongodb+srv://crypton_admin:YourPasswordHere@crypton-cluster.xxxxx.mongodb.net/
```

## Step 6: Add to Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add a new variable:
   - **Name:** `MONGODB_URI`
   - **Value:** Your connection string from Step 5
   - **Environments:** Select all (Production, Preview, Development)
4. Click **"Save"**

## Step 7: Add to Local Environment (Optional)

For local development, create a `.env` file in the `server/` directory:

```bash
# server/.env
MONGODB_URI=mongodb+srv://crypton_admin:YourPasswordHere@crypton-cluster.xxxxx.mongodb.net/
```

> ⚠️ **Never commit `.env` to Git!** It's already in `.gitignore`.

## Step 8: Migrate Existing Data

Run this command to import your JSON data to MongoDB:

```bash
cd server
npm install
node migrate-data.js
```

You should see:
```
✅ Connected to MongoDB
✅ Migrated 0 documents to events
✅ Migrated 4 documents to members
✅ Migrated 4 documents to achievements
✅ Migrated 0 documents to blog
🎉 Migration complete!
```

## Step 9: Deploy to Vercel

```bash
git add .
git commit -m "Add MongoDB Atlas integration"
git push origin main
```

Vercel will automatically deploy with your MongoDB connection! 🚀

---

## Troubleshooting

### "MongoServerError: Authentication failed"
- Double-check your username and password in the connection string
- Make sure you replaced `<password>` with your actual password

### "MongoNetworkError: connection timed out"
- Verify that "0.0.0.0/0" is in Network Access
- Check that your connection string is correct

### "Cannot find module 'mongodb'"
```bash
cd server
npm install
```

### Data not showing up
- Run the migration script: `node migrate-data.js`
- Check your MongoDB Atlas dashboard → "Browse Collections"

---

## MongoDB Atlas Dashboard

To view your data:
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Click **"Database"** → **"Browse Collections"**
3. You'll see:
   - `crypton_club` database
   - Collections: `events`, `members`, `achievements`, `blog`

---

## Cost

The **M0 Free Tier** includes:
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Forever free
- ✅ No credit card required

This is more than enough for your website! 🎉
