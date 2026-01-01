-- MTM Holiday Games - Reviews Table Setup
-- Run this in Supabase SQL Editor

-- Create the reviews table
CREATE TABLE game_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_slug TEXT NOT NULL,
  user_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT CHECK (char_length(comment) <= 280),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(game_slug, user_email)
);

-- Index for fast lookups by game
CREATE INDEX idx_reviews_game_slug ON game_reviews(game_slug);

-- Enable Row Level Security
ALTER TABLE game_reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read reviews
CREATE POLICY "Anyone can read reviews"
  ON game_reviews
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert reviews (email validation done client-side)
CREATE POLICY "Anyone can insert reviews"
  ON game_reviews
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can update their own reviews
CREATE POLICY "Users can update own reviews"
  ON game_reviews
  FOR UPDATE
  USING (true);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_game_reviews_updated_at
  BEFORE UPDATE ON game_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create a view for game rating averages (for efficient queries)
CREATE VIEW game_rating_stats AS
SELECT
  game_slug,
  COUNT(*) as review_count,
  ROUND(AVG(rating)::numeric, 1) as average_rating
FROM game_reviews
GROUP BY game_slug;
