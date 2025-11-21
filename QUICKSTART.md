# Quick Start Guide

## You're all set! Here's how to get running:

### Step 1: Set Up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project" and create a project (wait 2-3 minutes for setup)
3. Once ready, go to **SQL Editor** in the left sidebar
4. Copy the contents of `supabase-setup.sql` and paste it into the editor
5. Click "Run" to create your database table
6. Go to **Settings** > **API** and copy:
   - Project URL (starts with `https://`)
   - `anon` `public` key (the long string)

### Step 2: Get Your Anthropic API Key (2 minutes)

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to **API Keys** and create a new key
4. Copy the key (starts with `sk-ant-`)

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy this and fill in your values
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_ANTHROPIC_API_KEY=sk-ant-your_key_here
```

### Step 4: Run the App!

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Step 5: Try It Out

1. Select a meeting type (or leave as "All Types")
2. Click "Generate Names"
3. Watch as 8 creative names appear
4. Vote for your favorites by clicking the heart
5. See them appear in the Hall of Fame!
6. Click "Generate More" to add more names

---

## Deploy to Vercel (Optional)

When you're ready to share with your team:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or push to GitHub and import in the Vercel dashboard. Don't forget to add your environment variables in Vercel's project settings!

---

## Troubleshooting

**"Missing Supabase environment variables"**
- Make sure your `.env` file exists and has the correct variable names

**"Failed to generate names"**
- Check that your Anthropic API key is valid
- Ensure you have API credits in your Anthropic account

**Names aren't saving**
- Verify you ran the SQL setup in Supabase
- Check your Supabase URL and anon key are correct

---

Enjoy generating fun meeting names!
