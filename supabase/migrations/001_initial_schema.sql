-- Passpart Database Schema
-- Initial migration for the digital art passport app

-- ============================================
-- EXTENSIONS
-- ============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for geolocation features
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================
-- CUSTOM TYPES
-- ============================================

-- Venue types
CREATE TYPE venue_type AS ENUM ('museum', 'gallery', 'street_art', 'popup', 'public_art');

-- Explorer levels based on stamps collected
CREATE TYPE explorer_level AS ENUM ('novice', 'explorer', 'connoisseur', 'master');

-- ============================================
-- TABLES
-- ============================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT CHECK (char_length(bio) <= 160),
  favorite_art_styles TEXT[] DEFAULT '{}',
  total_stamps INTEGER DEFAULT 0,
  total_venues INTEGER DEFAULT 0,
  explorer_level explorer_level DEFAULT 'novice',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Venues table (museums, galleries, street art locations, etc.)
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type venue_type NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  location GEOGRAPHY(POINT, 4326), -- PostGIS geography point
  cover_image TEXT,
  website TEXT,
  opening_hours JSONB,
  is_verified BOOLEAN DEFAULT FALSE,
  submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Artworks table (individual pieces within venues)
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  artist TEXT,
  year TEXT,
  medium TEXT,
  description TEXT,
  image_url TEXT,
  location_within_venue TEXT,
  is_permanent BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stamps table (user check-ins/visits)
CREATE TABLE stamps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  artwork_id UUID REFERENCES artworks(id) ON DELETE SET NULL,
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  stamped_at TIMESTAMPTZ DEFAULT NOW(),
  location_verified BOOLEAN DEFAULT FALSE,
  photo_url TEXT,
  personal_note TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_favorite BOOLEAN DEFAULT FALSE,
  mood_tags TEXT[] DEFAULT '{}',
  UNIQUE(user_id, venue_id, artwork_id) -- Prevent duplicate stamps
);

-- Achievements table (badges/rewards definitions)
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL
);

-- User achievements (junction table)
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Follows table (social connections)
CREATE TABLE follows (
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id != following_id) -- Can't follow yourself
);

-- ============================================
-- INDEXES
-- ============================================

-- Venues: spatial index for location queries
CREATE INDEX idx_venues_location ON venues USING GIST (location);

-- Venues: index for city/country filtering
CREATE INDEX idx_venues_city_country ON venues (city, country);

-- Venues: index for slug lookups
CREATE INDEX idx_venues_slug ON venues (slug);

-- Stamps: index for user queries
CREATE INDEX idx_stamps_user_id ON stamps (user_id);

-- Stamps: index for venue queries
CREATE INDEX idx_stamps_venue_id ON stamps (venue_id);

-- Stamps: index for timestamp ordering
CREATE INDEX idx_stamps_stamped_at ON stamps (stamped_at DESC);

-- Profiles: index for username lookups
CREATE INDEX idx_profiles_username ON profiles (username);

-- Artworks: index for venue queries
CREATE INDEX idx_artworks_venue_id ON artworks (venue_id);

-- Follows: indexes for both directions
CREATE INDEX idx_follows_follower ON follows (follower_id);
CREATE INDEX idx_follows_following ON follows (following_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to automatically update the location geography point
CREATE OR REPLACE FUNCTION update_venue_location()
RETURNS TRIGGER AS $$
BEGIN
  NEW.location = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326)::geography;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update location on venue insert/update
CREATE TRIGGER trigger_update_venue_location
  BEFORE INSERT OR UPDATE OF latitude, longitude ON venues
  FOR EACH ROW
  EXECUTE FUNCTION update_venue_location();

