const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Import your app
const User = require('../models/User');

// Random email to avoid "User already exists" errors
const randomEmail = `testuser${Math.floor(Math.random() * 10000)}@example.com`;
let token = '';

describe('Backend API Tests', () => {
  
  // Clean up before starting (optional, but good practice)
  beforeAll(async () => {
    // Wait for DB connection if needed
  });

  // Test 1: Signup a new user 
  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        fullName: 'Test User',
        email: randomEmail,
        password: 'password123',
        confirmPassword: 'password123' 
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Test 2: Login with valid credentials 
  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: randomEmail,
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; // Save token for next tests
  });

  // Test 3: Login with invalid password 
  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: randomEmail,
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(400);
  });

// Test 4: Access protected route without token
  it('should deny access to protected route without token', async () => {
    // We use /api/auth/user because that is the actual protected route we built
    const res = await request(app).get('/api/auth/user'); 
    expect(res.statusCode).toEqual(401); // Unauthorized
  });

  // Test 5: Access protected route WITH token 
  it('should access protected route with token', async () => {
    const res = await request(app)
      .put('/api/users/profile')
      .set('x-auth-token', token)
      .send({ fullName: 'Updated Name' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.fullName).toEqual('Updated Name');
  });

  // Close DB connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });
});