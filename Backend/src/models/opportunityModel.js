import pool from '../config/db.js';

/**
 * Initializes the opportunities table in PostgreSQL.
 * Links to the academy (user_id) posting the role.
 */
export const createOpportunityTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS opportunities (
      id SERIAL PRIMARY KEY,
      academy_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      role VARCHAR(100) NOT NULL,
      sport VARCHAR(100) NOT NULL,
      compensation_cash DECIMAL NOT NULL CHECK (compensation_cash > 0),
      perks TEXT[] DEFAULT '{}',
      description TEXT,
      requirements TEXT[] DEFAULT '{}',
      location VARCHAR(255),
      timeline VARCHAR(100),
      caption TEXT,
      media_image TEXT,
      status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'closed')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Ensure backward compatibility if table already exists
    ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS description TEXT;
    ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS requirements TEXT[] DEFAULT '{}';
    ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS location VARCHAR(255);
    ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS timeline VARCHAR(100);
    ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS caption TEXT;
    ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS media_image TEXT;
  `;
  await pool.query(queryText);
  await seedSampleOpportunitiesIfEmpty();
};

/**
 * Seeds sample opportunities if the table is currently empty.
 */
export const seedSampleOpportunitiesIfEmpty = async () => {
  try {
    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM opportunities;');
    if (rows[0].count === 0) {
      const sampleQuery = `
        INSERT INTO opportunities (
          title, role, sport, compensation_cash, perks, description, requirements,
          location, timeline, caption, media_image, status
        ) VALUES
        (
          'ASSISTANT CRICKET COACH',
          'Assistant Cricket Coach',
          'Cricket',
          15000,
          ARRAY['Evening shifts', 'Match day travel allowance', 'Equipment kit'],
          'Support academy training sessions and assist senior coaches during trial matches, tactical video breakdowns, and player fitness tracking.',
          ARRAY['Cricket playing experience', 'Intermediate playing level', 'Evening availability'],
          'Delhi',
          'Active for 30 Days',
          'We are expanding our coaching department at Delhi Sports Academy. Looking for a passionate Assistant Cricket Coach to guide our squad for the state championship with evening availability and tournament travel support.',
          'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80',
          'active'
        ),
        (
          'JUNIOR TRACK & FIELD SPRINT FELLOWSHIP',
          'Track Athlete (100m / 200m)',
          'Track & Field',
          25000,
          ARRAY['Full gear allowance', 'Biomechanical testing', 'Physio support'],
          'Complete daily sprint drills, bi-weekly time trials, and represent the academy in national meets.',
          ARRAY['Under-23 age category', 'State or National level participation history', 'Full-time training commitment'],
          'Bengaluru, KA',
          'Active for 30 Days',
          'Applications are OPEN for the 2026 Sprint Fellowship! Full gear allowance, biomechanical analysis, high performance track testing, and monthly stipends for top sprinters in Bengaluru.',
          'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000&auto=format&fit=crop&q=80',
          'active'
        ),
        (
          'ACADEMY FOOTBALL FORWARD TRAINEE',
          'Forward / Striker',
          'Football',
          20000,
          ARRAY['Match highlights video', 'Strength conditioning', 'ISL scout visibility'],
          'Participate in league fixtures, tactical team breakdowns, and conditioning sessions.',
          ARRAY['Competitive club background', 'High physical endurance', 'Weekend match availability'],
          'Mumbai, MH',
          'Active for 30 Days',
          'Premier Football Hub in Mumbai is scouting forward players for the upcoming regional championship. Match film highlights, professional strength conditioning, and ISL scout visibility included.',
          'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80',
          'active'
        ),
        (
          'YOUTH TENNIS ASSISTANT TRAINER',
          'Tennis Assistant Trainer',
          'Tennis',
          18000,
          ARRAY['Clay court access', 'Direct mentorship', 'Coaching certification support'],
          'Conduct junior academy warm-ups, feed balls during drill sets, and log player performance.',
          ARRAY['Competitive junior tennis background', 'Good communication skills', 'Weekend morning availability'],
          'Hyderabad, TS',
          'Active for 30 Days',
          'Join Apex Tennis Foundation in Hyderabad as an Assistant Trainer. Ideal for competitive players seeking coaching credentials, clay court access, and direct mentorship.',
          'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1000&auto=format&fit=crop&q=80',
          'active'
        );
      `;
      await pool.query(sampleQuery);
      console.log('🌱 Seeded sample opportunities for discovery feed.');
    }
  } catch (err) {
    console.warn('Sample opportunities seeding notice:', err.message);
  }
};

/**
 * Creates a new active opportunity posted by an academy.
 */
export const createOpportunity = async (academyId, opportunityData) => {
  const {
    title,
    role,
    sport,
    compensation_cash,
    perks = [],
    description,
    requirements = [],
    location,
    timeline,
    caption,
    media_image,
    status = 'active',
  } = opportunityData;

  const queryText = `
    INSERT INTO opportunities (
      academy_id, title, role, sport, compensation_cash, perks,
      description, requirements, location, timeline, caption, media_image, status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *;
  `;
  const values = [
    academyId,
    title,
    role,
    sport,
    compensation_cash,
    perks,
    description || null,
    requirements,
    location || null,
    timeline || null,
    caption || null,
    media_image || null,
    status || 'active',
  ];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};


/**
 * Retrieves a list of active opportunities, with optional filtering for the athlete discovery feed.
 * Joins academy profile details so athletes can see the academy's name and location.
 */
export const getActiveOpportunities = async (filters = {}) => {
  let queryText = `
    SELECT 
      o.*,
      COALESCE(ap.academy_name, 'Partner Academy') AS academy_name,
      COALESCE(o.location, ap.location, 'India') AS display_location,
      ap.location AS academy_location,
      ap.facilities AS academy_facilities
    FROM opportunities o
    LEFT JOIN academy_profiles ap ON o.academy_id = ap.user_id
    WHERE o.status = 'active'
  `;
  const values = [];
  let queryIndex = 1;

  // Apply faceted filters if provided
  if (filters.sport && filters.sport !== 'All') {
    queryText += ` AND o.sport ILIKE $${queryIndex}`;
    values.push(`%${filters.sport}%`);
    queryIndex++;
  }

  if (filters.role) {
    queryText += ` AND o.role ILIKE $${queryIndex}`;
    values.push(`%${filters.role}%`);
    queryIndex++;
  }

  if (filters.search) {
    queryText += ` AND (o.title ILIKE $${queryIndex} OR o.role ILIKE $${queryIndex} OR o.sport ILIKE $${queryIndex} OR COALESCE(o.caption, '') ILIKE $${queryIndex} OR COALESCE(ap.academy_name, '') ILIKE $${queryIndex})`;
    values.push(`%${filters.search}%`);
    queryIndex++;
  }

  queryText += ` ORDER BY o.created_at DESC;`;
  const { rows } = await pool.query(queryText, values);
  return rows;
};

/**
 * Retrieves all opportunities posted by a specific academy, along with the count of received applications.
 */
export const getOpportunitiesByAcademy = async (academyId) => {
  const numericAcademyId = parseInt(academyId, 10);
  if (!numericAcademyId || isNaN(numericAcademyId)) {
    return [];
  }

  const queryText = `
    SELECT 
      o.*,
      COUNT(a.id)::INTEGER AS applications_count
    FROM opportunities o
    LEFT JOIN agreements a ON o.id = a.opportunity_id
    WHERE o.academy_id = $1
    GROUP BY o.id
    ORDER BY o.created_at DESC;
  `;
  const { rows } = await pool.query(queryText, [numericAcademyId]);
  return rows;
};

/**
 * Updates the status of an opportunity (e.g., active -> closed).
 */
export const updateOpportunityStatus = async (opportunityId, academyId, status) => {
  const queryText = `
    UPDATE opportunities
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND academy_id = $3
    RETURNING *;
  `;
  const { rows } = await pool.query(queryText, [status, opportunityId, academyId]);
  return rows[0] || null;
};

/**
 * Updates an existing opportunity's fields.
 */
export const updateOpportunity = async (opportunityId, academyId, data) => {
  const fields = [];
  const values = [];
  let paramIndex = 1;

  // We map frontend keys to DB columns
  const fieldMapping = {
    title: 'title',
    role: 'role',
    sport: 'sport',
    compensation_cash: 'compensation_cash',
    perks: 'perks',
    description: 'description',
    requirements: 'requirements',
    location: 'location',
    timeline: 'timeline',
    caption: 'caption',
    media_image: 'media_image',
    status: 'status',
  };

  for (const [key, value] of Object.entries(data)) {
    if (fieldMapping[key] !== undefined && value !== undefined) {
      // Normalize closed vs active if needed
      let finalVal = value;
      if (key === 'status') {
         finalVal = (value === 'Draft' || value === 'closed') ? 'closed' : 'active';
      }
      if (key === 'requirements' || key === 'perks') {
         finalVal = Array.isArray(value) ? value : typeof value === 'string' ? value.split(',').map(s=>s.trim()).filter(Boolean) : [];
      }

      fields.push(`${fieldMapping[key]} = $${paramIndex}`);
      values.push(finalVal);
      paramIndex++;
    }
  }

  if (fields.length === 0) return null;

  fields.push(`updated_at = CURRENT_TIMESTAMP`);

  const queryText = `
    UPDATE opportunities
    SET ${fields.join(', ')}
    WHERE id = $${paramIndex} AND academy_id = $${paramIndex + 1}
    RETURNING *;
  `;
  
  values.push(opportunityId, academyId);

  const { rows } = await pool.query(queryText, values);
  return rows[0] || null;
};

export default {
  createOpportunityTable,
  createOpportunity,
  getActiveOpportunities,
  getOpportunitiesByAcademy,
  updateOpportunityStatus,
  updateOpportunity,
  seedSampleOpportunitiesIfEmpty,
};
