/*
  # Analytics

  1. New Tables
    - `analytics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `taps_current` (integer, default 0)
      - `taps_previous` (integer, default 0)
      - `connections_current` (integer, default 0)
      - `connections_previous` (integer, default 0)
      - `lead_score_current` (integer, default 0)
      - `lead_score_previous` (integer, default 0)
      - `carbon_saved_current` (numeric, default 0)
      - `carbon_saved_previous` (numeric, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tap_locations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `lat` (numeric)
      - `lng` (numeric)
      - `count` (integer, default 1)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Users can only access their own analytics
*/

CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  taps_current integer DEFAULT 0,
  taps_previous integer DEFAULT 0,
  connections_current integer DEFAULT 0,
  connections_previous integer DEFAULT 0,
  lead_score_current integer DEFAULT 0,
  lead_score_previous integer DEFAULT 0,
  carbon_saved_current numeric DEFAULT 0,
  carbon_saved_previous numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tap_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lat numeric NOT NULL,
  lng numeric NOT NULL,
  count integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE tap_locations ENABLE ROW LEVEL SECURITY;

-- Analytics policies
CREATE POLICY "Users can read own analytics"
  ON analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics"
  ON analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics"
  ON analytics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Tap locations policies
CREATE POLICY "Users can read own tap locations"
  ON tap_locations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tap locations"
  ON tap_locations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_tap_locations_user_id ON tap_locations(user_id);