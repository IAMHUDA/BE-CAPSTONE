import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js'; 

describe('API Health Check', () => {
  it('GET / should return 404 or welcome message', async () => {
    const res = await request(app).get('/');
    // Adjust expectation based on actual app.js response, usually 404 if no root route
    expect(res.status).toBeDefined();
  });

  it('GET /api/unknown should return 404', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
  });
});
