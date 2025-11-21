# Meeting Name Generator 🎯

A fun, interactive web app that generates creative and humorous meeting names using Claude AI. Vote on your favorites and build a Hall of Fame!

> From product user story to build and deploy with Claude, Claude Code, Supabase and Vercel

## Features

✨ **AI-Powered Generation**: Uses Claude API to generate 8 creative meeting names instantly
❤️ **Voting System**: Vote for your favorite names with persistent vote counts
🏆 **Hall of Fame**: Displays top 5 most-voted names
➕ **Generate More**: Add additional names without losing existing ones
📋 **Category Filters**: Filter by meeting type (Brainstorm, Retro, Planning, 1:1)
🎨 **Beautiful UI**: Polished design with Tailwind CSS and smooth animations

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **State Management**: TanStack Query (React Query)
- **Deployment**: Vercel-ready

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works!)
- An Anthropic API key

### 2. Clone and Install

```bash
git clone <your-repo-url>
cd meeting-name-generator
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Copy and run the SQL from `supabase-setup.sql`
4. Get your Project URL and Anon Key from Settings > API

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
```

**Important**: The current implementation exposes the Anthropic API key in the browser (for MVP speed). For production, create a backend API route to proxy Claude API calls securely.

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment to Vercel

### Option 1: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables on Vercel

Add these in your Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ANTHROPIC_API_KEY`

## Project Structure

```
meeting-name-generator/
├── src/
│   ├── components/          # React components
│   │   ├── MeetingNameGenerator.tsx
│   │   ├── MeetingNameCard.tsx
│   │   └── HallOfFame.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useMeetingNames.ts
│   ├── lib/                # Configuration
│   │   └── supabase.ts
│   ├── services/           # API services
│   │   └── nameGenerator.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase-setup.sql      # Database schema
├── tasks/                  # Development tasks
│   └── todo.md
└── README.md
```

## Usage

1. **Select Meeting Type**: Choose from All, Brainstorm, Retro, Planning, or 1:1
2. **Generate Names**: Click "Generate Names" to create 8 new meeting names
3. **Vote**: Click the heart button to vote for your favorites
4. **Generate More**: Add more names without losing existing ones
5. **Hall of Fame**: Top-voted names automatically appear in the Hall of Fame

## Security Note for Production

⚠️ **Important**: This MVP exposes the Anthropic API key in the browser. For production:

1. Create a backend API route (e.g., `/api/generate-names`)
2. Move Claude API calls to the server-side
3. Keep `ANTHROPIC_API_KEY` as a server-only environment variable
4. Update `nameGenerator.ts` to call your backend API instead

Example with Next.js API routes or a simple Express backend is recommended.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
