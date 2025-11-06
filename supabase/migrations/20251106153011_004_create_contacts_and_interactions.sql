/*
  # Contacts and Interactions

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `title` (text)
      - `company` (text)
      - `photo_url` (text)
      - `last_interaction` (text)
      - `lead_score` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `interactions`
      - `id` (uuid, primary key)
      - `contact_id` (uuid, references contacts)
      - `type` (text) - Tap, Meeting, Call, Email, Note, GPS Tap, Tree Planted
      - `notes` (text)
      - `event` (text, optional)
      - `location` (text, optional)
      - `date` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Users can only access their own contacts and interactions
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  title text DEFAULT '',
  company text DEFAULT '',
  photo_url text DEFAULT 'https://i.pravatar.cc/150?u=contact',
  last_interaction text DEFAULT 'Never',
  lead_score integer DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('Tap', 'Meeting', 'Call', 'Email', 'Note', 'GPS Tap', 'Tree Planted')),
  notes text DEFAULT '',
  event text,
  location text,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- Contacts policies
CREATE POLICY "Users can read own contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contacts"
  ON contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own contacts"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Interactions policies
CREATE POLICY "Users can read interactions for own contacts"
  ON interactions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM contacts
      WHERE contacts.id = interactions.contact_id
      AND contacts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert interactions for own contacts"
  ON interactions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM contacts
      WHERE contacts.id = interactions.contact_id
      AND contacts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update interactions for own contacts"
  ON interactions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM contacts
      WHERE contacts.id = interactions.contact_id
      AND contacts.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM contacts
      WHERE contacts.id = interactions.contact_id
      AND contacts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete interactions for own contacts"
  ON interactions
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM contacts
      WHERE contacts.id = interactions.contact_id
      AND contacts.user_id = auth.uid()
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_contact_id ON interactions(contact_id);
CREATE INDEX IF NOT EXISTS idx_interactions_date ON interactions(date DESC);