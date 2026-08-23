import pool from '../config/db.js';

/**
 * Full Database Seeder Script for Opportunities and Agreements
 * Generates 26+ rich Opportunities and 25+ realistic Applications/Agreements.
 */
async function seedFullData() {
  console.log('🌱 Starting comprehensive data seeding for Opportunities and Agreements...');

  try {
    // 1. Fetch Academy and Athlete user IDs from the database
    const academyUsersRes = await pool.query(
      "SELECT id, email FROM users WHERE role = 'academy' ORDER BY id ASC;"
    );
    const athleteUsersRes = await pool.query(
      "SELECT id, email FROM users WHERE role = 'athlete' ORDER BY id ASC;"
    );

    if (academyUsersRes.rows.length === 0 || athleteUsersRes.rows.length === 0) {
      console.error('❌ Please run `npm run seed:accounts` first to create the base users.');
      process.exit(1);
    }

    const academyIds = academyUsersRes.rows.map((r) => r.id);
    const athleteIds = athleteUsersRes.rows.map((r) => r.id);

    console.log(`Found ${academyIds.length} Academies and ${athleteIds.length} Athletes.`);

    // =========================================================================
    // 2. 26 RICH OPPORTUNITIES DATA
    // =========================================================================
    const opportunitiesData = [
      {
        acadIdx: 0, // Mumbai Stride High Performance
        title: 'SENIOR SPRINT SPARRING FELLOW',
        role: '100m / 200m Sprinter',
        sport: 'Track & Field',
        compensation_cash: 26000,
        perks: ['Olympic synthetic track access', 'Biomechanics high-speed video feedback', 'Physio & ice baths'],
        description: 'Spar with senior national championship qualifiers in sprint acceleration, turn transitions, and block start sets.',
        requirements: ['100m sub-10.9s or 200m sub-22.3s', 'Morning schedule availability (6:30 AM - 9:30 AM)', 'National meet history'],
        location: 'Mumbai, Maharashtra',
        timeline: 'Aug 15 – Oct 15, 2026',
        caption: 'Stride High Performance Center is inviting top sprint talents for our senior national preparation camp.',
        media_image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 0,
        title: 'ACADEMY FOOTBALL FORWARD / STRIKER',
        role: 'Center Forward',
        sport: 'Football',
        compensation_cash: 28000,
        perks: ['ISL scouting matches', 'Strength & conditioning coaching', 'Customized nutritional meal plans'],
        description: 'Lead the forward line in Western India regional premier division fixtures and participate in tactical team video breakdowns.',
        requirements: ['Proven goal-scoring record in state/club leagues', 'High aerobic stamina', 'Weekend match travel availability'],
        location: 'Mumbai, Maharashtra',
        timeline: 'Sep 01 – Nov 30, 2026',
        caption: 'Mumbai Stride Football Academy is scouting aggressive center forwards for the upcoming premier division campaign.',
        media_image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 1, // Delhi Cricket & Sports
        title: 'EXPRESS PACE BOWLING SPARRING TALENT',
        role: 'Fast Bowler (135+ km/h)',
        sport: 'Cricket',
        compensation_cash: 30000,
        perks: ['SG turf balls supplied', 'Speed radar gun tracking', 'Physiotherapy & recovery pool'],
        description: 'Bowl sharp 6-over spells in open nets and match simulation sessions to top-order Ranji Trophy batsmen.',
        requirements: ['Ability to consistently clock 130-135+ km/h', 'BCCI U-19 or state league match experience', 'High fitness discipline'],
        location: 'Delhi, NCR',
        timeline: 'Aug 20 – Sep 30, 2026',
        caption: 'Delhi Cricket Excellence is recruiting express fast bowlers for our pre-season Ranji preparation net sessions.',
        media_image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 1,
        title: 'JUNIOR CRICKET BATTING MENTOR',
        role: 'Batting Coach / Mentor',
        sport: 'Cricket',
        compensation_cash: 22000,
        perks: ['Evening session allowance', 'Equipment kit', 'Coaching certification sponsorship'],
        description: 'Work with U-16 and U-19 academy batsmen on spin footwork, short-ball defense, and strike rotation.',
        requirements: ['State or university cricket credentials', 'Strong communication skills', 'Evening availability (4 PM - 8 PM)'],
        location: 'Delhi, NCR',
        timeline: 'Sep 01 – Dec 01, 2026',
        caption: 'Looking for a dedicated batting coach to mentor upcoming junior cricketers at our Delhi facility.',
        media_image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 2, // Bengaluru National Athletics
        title: 'LONG JUMP & TRIPLE JUMP FELLOWSHIP',
        role: 'Jumper (Long Jump / Triple Jump)',
        sport: 'Track & Field',
        compensation_cash: 25000,
        perks: ['Force-plate jump testing', 'Nike spike shoe allowance', 'Full hostel boarding'],
        description: 'Train on velocity approaches, takeoff angles, and landing mechanics under national biomechanics specialists.',
        requirements: ['Long jump 6.30m+ (Men) / 5.50m+ (Women)', 'Under-23 age category', 'Full-time residential training'],
        location: 'Bengaluru, Karnataka',
        timeline: 'Aug 25 – Oct 25, 2026',
        caption: 'National Athletics Institute Bengaluru is enrolling horizontal jumpers for our 2026 elite residential fellowship.',
        media_image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 2,
        title: 'SWIMMING DISTANCE ENDURANCE PACER',
        role: 'Freestyle Pacer',
        sport: 'Swimming',
        compensation_cash: 24000,
        perks: ['50m heated pool pass', 'Electrolytes & nutrition supply', 'Lactate threshold testing'],
        description: 'Set target split paces (400m / 800m / 1500m) for national junior swimmers during high-volume aerobic blocks.',
        requirements: ['Competitive 400m/800m freestyle record', 'Strict pacing consistency', 'Morning training availability'],
        location: 'Bengaluru, Karnataka',
        timeline: 'Sep 01 – Nov 01, 2026',
        caption: 'Bengaluru Aquatics Center is seeking distance freestyle pacers to push our national squad.',
        media_image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 3, // Hyderabad Apex Racquet & Tennis
        title: 'BADMINTON SINGLES HIGH-TEMPO SPARRING',
        role: 'Badminton Sparring Partner',
        sport: 'Badminton',
        compensation_cash: 23000,
        perks: ['Yonex kit sponsorship', 'Free court practice hours', 'Physio care'],
        description: 'Provide intense singles sparring and multiball feeding drills for BAI national junior medal contenders.',
        requirements: ['BAI ranking or state quarter-finalist', 'High speed-endurance', 'Morning shift (6 AM - 9 AM)'],
        location: 'Hyderabad, Telangana',
        timeline: 'Aug 28 – Oct 28, 2026',
        caption: 'Apex Racquet Foundation Hyderabad is hiring sparring partners for our upcoming national ranking tournament camp.',
        media_image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 3,
        title: 'TENNIS CLAY COURT DRILL SPECIALIST',
        role: 'Tennis Assistant Coach',
        sport: 'Tennis',
        compensation_cash: 27000,
        perks: ['Red clay court access', 'Direct mentorship under ITF coaches', 'AITA tournament travel grant'],
        description: 'Run topspin baseline drill sets, feed high-rotation balls, and conduct tactical match simulation for junior players.',
        requirements: ['AITA or ITF junior tournament experience', 'Strong clay court fundamentals', 'Weekend match supervision'],
        location: 'Hyderabad, Telangana',
        timeline: 'Sep 05 – Nov 05, 2026',
        caption: 'Apex Tennis Foundation is searching for skilled clay court specialists to guide our competitive junior batch.',
        media_image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 4, // Odisha Kalinga Premier Hub
        title: 'FIELD HOCKEY TRANSITION MIDFIELDER',
        role: 'Midfielder',
        sport: 'Hockey',
        compensation_cash: 25000,
        perks: ['AstroTurf shoe grant', 'Carbon composite sticks', 'Hostel residency'],
        description: 'Orchestrate transitional counter-attacks, penalty corner injections, and defensive screening in national tier-2 league.',
        requirements: ['National championship or inter-university hockey experience', 'High aerobic capacity', 'Team leadership qualities'],
        location: 'Bhubaneswar, Odisha',
        timeline: 'Sep 01 – Dec 01, 2026',
        caption: 'Kalinga Premier Sports Hub is scouting dynamic hockey midfielders for our residential tournament roster.',
        media_image: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 4,
        title: 'BASKETBALL POINT GUARD PLAYMAKER',
        role: 'Point Guard',
        sport: 'Basketball',
        compensation_cash: 24000,
        perks: ['Sneaker sponsorship', 'Strength conditioning facility pass', 'Travel stipends'],
        description: 'Direct the fast-break offense, execute pick-and-roll plays, and manage clock tempo in state championship fixtures.',
        requirements: ['State championship experience', 'Excellent ball-handling and court vision', 'Daily evening practice commitment'],
        location: 'Bhubaneswar, Odisha',
        timeline: 'Sep 10 – Nov 10, 2026',
        caption: 'Kalinga Basketball Club is hiring a starting point guard for the upcoming All-India Invitational Tournament.',
        media_image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 0,
        title: 'FOOTBALL GOALKEEPER DEVELOPMENT TRAINEE',
        role: 'Goalkeeper',
        sport: 'Football',
        compensation_cash: 26000,
        perks: ['Goalkeeping glove sponsor', 'Reaction ball training suite', 'Match highlights video'],
        description: 'Train under UEFA goalkeeping coaches on shot-stopping, cross collection under physical pressure, and build-up distribution.',
        requirements: ['Height 5ft 11in+', 'Club/state level goalkeeping credentials', 'Weekend match availability'],
        location: 'Mumbai, Maharashtra',
        timeline: 'Aug 20 – Oct 20, 2026',
        caption: 'Stride Football Academy Mumbai is enrolling promising goalkeepers for our youth I-League team roster.',
        media_image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 1,
        title: 'TABLE TENNIS MULTIBALL FEEDER',
        role: 'Table Tennis Drill Partner',
        sport: 'Table Tennis',
        compensation_cash: 18000,
        perks: ['Stag table access', 'Rubber sponsorship', 'Tournament entry fees'],
        description: 'Conduct high-frequency multiball feeding, backhand block drills, and receive tactical coaching with state cadet squad.',
        requirements: ['District or state ranking in Table Tennis', 'Fast hand-eye reflexes', 'Evening training availability'],
        location: 'Delhi, NCR',
        timeline: 'Sep 01 – Oct 31, 2026',
        caption: 'Delhi Sports Academy is recruiting dedicated table tennis drill partners for our Junior Nationals camp.',
        media_image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 2,
        title: 'MIDDLE DISTANCE 800M/1500M TRAINING FELLOW',
        role: '800m / 1500m Runner',
        sport: 'Track & Field',
        compensation_cash: 22000,
        perks: ['Synthetic track access', 'GPS heart rate tracking loan', 'High-altitude training trip'],
        description: 'Complete structured aerobic threshold intervals, race pace simulation, and compete in all-India open athletic meets.',
        requirements: ['Sub-2:00 (800m) or Sub-4:12 (1500m) timing', 'High lactate tolerance', 'Full training discipline'],
        location: 'Bengaluru, Karnataka',
        timeline: 'Sep 15 – Nov 15, 2026',
        caption: 'National Athletics Institute is enrolling middle-distance runners for our intensive season preparation program.',
        media_image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 3,
        title: 'BADMINTON DOUBLES ROTATION ANALYST',
        role: 'Doubles Specialist',
        sport: 'Badminton',
        compensation_cash: 21000,
        perks: ['Video match analysis suite', 'Shuttlecock allowance', 'Physio support'],
        description: 'Work with men and mixed doubles pairs on rotation speed, front-court interception, and service variation.',
        requirements: ['State or national ranking in doubles', 'High badminton IQ', 'Fast reflex response'],
        location: 'Hyderabad, Telangana',
        timeline: 'Aug 25 – Oct 25, 2026',
        caption: 'Apex Racquet Foundation is seeking doubles specialists to mentor our upcoming junior pairs.',
        media_image: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 4,
        title: 'VOLLEYBALL MIDDLE BLOCKER',
        role: 'Middle Blocker',
        sport: 'Volleyball',
        compensation_cash: 20000,
        perks: ['Knee/ankle support gear', 'Gym membership', 'Match incentives'],
        description: 'Anchor the frontline defense, read opposition sets, and execute quick middle-tempo hits in regional tournament cups.',
        requirements: ['Height 6ft 1in+', 'Strong vertical jump', 'Team communication on court'],
        location: 'Bhubaneswar, Odisha',
        timeline: 'Sep 01 – Nov 01, 2026',
        caption: 'Kalinga Volleyball Wing is scouting middle blockers for the upcoming Inter-State Gold Cup.',
        media_image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 0,
        title: 'BOXING AMATEUR SPARRING PARTNER',
        role: 'Light-Welterweight Sparring',
        sport: 'Boxing',
        compensation_cash: 27000,
        perks: ['Hand wraps & 16oz sparring gloves', 'Sauna recovery access', 'Nutritional guidance'],
        description: 'Assist senior boxers with defensive slip drills, precision pad work, and controlled technical sparring rounds.',
        requirements: ['Amateur boxing record (5+ bouts)', 'Weight: 63kg - 69kg', 'Clean ring etiquette'],
        location: 'Mumbai, Maharashtra',
        timeline: 'Sep 10 – Nov 10, 2026',
        caption: 'Mumbai Combat Center is scouting sparring partners for our National Boxing Championship prep squad.',
        media_image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 1,
        title: 'CRICKET WRIST SPIN SPARRING TALENT',
        role: 'Leg-Spinner / Mystery Spinner',
        sport: 'Cricket',
        compensation_cash: 29000,
        perks: ['Match fees per fixture', 'Turf wicket practice access', 'Workload monitoring'],
        description: 'Bowl quality leg-spin, googlies, and flippers in match simulation drills and represent the academy club in premier division.',
        requirements: ['Strong wrist-spin control and revolutions', 'Ability to turn on flat wickets', 'District/State tournament experience'],
        location: 'Delhi, NCR',
        timeline: 'Aug 20 – Oct 20, 2026',
        caption: 'Delhi Cricket Hub is scouting mystery and leg-spinners for our upcoming state T20 tournament roster.',
        media_image: 'https://images.unsplash.com/photo-1593766788306-2856e05141e8?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 2,
        title: 'HIGH JUMP TECHNIQUE SPECIALIST',
        role: 'High Jumper',
        sport: 'Track & Field',
        compensation_cash: 24000,
        perks: ['Fosbury Flop biomechanics analysis', 'High jump spikes kit', 'Hostel accommodation'],
        description: 'Refine curved approach velocity, bar clearance arch, and takeoff plant dynamics with national athletic coaches.',
        requirements: ['Clearance height 1.95m+ (Men) / 1.65m+ (Women)', 'State medal credentials', 'Full training discipline'],
        location: 'Bengaluru, Karnataka',
        timeline: 'Sep 01 – Nov 01, 2026',
        caption: 'National Athletics Institute is seeking high jump prospects for our specialized field events academy.',
        media_image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 3,
        title: 'TENNIS SERVE & VOLLEY SPECIALIST',
        role: 'Tennis Sparring Partner',
        sport: 'Tennis',
        compensation_cash: 25000,
        perks: ['Plexicushion court access', 'Babolat racquet restringing allowance', 'Travel stipend'],
        description: 'Provide fast-paced serve and return practice, transition volleys, and tie-break simulation for national junior contenders.',
        requirements: ['AITA Men or U-18 circuit ranking', 'Serve speed 175+ km/h', 'Morning practice shift'],
        location: 'Hyderabad, Telangana',
        timeline: 'Sep 15 – Nov 15, 2026',
        caption: 'Apex Tennis Foundation is hiring dynamic serve-and-volley sparring partners for our tournament batch.',
        media_image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 4,
        title: 'ARCHERY RECURVE FORM SPECIALIST',
        role: 'Archery Assistant',
        sport: 'Archery',
        compensation_cash: 21000,
        perks: ['70m outdoor range access', 'Easton arrow sets', 'Bow tuning equipment'],
        description: 'Assist archers with anchor consistency, clicker timing, and bow stabilization during 70m Olympic target rounds.',
        requirements: ['Archery Association of India registered or national competitor', 'Knowledge of bow stringing and sight adjustment'],
        location: 'Bhubaneswar, Odisha',
        timeline: 'Aug 30 – Oct 30, 2026',
        caption: 'Kalinga Archery Wing is hiring assistant trainers for our cadet recurve and compound division.',
        media_image: 'https://images.unsplash.com/photo-1511067007772-9da28940e00b?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 0,
        title: 'ATHLETICS HURDLES SPEED SPECIALIST',
        role: '110m / 100m Hurdler',
        sport: 'Track & Field',
        compensation_cash: 23000,
        perks: ['Hurdle clearance video tracking', 'Speed conditioning gym pass', 'Sports massage'],
        description: 'Focus on 3-step rhythm, lead leg snap-down, and trail leg rotation in high-tempo barrier sets.',
        requirements: ['State level hurdle finals participation', 'High flexibility and coordination', 'Morning practice availability'],
        location: 'Mumbai, Maharashtra',
        timeline: 'Sep 01 – Nov 01, 2026',
        caption: 'Stride Athletics Center Mumbai is scouting hurdle prospects for our upcoming state games squad.',
        media_image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 1,
        title: 'CRICKET WICKETKEEPER-BATSMAN',
        role: 'Wicketkeeper Batsman',
        sport: 'Cricket',
        compensation_cash: 26000,
        perks: ['Kitting allowance (pads, gloves, helmet)', 'Turf net access', 'Match fee bonuses'],
        description: 'Keep against pace and spin in match simulation games and bat in top-order positions in premier club league fixtures.',
        requirements: ['Clean glovework against express pace and spin', 'Good batting form in club/district matches', 'Weekend match availability'],
        location: 'Delhi, NCR',
        timeline: 'Sep 10 – Nov 10, 2026',
        caption: 'Delhi Cricket Hub is looking for a sharp wicketkeeper-batsman to join our tournament squad.',
        media_image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 2,
        title: 'SWIMMING BUTTERFLY & MEDLEY SPECIALIST',
        role: 'Swim Trainer / Pacer',
        sport: 'Swimming',
        compensation_cash: 25000,
        perks: ['Underwater stroke video camera feedback', 'All-weather heated pool pass', 'Nutrition allowance'],
        description: 'Demonstrate undulating dolphin kick technique, high elbow pull, and pace 200m individual medley drill sets.',
        requirements: ['National or state level swimming credentials', 'Strong butterfly technique', 'CPR certification'],
        location: 'Bengaluru, Karnataka',
        timeline: 'Sep 05 – Nov 05, 2026',
        caption: 'National Aquatics Institute is hiring butterfly and IM pacers for our senior junior squad.',
        media_image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 3,
        title: 'SQUASH SPEED & LOB SPARRING PARTNER',
        role: 'Squash Sparring Partner',
        sport: 'Squash',
        compensation_cash: 22000,
        perks: ['Glass-back court access', 'Dunlop ball sets', 'Sauna and gym pass'],
        description: 'Provide high-octane squash sparring, cross-court boast drills, and length control sets for junior tournament competitors.',
        requirements: ['Squash Rackets Federation of India ranking', 'High agility and stamina', 'Evening shift availability'],
        location: 'Hyderabad, Telangana',
        timeline: 'Sep 15 – Nov 15, 2026',
        caption: 'Apex Racquet Foundation is hiring squash sparring partners for our competitive academy squad.',
        media_image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 4,
        title: 'BASKETBALL SHOOTING GUARD SHARPSHOOTER',
        role: 'Shooting Guard',
        sport: 'Basketball',
        compensation_cash: 23500,
        perks: ['Shooting gun practice machine', 'Travel expenses covered', 'Strength coach support'],
        description: 'Execute off-screen 3-point shooting, spacing perimeter offense, and transition defense in inter-club invitational tournaments.',
        requirements: ['High 3-point shooting efficiency under contest', 'State championship participation', 'Weekend tournament commitment'],
        location: 'Bhubaneswar, Odisha',
        timeline: 'Aug 25 – Oct 25, 2026',
        caption: 'Kalinga Premier Basketball Club is recruiting sharpshooters for our state league roster.',
        media_image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      },
      {
        acadIdx: 0,
        title: 'FOOTBALL DEFENSIVE ANCHOR / CENTER-BACK',
        role: 'Center-Back',
        sport: 'Football',
        compensation_cash: 27000,
        perks: ['GPS tracker vest loan', 'Physiotherapy & recovery facilities', 'Scout showcase games'],
        description: 'Anchor the central defensive line, win aerial duels, and initiate accurate long-range diagonals in regional matches.',
        requirements: ['Height 6ft 0in+', 'Excellent spatial awareness and aerial timing', 'State or elite academy background'],
        location: 'Mumbai, Maharashtra',
        timeline: 'Sep 01 – Nov 30, 2026',
        caption: 'Stride Football Academy Mumbai is scouting commanding center-backs for the upcoming regional championship.',
        media_image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80',
        status: 'active'
      }
    ];

    console.log(`\n⚡ Inserting ${opportunitiesData.length} Opportunities into PostgreSQL...`);
    const insertedOpportunityIds = [];

    for (let i = 0; i < opportunitiesData.length; i++) {
      const opp = opportunitiesData[i];
      const academyId = academyIds[opp.acadIdx % academyIds.length];

      const res = await pool.query(
        `INSERT INTO opportunities (
          academy_id, title, role, sport, compensation_cash, perks, description,
          requirements, location, timeline, caption, media_image, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id, title, academy_id;`,
        [
          academyId,
          opp.title,
          opp.role,
          opp.sport,
          opp.compensation_cash,
          opp.perks,
          opp.description,
          opp.requirements,
          opp.location,
          opp.timeline,
          opp.caption,
          opp.media_image,
          opp.status
        ]
      );

      const inserted = res.rows[0];
      insertedOpportunityIds.push(inserted);
      console.log(`  ✓ [Opp #${inserted.id}] ${inserted.title} (Academy ID: ${inserted.academy_id})`);
    }

    // =========================================================================
    // 3. 25+ AGREEMENTS / APPLICATIONS DATA
    // =========================================================================
    console.log(`\n⚡ Generating 26 Applications & Agreements linking Athletes to Opportunities...`);

    const statuses = ['pending', 'accepted', 'rejected', 'completed'];
    let agreementCount = 0;

    // Distribute applications cleanly across athletes and opportunities
    for (let i = 0; i < insertedOpportunityIds.length; i++) {
      const opp = insertedOpportunityIds[i];
      // Select 1 or 2 athletes per opportunity to get 26+ total agreements
      const athleteIdx1 = i % athleteIds.length;
      const athleteId1 = athleteIds[athleteIdx1];
      const status1 = statuses[i % statuses.length];

      try {
        await pool.query(
          `INSERT INTO agreements (opportunity_id, athlete_id, academy_id, status)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (opportunity_id, athlete_id) DO UPDATE SET status = EXCLUDED.status;`,
          [opp.id, athleteId1, opp.academy_id, status1]
        );
        agreementCount++;
        console.log(`  ✓ Application: Athlete #${athleteId1} -> Opp #${opp.id} (${status1.toUpperCase()})`);
      } catch (err) {
        // Skip on conflict
      }

      // Add a second application for some opportunities to cross 25+
      if (i < 8) {
        const athleteIdx2 = (i + 1) % athleteIds.length;
        const athleteId2 = athleteIds[athleteIdx2];
        const status2 = statuses[(i + 1) % statuses.length];

        try {
          await pool.query(
            `INSERT INTO agreements (opportunity_id, athlete_id, academy_id, status)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (opportunity_id, athlete_id) DO UPDATE SET status = EXCLUDED.status;`,
            [opp.id, athleteId2, opp.academy_id, status2]
          );
          agreementCount++;
          console.log(`  ✓ Application: Athlete #${athleteId2} -> Opp #${opp.id} (${status2.toUpperCase()})`);
        } catch (err) {
          // Skip on conflict
        }
      }
    }

    console.log(`\n🎉 Full seeding complete!`);
    console.log(`   - Opportunities created: ${insertedOpportunityIds.length}`);
    console.log(`   - Agreements / Applications created: ${agreementCount}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during full data seeding:', error);
    process.exit(1);
  }
}

seedFullData();
