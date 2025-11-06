/*
  # Card Templates

  1. New Tables
    - `card_templates`
      - `id` (text, primary key)
      - `name` (text)
      - `class_name` (text) - Tailwind classes for styling
      - `text_color` (text) - Text color class
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `card_templates` table
    - Templates are publicly readable
    - Only admins can modify (restrictive by default)

  3. Initial Data
    - Seed with default templates
*/

CREATE TABLE IF NOT EXISTS card_templates (
  id text PRIMARY KEY,
  name text NOT NULL,
  class_name text NOT NULL,
  text_color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE card_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Templates are publicly readable"
  ON card_templates
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default templates
INSERT INTO card_templates (id, name, class_name, text_color) VALUES
  ('t-emerald', 'Emerald', 'bg-emerald-800', 'text-white'),
  ('t-forest', 'Forest', 'bg-green-900', 'text-white'),
  ('t-mint', 'Mint', 'bg-green-200', 'text-black'),
  ('t-charcoal', 'Charcoal', 'bg-gray-800', 'text-white'),
  ('t-jade', 'Jade', 'bg-teal-700', 'text-white'),
  ('t-glass', 'Glass', 'bg-black/20 backdrop-blur-2xl border border-white/10', 'text-white')
ON CONFLICT (id) DO NOTHING;