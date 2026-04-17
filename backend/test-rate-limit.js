const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testRateLimit() {
  console.log('🧪 Testing Rate Limiting\n');
  
  try {
    // Test 1: Global /api rate limit
    console.log('📌 Test 1: Making 5 rapid requests to /api/dashboard...');
    for (let i = 1; i <= 5; i++) {
      try {
        const response = await axios.get(`${BASE_URL}/dashboard`);
        console.log(`✅ Request ${i}: Status ${response.status}`);
      } catch (error) {
        if (error.response) {
          console.log(`❌ Request ${i}: Blocked - ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else {
          console.log(`❌ Request ${i}: Error - ${error.message}`);
        }
      }
    }

    // Test 2: Test limit route
    console.log('\n📌 Test 2: Testing /test-limit (2 requests per 10s)...');
    for (let i = 1; i <= 4; i++) {
      try {
        const response = await axios.get('http://localhost:5000/test-limit');
        console.log(`✅ Test Request ${i}: ${response.data.message}`);
      } catch (error) {
        if (error.response) {
          console.log(`❌ Test Request ${i}: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else {
          console.log(`❌ Test Request ${i}: ${error.message}`);
        }
      }
    }

    console.log('\n✅ Testing complete!');
  } catch (error) {
    console.error('Test error:', error.message);
  }
}

testRateLimit();