-- Function to get nearby venues
CREATE OR REPLACE FUNCTION get_nearby_venues(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  type venue_type,
  description TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  cover_image TEXT,
  website TEXT,
  opening_hours JSONB,
  is_verified BOOLEAN,
  submitted_by UUID,
  created_at TIMESTAMPTZ,
  distance_km DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    v.id,
    v.name,
    v.slug,
    v.type,
    v.description,
    v.address,
    v.city,
    v.country,
    v.latitude,
    v.longitude,
    v.cover_image,
    v.website,
    v.opening_hours,
    v.is_verified,
    v.submitted_by,
    v.created_at,
    ST_Distance(
      v.location,
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
    ) / 1000 AS distance_km
  FROM venues v
  WHERE ST_DWithin(
    v.location,
    ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
    radius_km * 1000 -- Convert km to meters
  )
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- Function to update profile stats after stamp
CREATE OR REPLACE FUNCTION update_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update total stamps count
    UPDATE profiles
    SET
      total_stamps = (SELECT COUNT(*) FROM stamps WHERE user_id = NEW.user_id),
      total_venues = (SELECT COUNT(DISTINCT venue_id) FROM stamps WHERE user_id = NEW.user_id),
      updated_at = NOW()
    WHERE id = NEW.user_id;

    -- Update explorer level based on total stamps
    UPDATE profiles
    SET explorer_level = CASE
      WHEN total_stamps >= 100 THEN 'master'
      WHEN total_stamps >= 50 THEN 'connoisseur'
      WHEN total_stamps >= 10 THEN 'explorer'
      ELSE 'novice'
    END
    WHERE id = NEW.user_id;

  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles
    SET
      total_stamps = (SELECT COUNT(*) FROM stamps WHERE user_id = OLD.user_id),
      total_venues = (SELECT COUNT(DISTINCT venue_id) FROM stamps WHERE user_id = OLD.user_id),
      updated_at = NOW()
    WHERE id = OLD.user_id;

    UPDATE profiles
    SET explorer_level = CASE
      WHEN total_stamps >= 100 THEN 'master'
      WHEN total_stamps >= 50 THEN 'connoisseur'
      WHEN total_stamps >= 10 THEN 'explorer'
      ELSE 'novice'
    END
    WHERE id = OLD.user_id;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for stamp stats
CREATE TRIGGER trigger_update_profile_stats
  AFTER INSERT OR DELETE ON stamps
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_stats();

-- Function to check and unlock achievements
CREATE OR REPLACE FUNCTION check_achievements(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  icon TEXT,
  requirement_type TEXT,
  requirement_value INTEGER
) AS $$
DECLARE
  user_stats RECORD;
  achievement RECORD;
  newly_unlocked UUID[];
BEGIN
  -- Get user stats
  SELECT
    p.total_stamps,
    p.total_venues,
    (SELECT COUNT(DISTINCT v.country) FROM stamps s JOIN venues v ON s.venue_id = v.id WHERE s.user_id = p_user_id) as unique_countries,
    (SELECT COUNT(DISTINCT v.city) FROM stamps s JOIN venues v ON s.venue_id = v.id WHERE s.user_id = p_user_id) as unique_cities,
    (SELECT COUNT(*) FROM stamps WHERE user_id = p_user_id AND personal_note IS NOT NULL AND personal_note != '') as stamps_with_notes,
    (SELECT COUNT(*) FROM stamps WHERE user_id = p_user_id AND photo_url IS NOT NULL) as stamps_with_photos,
    (SELECT COUNT(*) FROM follows WHERE following_id = p_user_id) as followers
  INTO user_stats
  FROM profiles p
  WHERE p.id = p_user_id;

  -- Check each achievement
  FOR achievement IN SELECT * FROM achievements LOOP
    -- Skip if already unlocked
    CONTINUE WHEN EXISTS (
      SELECT 1 FROM user_achievements
      WHERE user_id = p_user_id AND achievement_id = achievement.id
    );

    -- Check if requirement is met
    IF (
      (achievement.requirement_type = 'total_stamps' AND user_stats.total_stamps >= achievement.requirement_value) OR
      (achievement.requirement_type = 'unique_countries' AND user_stats.unique_countries >= achievement.requirement_value) OR
      (achievement.requirement_type = 'unique_cities' AND user_stats.unique_cities >= achievement.requirement_value) OR
      (achievement.requirement_type = 'stamps_with_notes' AND user_stats.stamps_with_notes >= achievement.requirement_value) OR
      (achievement.requirement_type = 'stamps_with_photos' AND user_stats.stamps_with_photos >= achievement.requirement_value) OR
      (achievement.requirement_type = 'followers' AND user_stats.followers >= achievement.requirement_value)
    ) THEN
      -- Unlock achievement
      INSERT INTO user_achievements (user_id, achievement_id)
      VALUES (p_user_id, achievement.id);

      newly_unlocked := array_append(newly_unlocked, achievement.id);
    END IF;
  END LOOP;

  -- Return newly unlocked achievements
  RETURN QUERY
  SELECT a.id, a.name, a.description, a.icon, a.requirement_type, a.requirement_value
  FROM achievements a
  WHERE a.id = ANY(newly_unlocked);
END;
$$ LANGUAGE plpgsql;

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE stamps ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Venues policies
CREATE POLICY "Venues are viewable by everyone"
  ON venues FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create venues"
  ON venues FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Venue submitters can update their venues"
  ON venues FOR UPDATE
  USING (auth.uid() = submitted_by);

-- Artworks policies
CREATE POLICY "Artworks are viewable by everyone"
  ON artworks FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create artworks"
  ON artworks FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Stamps policies
CREATE POLICY "Users can view their own stamps"
  ON stamps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view public stamps"
  ON stamps FOR SELECT
  USING (true); -- For activity feed - you might want to add privacy settings later

CREATE POLICY "Users can create their own stamps"
  ON stamps FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stamps"
  ON stamps FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stamps"
  ON stamps FOR DELETE
  USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Achievements are viewable by everyone"
  ON achievements FOR SELECT
  USING (true);

-- User achievements policies
CREATE POLICY "User achievements are viewable by everyone"
  ON user_achievements FOR SELECT
  USING (true);

CREATE POLICY "System can insert user achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (true); -- Controlled by the check_achievements function

-- Follows policies
CREATE POLICY "Follows are viewable by everyone"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Users can follow others"
  ON follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow"
  ON follows FOR DELETE
  USING (auth.uid() = follower_id);

-- ============================================
-- SEED DATA
-- ============================================

-- Initial achievements
INSERT INTO achievements (name, description, icon, requirement_type, requirement_value) VALUES
  ('First Steps', 'Make your first stamp', '👣', 'total_stamps', 1),
  ('Art Lover', 'Collect 10 stamps', '🎨', 'total_stamps', 10),
  ('Cultured', 'Collect 50 stamps', '🎭', 'total_stamps', 50),
  ('Connoisseur', 'Collect 100 stamps', '👑', 'total_stamps', 100),
  ('Globe Trotter', 'Visit art in 5 countries', '🌍', 'unique_countries', 5),
  ('City Hopper', 'Explore art in 10 cities', '🏙️', 'unique_cities', 10),
  ('Art Critic', 'Write 10 personal notes', '📝', 'stamps_with_notes', 10),
  ('Photographer', 'Add photos to 20 stamps', '📸', 'stamps_with_photos', 20),
  ('Influencer', 'Gain 10 followers', '⭐', 'followers', 10);

-- Sample venues in Lisbon
INSERT INTO venues (name, slug, type, description, address, city, country, latitude, longitude, is_verified) VALUES
  ('Museu Nacional de Arte Antiga', 'mnaa-lisbon', 'museum', 'Portugal''s national museum with art from the 12th to 19th century', 'R. das Janelas Verdes', 'Lisbon', 'Portugal', 38.7033, -9.1631, true),
  ('MAAT - Museum of Art, Architecture and Technology', 'maat-lisbon', 'museum', 'Contemporary museum on the Tagus riverfront', 'Av. Brasília', 'Lisbon', 'Portugal', 38.6964, -9.1919, true),
  ('Berardo Collection Museum', 'berardo-lisbon', 'museum', 'Modern and contemporary art museum in Belém', 'Praça do Império', 'Lisbon', 'Portugal', 38.6961, -9.2063, true),
  ('LX Factory Street Art', 'lx-factory-street-art', 'street_art', 'Vibrant street art in the creative hub of Alcântara', 'R. Rodrigues de Faria 103', 'Lisbon', 'Portugal', 38.7037, -9.1778, true),
  ('Underdogs Gallery', 'underdogs-lisbon', 'gallery', 'Contemporary urban art gallery', 'R. Fernando Palha 56', 'Lisbon', 'Portugal', 38.7267, -9.1056, true);

-- Sample venues in Porto
INSERT INTO venues (name, slug, type, description, address, city, country, latitude, longitude, is_verified) VALUES
  ('Serralves Museum', 'serralves-porto', 'museum', 'Contemporary art museum with beautiful gardens', 'R. Dom João de Castro 210', 'Porto', 'Portugal', 41.1596, -8.6595, true),
  ('São Bento Station Azulejos', 'sao-bento-azulejos', 'public_art', 'Historic train station with stunning Portuguese tiles', 'Praça de Almeida Garrett', 'Porto', 'Portugal', 41.1456, -8.6103, true),
  ('Rua de Miguel Bombarda Galleries', 'miguel-bombarda-porto', 'gallery', 'Street of contemporary art galleries', 'R. de Miguel Bombarda', 'Porto', 'Portugal', 41.1517, -8.6264, true);

-- Sample venues worldwide
INSERT INTO venues (name, slug, type, description, address, city, country, latitude, longitude, is_verified) VALUES
  ('Louvre Museum', 'louvre-paris', 'museum', 'World''s largest art museum and historic monument', 'Rue de Rivoli', 'Paris', 'France', 48.8606, 2.3376, true),
  ('MoMA', 'moma-nyc', 'museum', 'Museum of Modern Art in Midtown Manhattan', '11 W 53rd St', 'New York', 'United States', 40.7614, -73.9776, true);

-- Sample artworks for MNAA
INSERT INTO artworks (venue_id, title, artist, year, medium, description, is_permanent)
SELECT
  id,
  'Painéis de São Vicente',
  'Nuno Gonçalves',
  '1470-1480',
  'Oil on wood',
  'Six panel polyptych, one of the most important works of Portuguese art',
  true
FROM venues WHERE slug = 'mnaa-lisbon';

INSERT INTO artworks (venue_id, title, artist, year, medium, description, is_permanent)
SELECT
  id,
  'The Temptation of St. Anthony',
  'Hieronymus Bosch',
  '1501',
  'Oil on oak panel',
  'Triptych depicting the mental and spiritual torment of Saint Anthony',
  true
FROM venues WHERE slug = 'mnaa-lisbon';

-- Sample artworks for Louvre
INSERT INTO artworks (venue_id, title, artist, year, medium, description, is_permanent)
SELECT
  id,
  'Mona Lisa',
  'Leonardo da Vinci',
  '1503-1519',
  'Oil on poplar panel',
  'The world''s most famous portrait',
  true
FROM venues WHERE slug = 'louvre-paris';

INSERT INTO artworks (venue_id, title, artist, year, medium, description, is_permanent)
SELECT
  id,
  'Venus de Milo',
  'Alexandros of Antioch',
  '130-100 BC',
  'Marble sculpture',
  'Ancient Greek sculpture depicting the goddess Aphrodite',
  true
FROM venues WHERE slug = 'louvre-paris';

-- ============================================
-- HELPFUL COMMENTS
-- ============================================

COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth';
COMMENT ON TABLE venues IS 'Art venues: museums, galleries, street art locations';
COMMENT ON TABLE artworks IS 'Individual artworks within venues';
COMMENT ON TABLE stamps IS 'User check-ins and visits to venues/artworks';
COMMENT ON TABLE achievements IS 'Badge definitions for gamification';
COMMENT ON TABLE user_achievements IS 'Achievements unlocked by users';
COMMENT ON TABLE follows IS 'Social connections between users';
COMMENT ON FUNCTION get_nearby_venues IS 'Returns venues within radius_km of given coordinates';
COMMENT ON FUNCTION check_achievements IS 'Checks and unlocks achievements for a user, returns newly unlocked';
