import bcrypt from 'bcrypt';
import pool from '../config/db.js';

/**
 * Standalone Account Seeder Script
 * Creates 5 realistic Athlete accounts + profiles and 5 realistic Academy accounts + profiles.
 */
async function seedAccounts() {
  console.log('🌱 Starting account seeding for Stride...');

  try {
    const passwordPlain = 'Password@123';
    const passwordHash = await bcrypt.hash(passwordPlain, 10);

    // =========================================================================
    // 1. ATHLETE ACCOUNTS DATA
    // =========================================================================
    const athleteAccounts = [
      {
        email: 'aryan.kulkarni@stride.com',
        full_name: 'Aryan Kulkarni',
        sport: 'Track & Field',
        playing_level: 'National',
        location: 'Bengaluru, KA',
        age: '21 Yrs',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        cover_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
        bio: 'Dedicated U-23 national level sprinter specialized in 100m and 200m events. Training with a focus on biomechanical speed development and championship qualifications.',
        performance_metrics: '100m PB: 10.42s | 200m PB: 21.15s | State Ranking: #3 Overall | National Trials: 18 Events',
        skills: ['Block Starts', 'Max Velocity Mechanics', 'Curve Acceleration'],
        achievements: [
          { title: 'Gold Medalist - Karnataka State Senior Athletics Championship 2025', date: 'Dec 2025' },
          { title: 'Finalist - Khelo India University Games 100m Sprint', date: 'Oct 2025' },
          { title: 'Bronze Medalist - South Zone Athletics 200m', date: 'Aug 2025' }
        ],
        certifications: [
          { name: 'Sports Authority of India (SAI) Verified Athlete ID: SAI-2025-9921', status: 'Verified' },
          { name: 'NADA Anti-Doping Clearance Certificate 2026', status: 'Cleared' }
        ],
        verification_level: 2
      },
      {
        email: 'arjun.singh@stride.com',
        full_name: 'Arjun Singh',
        sport: 'Football',
        playing_level: 'Professional',
        location: 'Mumbai, MH',
        age: '23 Yrs',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        cover_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
        bio: 'Dynamic central midfielder with high passing vision and tempo control. Former youth academy captain with senior state league starts.',
        performance_metrics: 'Pass Accuracy: 88% | Top Sprint Speed: 32.4 km/h | 45 Competitive Matches Started',
        skills: ['Playmaking', 'Through-Balls', 'High Press Recovery'],
        achievements: [
          { title: 'Champions - Mumbai District Premier Football League 2025', date: 'Nov 2025' },
          { title: 'Best Midfielder Award - Western India Inter-Club Cup', date: 'Aug 2025' }
        ],
        certifications: [
          { name: 'AIFF Registered Player Certificate 2026', status: 'Active' }
        ],
        verification_level: 3
      },
      {
        email: 'riya.sharma@stride.com',
        full_name: 'Riya Sharma',
        sport: 'Track & Field',
        playing_level: 'National',
        location: 'Pune, MH',
        age: '22 Yrs',
        avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
        cover_url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&auto=format&fit=crop&q=80',
        bio: 'Long jump and 100m hurdles specialist with explosive take-off power. State record holder preparing for senior national qualifiers.',
        performance_metrics: 'Long Jump PB: 6.38m | 100m Hurdles: 13.82s | National Ranking: #4 Senior',
        skills: ['Approach Velocity', 'Board Take-off', 'Hurdle Clearance Technique'],
        achievements: [
          { title: 'Silver Medalist - All India Inter-University Athletics 2025', date: 'Jan 2026' },
          { title: 'Gold Medalist - Maharashtra State Open Meet', date: 'Sep 2025' }
        ],
        certifications: [
          { name: 'AFI Federation License 2026', status: 'Active' }
        ],
        verification_level: 2
      },
      {
        email: 'kabir.mehta@stride.com',
        full_name: 'Kabir Mehta',
        sport: 'Cricket',
        playing_level: 'State',
        location: 'Delhi, NCR',
        age: '22 Yrs',
        avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
        cover_url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&auto=format&fit=crop&q=80',
        bio: 'Express left-arm pace bowler and explosive lower-order batsman. Represented Delhi U-19 and North Zone University teams.',
        performance_metrics: 'Peak Bowling Speed: 136 km/h | Economy: 4.85 | Batting Strike Rate: 144.2',
        skills: ['Inswing Yorker', 'Bouncer Control', 'Death Overs Power Hitting'],
        achievements: [
          { title: '5-Wicket Haul - DDCA Premier League Quarter Final', date: 'Dec 2025' },
          { title: 'Man of the Series - North Zone Inter-University Trophy', date: 'May 2025' }
        ],
        certifications: [
          { name: 'BCCI State Association Player Registration ID', status: 'Verified' }
        ],
        verification_level: 2
      },
      {
        email: 'ananya.patil@stride.com',
        full_name: 'Ananya Patil',
        sport: 'Badminton',
        playing_level: 'National',
        location: 'Hyderabad, TS',
        age: '20 Yrs',
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
        cover_url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&auto=format&fit=crop&q=80',
        bio: 'Aggressive badminton singles player with sharp net-kill reflexes and cross-court jump smashes. BAI senior ranking tournament contender.',
        performance_metrics: 'BAI Senior Rank: #24 | Smash Speed: 292 km/h | 14 National Ranking Matches Won',
        skills: ['Fast Drop Shots', 'Net Interception', 'Footwork Agility'],
        achievements: [
          { title: 'Quarter-Finalist - All India Senior Ranking Badminton 2025', date: 'Nov 2025' },
          { title: 'Gold Medalist - Telangana State Senior Championship', date: 'Aug 2025' }
        ],
        certifications: [
          { name: 'BAI National Player Registration Card', status: 'Active' }
        ],
        verification_level: 3
      }
    ];

    console.log('⚡ Inserting 5 Athlete Accounts...');
    for (const ath of athleteAccounts) {
      // 1. Upsert User
      const userRes = await pool.query(
        `INSERT INTO users (email, password_hash, role)
         VALUES ($1, $2, 'athlete')
         ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'athlete'
         RETURNING id;`,
        [ath.email, passwordHash]
      );
      const userId = userRes.rows[0].id;

      // 2. Upsert Athlete Profile
      await pool.query(
        `INSERT INTO athlete_profiles (
          user_id, full_name, sport, playing_level, location, age, avatar_url, cover_url,
          bio, performance_metrics, skills, achievements, certifications, verification_level
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (user_id) DO UPDATE SET
          full_name = EXCLUDED.full_name,
          sport = EXCLUDED.sport,
          playing_level = EXCLUDED.playing_level,
          location = EXCLUDED.location,
          age = EXCLUDED.age,
          avatar_url = EXCLUDED.avatar_url,
          cover_url = EXCLUDED.cover_url,
          bio = EXCLUDED.bio,
          performance_metrics = EXCLUDED.performance_metrics,
          skills = EXCLUDED.skills,
          achievements = EXCLUDED.achievements,
          certifications = EXCLUDED.certifications,
          verification_level = EXCLUDED.verification_level,
          updated_at = CURRENT_TIMESTAMP;`,
        [
          userId,
          ath.full_name,
          ath.sport,
          ath.playing_level,
          ath.location,
          ath.age,
          ath.avatar_url,
          ath.cover_url,
          ath.bio,
          ath.performance_metrics,
          ath.skills,
          JSON.stringify(ath.achievements),
          JSON.stringify(ath.certifications),
          ath.verification_level
        ]
      );
      console.log(`  ✓ Athlete seeded: ${ath.full_name} (${ath.email})`);
    }

    // =========================================================================
    // 2. ACADEMY ACCOUNTS DATA
    // =========================================================================
    const academyAccounts = [
      {
        email: 'mumbai.academy@stride.com',
        academy_name: 'Stride High Performance Center',
        location: 'Mumbai, Maharashtra',
        sports_offered: ['Football', 'Track & Field', 'Tennis'],
        facilities: 'Olympic 8-Lane Synthetic Track, 4 FIFA-Standard Turf Pitches, High-Speed Biomechanics Video Lab, Cryotherapy Recovery Pool',
        compensation_structure: { monthly_stipend_range: '₹18,000 - ₹35,000', benefits: ['Accommodation', 'Nutritional Meals', 'Physiotherapy'] }
      },
      {
        email: 'delhi.academy@stride.com',
        academy_name: 'Delhi Cricket & Sports Excellence',
        location: 'Delhi, NCR',
        sports_offered: ['Cricket', 'Badminton', 'Table Tennis'],
        facilities: '8 Turf Practice Nets, Automated Speed Gun & Bowling Machines, All-Weather Indoor Pavilion, Strength Conditioning Gym',
        compensation_structure: { monthly_stipend_range: '₹15,000 - ₹30,000', benefits: ['Equipment Kits', 'Match Fees', 'Physio Support'] }
      },
      {
        email: 'bengaluru.academy@stride.com',
        academy_name: 'National Athletics & Track Institute',
        location: 'Bengaluru, Karnataka',
        sports_offered: ['Track & Field', 'Swimming', 'Gymnastics'],
        facilities: '400m All-Weather Synthetic Track, 50m Heated Olympic Pool, Force Plate Jump Analysis, Sports Nutrition Center',
        compensation_structure: { monthly_stipend_range: '₹20,000 - ₹40,000', benefits: ['Full Scholarship', 'Sports Gear Allowance', 'Medical Cover'] }
      },
      {
        email: 'hyderabad.academy@stride.com',
        academy_name: 'Apex Racquet & Tennis Foundation',
        location: 'Hyderabad, Telangana',
        sports_offered: ['Tennis', 'Badminton', 'Squash'],
        facilities: '6 Plexicushion Hard Courts, 2 Imported Red Clay Courts, High-Speed Video Analysis Suite, Recovery Sauna',
        compensation_structure: { monthly_stipend_range: '₹16,000 - ₹32,000', benefits: ['Tournament Grants', 'Gear Discounts', 'Pro Coaching'] }
      },
      {
        email: 'odisha.academy@stride.com',
        academy_name: 'Kalinga Premier Sports Hub',
        location: 'Bhubaneswar, Odisha',
        sports_offered: ['Hockey', 'Football', 'Basketball'],
        facilities: 'International AstroTurf Hockey Stadium, Floodlit Football Arena, Indoor Wooden Basketball Court, Athlete Hostel',
        compensation_structure: { monthly_stipend_range: '₹18,000 - ₹36,000', benefits: ['Hostel Residency', 'Nutritional Dining', 'National Visibility'] }
      }
    ];

    console.log('\n⚡ Inserting 5 Academy Accounts...');
    for (const acad of academyAccounts) {
      // 1. Upsert User
      const userRes = await pool.query(
        `INSERT INTO users (email, password_hash, role)
         VALUES ($1, $2, 'academy')
         ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'academy'
         RETURNING id;`,
        [acad.email, passwordHash]
      );
      const userId = userRes.rows[0].id;

      // 2. Upsert Academy Profile
      await pool.query(
        `INSERT INTO academy_profiles (
          user_id, academy_name, location, sports_offered, facilities, compensation_structure
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id) DO UPDATE SET
          academy_name = EXCLUDED.academy_name,
          location = EXCLUDED.location,
          sports_offered = EXCLUDED.sports_offered,
          facilities = EXCLUDED.facilities,
          compensation_structure = EXCLUDED.compensation_structure,
          updated_at = CURRENT_TIMESTAMP;`,
        [
          userId,
          acad.academy_name,
          acad.location,
          acad.sports_offered,
          acad.facilities,
          JSON.stringify(acad.compensation_structure)
        ]
      );
      console.log(`  ✓ Academy seeded: ${acad.academy_name} (${acad.email})`);
    }

    console.log('\n🎉 Successfully seeded all 10 user accounts (5 Athletes + 5 Academies)!');
    console.log('🔑 Login credentials:');
    console.log('   Password for all accounts: Password@123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during account seeding:', error);
    process.exit(1);
  }
}

seedAccounts();
