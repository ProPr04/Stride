import request from 'supertest';
import app from '../app.js';
import pool from '../config/db.js';
import userModel from '../models/userModel.js';
import opportunityModel from '../models/opportunityModel.js';
import { generateToken } from '../utils/tokenUtils.js';

describe('Phase 3: Opportunities & Matching Engine', () => {
  let academyToken;
  let athleteToken;

  beforeAll(async () => {
    // 1. Ensure all necessary tables exist
    await userModel.createUsersTable();
    await opportunityModel.createOpportunityTable();

    // 2. Seed test users
    const academyUser = await userModel.createUser({
      email: `academy_opps_${Date.now()}@test.com`,
      passwordHash: 'hashedpass',
      role: 'academy'
    });

    const athleteUser = await userModel.createUser({
      email: `athlete_opps_${Date.now()}@test.com`,
      passwordHash: 'hashedpass',
      role: 'athlete'
    });

    // 3. Generate Auth Tokens
    academyToken = generateToken(academyUser.id, academyUser.role);
    athleteToken = generateToken(athleteUser.id, athleteUser.role);
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /api/opportunities (Academy Only)', () => {
    it('should successfully create an opportunity when cash compensation is provided', async () => {
      const opportunityData = {
        title: 'Tennis Sparring Partner',
        role: 'Sparring',
        sport: 'Tennis',
        compensation_cash: 50.00,
        perks: ['Free Court Access', 'Pro Coaching']
      };

      const res = await request(app)
        .post('/api/opportunities')
        .set('Authorization', `Bearer ${academyToken}`)
        .send(opportunityData);

      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data.opportunity.title).toBe('Tennis Sparring Partner');
      expect(Number(res.body.data.opportunity.compensation_cash)).toBe(50);
    });

    it('should reject an opportunity if cash compensation is zero (no exposure-only gigs)', async () => {
      const exposureGig = {
        title: 'Camp Assistant',
        role: 'Assistant',
        sport: 'Basketball',
        compensation_cash: 0, 
        perks: ['Great Exposure']
      };

      const res = await request(app)
        .post('/api/opportunities')
        .set('Authorization', `Bearer ${academyToken}`)
        .send(exposureGig);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/Compensation must be greater than zero/);
    });

    it('should forbid an athlete from posting an opportunity', async () => {
      const res = await request(app)
        .post('/api/opportunities')
        .set('Authorization', `Bearer ${athleteToken}`)
        .send({
          title: 'I want to work',
          role: 'Coach',
          sport: 'Tennis',
          compensation_cash: 20,
          perks: ['None']
        });

      expect(res.statusCode).toEqual(403);
      expect(res.body.message).toMatch(/You do not have permission/);
    });
  });

  describe('GET /api/opportunities (Discovery Feed)', () => {
    it('should retrieve a list of active opportunities without filters', async () => {
      const res = await request(app)
        .get('/api/opportunities')
        .set('Authorization', `Bearer ${athleteToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data.opportunities)).toBe(true);
      expect(res.body.data.opportunities.length).toBeGreaterThan(0);
    });

    it('should correctly apply faceted filters (e.g., sport=Tennis)', async () => {
      const res = await request(app)
        .get('/api/opportunities?sport=Tennis')
        .set('Authorization', `Bearer ${athleteToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.opportunities[0].sport).toBe('Tennis');
    });
  });
});