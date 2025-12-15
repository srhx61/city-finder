import request from 'supertest';
import app from '../src/index';
import { initializeDatabase, getDatabase } from '../src/database';

describe('City API E2E Tests', () => {
  beforeAll(async () => {
    // Initialize database before running tests
    await initializeDatabase();
  });

  describe('POST /city', () => {
    it('should return city information for New York', async () => {
      const response = await request(app)
        .post('/city')
        .send({ name: 'New York' })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toMatchObject({
        name: 'New York',
        country: 'USA',
        population: 8336817,
      });
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('description');
      expect(response.body.data).toHaveProperty('coordinates');
      expect(response.body.data.coordinates).toMatchObject({
        latitude: 40.7128,
        longitude: -74.0060,
      });
      expect(response.body.data).toHaveProperty('created_at');
    });

    it('should return city information for London', async () => {
      const response = await request(app)
        .post('/city')
        .send({ name: 'London' })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toMatchObject({
        name: 'London',
        country: 'United Kingdom',
        population: 8982000,
      });
      expect(response.body.data.coordinates).toMatchObject({
        latitude: 51.5074,
        longitude: -0.1278,
      });
    });

    it('should return city information for Tokyo', async () => {
      const response = await request(app)
        .post('/city')
        .send({ name: 'Tokyo' })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toMatchObject({
        name: 'Tokyo',
        country: 'Japan',
        population: 13960000,
      });
      expect(response.body.data.coordinates).toMatchObject({
        latitude: 35.6762,
        longitude: 139.6503,
      });
    });

    it('should return city information for Paris', async () => {
      const response = await request(app)
        .post('/city')
        .send({ name: 'Paris' })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toMatchObject({
        name: 'Paris',
        country: 'France',
        population: 2161000,
      });
      expect(response.body.data.coordinates).toMatchObject({
        latitude: 48.8566,
        longitude: 2.3522,
      });
    });

    it('should return city information for Sydney', async () => {
      const response = await request(app)
        .post('/city')
        .send({ name: 'Sydney' })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toMatchObject({
        name: 'Sydney',
        country: 'Australia',
        population: 5312000,
      });
      expect(response.body.data.coordinates).toMatchObject({
        latitude: -33.8688,
        longitude: 151.2093,
      });
    });

    it('should be case-insensitive when searching for cities', async () => {
      const response = await request(app)
        .post('/city')
        .send({ name: 'new york' })
        .expect(200);

      expect(response.body.data.name).toBe('New York');
    });

    it('should handle city names with extra whitespace', async () => {
      const response = await request(app)
        .post('/city')
        .send({ name: '  London  ' })
        .expect(200);

      expect(response.body.data.name).toBe('London');
    });

    it('should return 404 for non-existent city', async () => {
      const response = await request(app)
        .post('/city')
        .send({ name: 'UnknownCity' })
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('not found');
    });

    it('should return 400 when city name is missing', async () => {
      const response = await request(app)
        .post('/city')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('required');
    });

    it('should return 400 when city name is not a string', async () => {
      const response = await request(app)
        .post('/city')
        .send({ name: 123 })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('string');
    });
  });

  describe('GET /health', () => {
    it('should return health check status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'ok',
        message: 'City Finder API is running',
      });
    });
  });
});



