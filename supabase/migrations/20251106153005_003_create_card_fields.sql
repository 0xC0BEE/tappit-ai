/*
  # Card Fields

  1. New Tables
    - `card_fields`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `label` (text) - Field label like "Name", "Email"
      - `value` (text) - Field value
      - `icon` (text) - Icon identifier
      - `field_type` (text) - "text" or "video"
      - `order_index` (integer) - For drag-to-reorder
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `card_fields` table
    - Users can only access their own fields
*/

CREATE TABLE IF NOT EXISTS card_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  value text DEFAULT '',
  icon text DEFAULT 'BriefcaseIcon',
  field_type text DEFAULT 'text' CHECK (field_type IN ('text', 'video')),
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE card_fields ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own card fields"
  ON card_fields
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own card fields"
  ON card_fields
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own card fields"
  ON card_fields
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own card fields"
  ON card_fields
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_card_fields_user_id ON card_fields(user_id);
CREATE INDEX IF NOT EXISTS idx_card_fields_order ON card_fields(user_id, order_index);