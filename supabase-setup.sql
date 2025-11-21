-- Meeting Names Table
-- Run this SQL in your Supabase SQL Editor to set up the database

CREATE TABLE IF NOT EXISTS meeting_names (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index on votes for faster sorting
CREATE INDEX IF NOT EXISTS meeting_names_votes_idx ON meeting_names(votes DESC);

-- Create an index on created_at for faster sorting by recency
CREATE INDEX IF NOT EXISTS meeting_names_created_at_idx ON meeting_names(created_at DESC);

-- Enable Row Level Security
ALTER TABLE meeting_names ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read and insert (for MVP)
-- Note: In production, you may want to add authentication
CREATE POLICY "Enable read access for all users" ON meeting_names
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON meeting_names
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON meeting_names
  FOR UPDATE USING (true);
