/*
  # Team Management

  1. New Tables
    - `teams`
      - `id` (uuid, primary key)
      - `name` (text)
      - `owner_id` (uuid, references profiles)
      - `created_at` (timestamp)
    
    - `brand_kit`
      - `id` (uuid, primary key)
      - `team_id` (uuid, references teams)
      - `logo_url` (text)
      - `primary_color` (text)
      - `font` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `team_members`
      - `id` (uuid, primary key)
      - `team_id` (uuid, references teams)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `avatar_url` (text)
      - `role` (text)
      - `taps` (integer, default 0)
      - `connections` (integer, default 0)
      - `lead_score` (integer, default 0)
      - `created_at` (timestamp)
    
    - `team_activities`
      - `id` (uuid, primary key)
      - `team_id` (uuid, references teams)
      - `member_id` (uuid, references team_members)
      - `action` (text)
      - `target` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all team tables
    - Team members can only access data from teams they belong to
*/

CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS brand_kit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL UNIQUE,
  logo_url text DEFAULT 'https://img.logoipsum.com/289.svg',
  primary_color text DEFAULT '#4ade80',
  font text DEFAULT 'Roboto',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  avatar_url text DEFAULT 'https://i.pravatar.cc/150?u=member',
  role text DEFAULT 'Member',
  taps integer DEFAULT 0,
  connections integer DEFAULT 0,
  lead_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  member_id uuid REFERENCES team_members(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  target text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_kit ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_activities ENABLE ROW LEVEL SECURITY;

-- Teams policies
CREATE POLICY "Users can read teams they own or are members of"
  ON teams
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = owner_id OR
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create teams"
  ON teams
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Team owners can update teams"
  ON teams
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Brand kit policies
CREATE POLICY "Team members can read brand kit"
  ON brand_kit
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teams
      LEFT JOIN team_members ON team_members.team_id = teams.id
      WHERE teams.id = brand_kit.team_id
      AND (teams.owner_id = auth.uid() OR team_members.user_id = auth.uid())
    )
  );

CREATE POLICY "Team owners can update brand kit"
  ON brand_kit
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = brand_kit.team_id
      AND teams.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = brand_kit.team_id
      AND teams.owner_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can insert brand kit"
  ON brand_kit
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = brand_kit.team_id
      AND teams.owner_id = auth.uid()
    )
  );

-- Team members policies
CREATE POLICY "Team members can read team members"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teams
      LEFT JOIN team_members tm ON tm.team_id = teams.id
      WHERE teams.id = team_members.team_id
      AND (teams.owner_id = auth.uid() OR tm.user_id = auth.uid())
    )
  );

CREATE POLICY "Team owners can manage team members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = team_members.team_id
      AND teams.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = team_members.team_id
      AND teams.owner_id = auth.uid()
    )
  );

-- Team activities policies
CREATE POLICY "Team members can read activities"
  ON team_activities
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teams
      LEFT JOIN team_members ON team_members.team_id = teams.id
      WHERE teams.id = team_activities.team_id
      AND (teams.owner_id = auth.uid() OR team_members.user_id = auth.uid())
    )
  );

CREATE POLICY "Team members can insert activities"
  ON team_activities
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM teams
      LEFT JOIN team_members ON team_members.team_id = teams.id
      WHERE teams.id = team_activities.team_id
      AND (teams.owner_id = auth.uid() OR team_members.user_id = auth.uid())
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_teams_owner_id ON teams(owner_id);
CREATE INDEX IF NOT EXISTS idx_brand_kit_team_id ON brand_kit(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_activities_team_id ON team_activities(team_id);
CREATE INDEX IF NOT EXISTS idx_team_activities_created_at ON team_activities(created_at DESC);