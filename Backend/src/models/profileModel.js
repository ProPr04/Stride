import pool from '../config/db.js';

/**
 * Initializes the profile tables in PostgreSQL.
 * Links to the existing 'users' table via foreign keys.
 */
export const createProfileTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS athlete_profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      full_name VARCHAR(255),
      sport VARCHAR(100) NOT NULL DEFAULT 'General Sports',
      playing_level VARCHAR(50) DEFAULT 'Amateur',
      verification_level INTEGER DEFAULT 1 CHECK (verification_level BETWEEN 1 AND 4),
      location VARCHAR(255),
      age VARCHAR(50),
      avatar_url TEXT,
      cover_url TEXT,
      performance_metrics TEXT,
      skills TEXT[] DEFAULT '{}',
      achievements JSONB DEFAULT '[]',
      videos JSONB DEFAULT '[]',
      certifications JSONB DEFAULT '[]',
      availability JSONB DEFAULT '{}',
      bio TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Ensure backward compatibility if table already exists
    ALTER TABLE athlete_profiles ADD COLUMN IF NOT EXISTS full_name VARCHAR(255);
    ALTER TABLE athlete_profiles ADD COLUMN IF NOT EXISTS location VARCHAR(255);
    ALTER TABLE athlete_profiles ADD COLUMN IF NOT EXISTS age VARCHAR(50);
    ALTER TABLE athlete_profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
    ALTER TABLE athlete_profiles ADD COLUMN IF NOT EXISTS cover_url TEXT;
    ALTER TABLE athlete_profiles ADD COLUMN IF NOT EXISTS performance_metrics TEXT;
    ALTER TABLE athlete_profiles ADD COLUMN IF NOT EXISTS achievements JSONB DEFAULT '[]';
    ALTER TABLE athlete_profiles ADD COLUMN IF NOT EXISTS videos JSONB DEFAULT '[]';
    ALTER TABLE athlete_profiles ADD COLUMN IF NOT EXISTS certifications JSONB DEFAULT '[]';

    CREATE TABLE IF NOT EXISTS academy_profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      academy_name VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      sports_offered TEXT[],
      facilities TEXT,
      compensation_structure JSONB,
      tagline TEXT,
      logo_url TEXT,
      founded VARCHAR(10),
      primary_sports TEXT[],
      coaches JSONB DEFAULT '[]',
      programs JSONB DEFAULT '[]',
      stats JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    ALTER TABLE academy_profiles ADD COLUMN IF NOT EXISTS tagline TEXT;
    ALTER TABLE academy_profiles ADD COLUMN IF NOT EXISTS logo_url TEXT;
    ALTER TABLE academy_profiles ADD COLUMN IF NOT EXISTS founded VARCHAR(10);
    ALTER TABLE academy_profiles ADD COLUMN IF NOT EXISTS primary_sports TEXT[];
    ALTER TABLE academy_profiles ADD COLUMN IF NOT EXISTS coaches JSONB DEFAULT '[]';
    ALTER TABLE academy_profiles ADD COLUMN IF NOT EXISTS programs JSONB DEFAULT '[]';
    ALTER TABLE academy_profiles ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '{}';
  `;
  await pool.query(queryText);
  await seedSampleAthletesIfEmpty();
};

/**
 * Seeds sample athletes if the users table has few or no athletes.
 */
export const seedSampleAthletesIfEmpty = async () => {
  try {
    const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM users WHERE role = 'athlete';");
    if (rows[0].count < 4) {
      const sampleAthletes = [
        {
          email: 'arjun.singh@stride.com',
          name: 'Arjun Singh',
          sport: 'Football',
          playing_level: 'Professional',
          location: 'Mumbai, India',
          age: '23 Yrs',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
          bio: 'Versatile midfield playmaker with ISL developmental academy experience and strong passing vision.',
          performance_metrics: 'Pass Accuracy: 88% | Top Sprint Speed: 32.4 km/h | 45 Match Starts',
        },
        {
          email: 'riya.sharma@stride.com',
          name: 'Riya Sharma',
          sport: 'Track & Field',
          playing_level: 'National',
          location: 'Pune, India',
          age: '21 Yrs',
          avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
          bio: 'State gold medalist 100m/200m sprinter. Preparing for National Open Athletics Championship.',
          performance_metrics: '100m PB: 11.45s | 200m PB: 23.60s | State Gold Medalist 2025',
        },
        {
          email: 'kabir.mehta@stride.com',
          name: 'Kabir Mehta',
          sport: 'Cricket',
          playing_level: 'State',
          location: 'Delhi, India',
          age: '22 Yrs',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
          bio: 'Left-arm fast bowler and aggressive middle-order batsman with U-19 Cooch Behar Trophy appearances.',
          performance_metrics: 'Bowling Speed: 135 km/h | Batting SR: 142.5 | 32 Wickets in Season',
        },
        {
          email: 'ananya.patil@stride.com',
          name: 'Ananya Patil',
          sport: 'Badminton',
          playing_level: 'National',
          location: 'Bengaluru, India',
          age: '20 Yrs',
          avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
          bio: 'BAI National Ranking Tournament quarter-finalist specializing in fast-paced women\'s singles rallies.',
          performance_metrics: 'BAI Rank: #24 Senior | Smash Velocity: 290 km/h | All-India Finalist',
        },
        {
          email: 'rohan.verma@stride.com',
          name: 'Rohan Verma',
          sport: 'Tennis',
          playing_level: 'National',
          location: 'Hyderabad, India',
          age: '21 Yrs',
          avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
          bio: 'Aggressive baseline tennis player with heavy topspin forehand and AITA Men’s circuit ranking.',
          performance_metrics: 'First Serve: 195 km/h | UTR: 10.4 | 4 AITA Titles',
        },
        {
          email: 'priya.nair@stride.com',
          name: 'Priya Nair',
          sport: 'Swimming',
          playing_level: 'National',
          location: 'Chennai, India',
          age: '19 Yrs',
          avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
          bio: 'Freestyle and butterfly endurance swimmer with senior national meet final appearances.',
          performance_metrics: '100m Free: 58.2s | 200m Fly: 2:16.4 | National Silver',
        }
      ];

      for (const ath of sampleAthletes) {
        const userRes = await pool.query(
          `INSERT INTO users (email, password_hash, role)
           VALUES ($1, $2, 'athlete')
           ON CONFLICT (email) DO UPDATE SET role = 'athlete'
           RETURNING id;`,
          [ath.email, '$2b$10$mockPasswordHashForTestingOnly12345678901234567890']
        );
        const userId = userRes.rows[0].id;

        await upsertAthleteProfile(userId, {
          full_name: ath.name,
          sport: ath.sport,
          playing_level: ath.playing_level,
          location: ath.location,
          age: ath.age,
          avatar_url: ath.avatar_url,
          bio: ath.bio,
          performance_metrics: ath.performance_metrics,
          verification_level: 2,
          achievements: [{ title: `State & National representation in ${ath.sport}`, date: '2025' }]
        });
      }
      console.log('🌱 Seeded sample athletes into PostgreSQL.');
    }
  } catch (err) {
    console.warn('Sample athletes seeding notice:', err.message);
  }
};


/**
 * Retrieves an athlete's profile by their user ID.
 * @param {number} userId - The ID from the users table.
 */
export const getAthleteProfileByUserId = async (userId) => {
  const queryText = `
    SELECT 
      ap.*,
      u.email,
      u.role,
      u.created_at AS member_since
    FROM athlete_profiles ap
    JOIN users u ON ap.user_id = u.id
    WHERE ap.user_id = $1;
  `;
  const { rows } = await pool.query(queryText, [userId]);
  return rows[0] || null;
};

/**
 * Retrieves an academy's profile by their user ID.
 * @param {number} userId - The ID from the users table.
 */
export const getAcademyProfileByUserId = async (userId) => {
  const queryText = `
    SELECT 
      ap.*,
      u.email,
      u.role,
      u.created_at AS member_since
    FROM academy_profiles ap
    JOIN users u ON ap.user_id = u.id
    WHERE ap.user_id = $1;
  `;
  const { rows } = await pool.query(queryText, [userId]);
  return rows[0] || null;
};

/**
 * Creates or updates an athlete profile.
 */
export const upsertAthleteProfile = async (userId, profileData) => {
  const {
    sport = 'General Sports',
    playing_level = 'Amateur',
    skills = [],
    availability = {},
    bio = '',
    full_name,
    name,
    location,
    age,
    avatar_url,
    avatar,
    cover_url,
    cover,
    performance_metrics,
    performanceMetrics,
    achievements = [],
    videos = [],
    certifications = [],
    verification_level = 1,
  } = profileData;

    const effectiveFullName = full_name || name || null;
    const effectiveAvatar = avatar_url !== undefined ? avatar_url : (avatar !== undefined ? avatar : null);
    const effectiveCover = cover_url !== undefined ? cover_url : (cover !== undefined ? cover : null);
    const effectiveMetrics = performance_metrics || performanceMetrics || null;

    const queryText = `
      INSERT INTO athlete_profiles (
        user_id, sport, playing_level, skills, availability, bio,
        full_name, location, age, avatar_url, cover_url,
        performance_metrics, achievements, videos, certifications, verification_level
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (user_id) DO UPDATE SET
        sport = EXCLUDED.sport,
        playing_level = EXCLUDED.playing_level,
        skills = EXCLUDED.skills,
        availability = EXCLUDED.availability,
        bio = EXCLUDED.bio,
        full_name = COALESCE(EXCLUDED.full_name, athlete_profiles.full_name),
        location = COALESCE(EXCLUDED.location, athlete_profiles.location),
        age = COALESCE(EXCLUDED.age, athlete_profiles.age),
        avatar_url = EXCLUDED.avatar_url,
        cover_url = EXCLUDED.cover_url,
        performance_metrics = COALESCE(EXCLUDED.performance_metrics, athlete_profiles.performance_metrics),
        achievements = COALESCE(EXCLUDED.achievements, athlete_profiles.achievements),
        videos = COALESCE(EXCLUDED.videos, athlete_profiles.videos),
        certifications = COALESCE(EXCLUDED.certifications, athlete_profiles.certifications),
        verification_level = COALESCE(EXCLUDED.verification_level, athlete_profiles.verification_level),
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
  const values = [
    userId,
    sport,
    playing_level,
    Array.isArray(skills) ? skills : [],
    typeof availability === 'object' ? JSON.stringify(availability) : '{}',
    bio,
    effectiveFullName,
    location || null,
    age || null,
    effectiveAvatar,
    effectiveCover,
    effectiveMetrics,
    JSON.stringify(achievements || []),
    JSON.stringify(videos || []),
    JSON.stringify(certifications || []),
    verification_level || 1,
  ];

  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

/**
 * Creates or updates an academy profile.
 */
export const upsertAcademyProfile = async (userId, profileData) => {
  const { 
    academy_name, location, sports_offered, facilities, compensation_structure,
    tagline, logo_url, founded, primary_sports, coaches, programs, stats
  } = profileData;
  const queryText = `
    INSERT INTO academy_profiles (
      user_id, academy_name, location, sports_offered, facilities, compensation_structure,
      tagline, logo_url, founded, primary_sports, coaches, programs, stats
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    ON CONFLICT (user_id) DO UPDATE SET
      academy_name = EXCLUDED.academy_name,
      location = EXCLUDED.location,
      sports_offered = EXCLUDED.sports_offered,
      facilities = EXCLUDED.facilities,
      compensation_structure = EXCLUDED.compensation_structure,
      tagline = EXCLUDED.tagline,
      logo_url = EXCLUDED.logo_url,
      founded = EXCLUDED.founded,
      primary_sports = EXCLUDED.primary_sports,
      coaches = EXCLUDED.coaches,
      programs = EXCLUDED.programs,
      stats = EXCLUDED.stats,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  const values = [
    userId, academy_name, location, sports_offered, facilities, compensation_structure,
    tagline, logo_url, founded, primary_sports, 
    coaches ? JSON.stringify(coaches) : '[]', 
    programs ? JSON.stringify(programs) : '[]', 
    stats ? JSON.stringify(stats) : '{}'
  ];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

/**
 * Retrieves an athlete's public profile and user details by user ID.
 * @param {number|string} userId - The ID from the users table.
 */
export const getPublicAthleteProfileByUserId = async (userId) => {
  const queryText = `
    SELECT 
      u.id AS user_id,
      u.email,
      u.role,
      u.created_at AS member_since,
      ap.id AS profile_id,
      ap.full_name,
      ap.sport,
      ap.playing_level,
      ap.verification_level,
      ap.location,
      ap.age,
      ap.avatar_url,
      ap.cover_url,
      ap.performance_metrics,
      ap.skills,
      ap.achievements,
      ap.videos,
      ap.certifications,
      ap.availability,
      ap.bio,
      ap.updated_at
    FROM users u
    LEFT JOIN athlete_profiles ap ON u.id = ap.user_id
    WHERE u.id = $1 AND u.role = 'athlete';
  `;
  const { rows } = await pool.query(queryText, [userId]);
  return rows[0] || null;
};

/**
 * Retrieves all registered athletes from PostgreSQL.
 * Supports filtering by sport and search terms.
 */
export const getAllAthletes = async (filters = {}) => {
  const { sport, search } = filters;
  let queryText = `
    SELECT 
      u.id AS id,
      u.id AS user_id,
      u.email,
      COALESCE(ap.full_name, split_part(u.email, '@', 1)) AS name,
      COALESCE(ap.sport, 'Track & Field') AS sport,
      COALESCE(ap.playing_level, 'National') AS level,
      COALESCE(ap.location, 'India') AS location,
      COALESCE(ap.age, '21 Yrs') AS age,
      COALESCE(ap.avatar_url, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80') AS avatar,
      COALESCE(ap.cover_url, 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80') AS cover,
      COALESCE(ap.bio, 'Dedicated athlete striving for sports excellence.') AS bio,
      COALESCE(ap.performance_metrics, 'Personal Best: Top 5 State Rank | 12 Tournament Starts') AS performance_metrics,
      COALESCE(ap.skills, '{}') AS skills,
      COALESCE(ap.achievements, '[]') AS achievements,
      COALESCE(ap.videos, '[]') AS videos,
      COALESCE(ap.certifications, '[]') AS certifications,
      COALESCE(ap.verification_level, 1) AS verification_level,
      TRUE AS verified,
      '4.8' AS rating,
      u.created_at AS member_since
    FROM users u
    LEFT JOIN athlete_profiles ap ON u.id = ap.user_id
    WHERE u.role = 'athlete'
  `;

  const values = [];
  let paramIndex = 1;

  if (sport && sport !== 'All') {
    queryText += ` AND LOWER(ap.sport) = LOWER($${paramIndex})`;
    values.push(sport);
    paramIndex++;
  }

  if (search && search.trim()) {
    queryText += ` AND (
      LOWER(ap.full_name) LIKE LOWER($${paramIndex}) OR
      LOWER(ap.sport) LIKE LOWER($${paramIndex}) OR
      LOWER(ap.location) LIKE LOWER($${paramIndex}) OR
      LOWER(ap.playing_level) LIKE LOWER($${paramIndex}) OR
      LOWER(u.email) LIKE LOWER($${paramIndex})
    )`;
    values.push(`%${search.trim()}%`);
    paramIndex++;
  }

  queryText += ` ORDER BY u.created_at DESC;`;

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export default {
  createProfileTables,
  getAthleteProfileByUserId,
  getAcademyProfileByUserId,
  getPublicAthleteProfileByUserId,
  getAllAthletes,
  upsertAthleteProfile,
  upsertAcademyProfile,
};

