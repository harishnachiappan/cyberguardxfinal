// Test Authentication System
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAuth() {
  console.log('🧪 Testing CyberGuardX Authentication System...\n');

  try {
    // Test 1: Register a new user
    console.log('1️⃣ Testing Registration...');
    const registerData = {
      username: 'Test User',
      email: 'test@example.com',
      password: 'test123',
      role: 'user'
    };

    const registerResponse = await axios.post(`${API_BASE}/auth/register`, registerData);
    console.log('✅ Registration successful:', registerResponse.data);

    // Test 2: Login with registered user
    console.log('\n2️⃣ Testing Login with registered user...');
    const loginData = {
      username: 'test@example.com',
      password: 'test123'
    };

    const loginResponse = await axios.post(`${API_BASE}/auth/login`, loginData);
    console.log('✅ Login successful:', loginResponse.data);

    // Test 3: Try invalid credentials
    console.log('\n3️⃣ Testing invalid credentials...');
    try {
      await axios.post(`${API_BASE}/auth/login`, {
        username: 'test@example.com',
        password: 'wrongpassword'
      });
    } catch (error) {
      console.log('✅ Invalid credentials rejected:', error.response.data);
    }

    // Test 4: View all registered users
    console.log('\n4️⃣ Viewing registered users...');
    const usersResponse = await axios.get(`${API_BASE}/auth/users`);
    console.log('✅ Registered users:', usersResponse.data);

    console.log('\n🎉 All authentication tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests if backend is running
testAuth();