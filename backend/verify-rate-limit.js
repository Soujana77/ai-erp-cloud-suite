/**
 * Rate Limiting Verification Script
 * Tests both global /api limiter and /test-limit route
 */

const BASE_URL = 'http://localhost:5000';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testGlobalAPILimit() {
  console.log('\n========================================');
  console.log('TEST 1: Global /api Rate Limit (100 req/10s)');
  console.log('========================================\n');

  const successRequests = [];
  const failedRequests = [];

  console.log('Making 105 rapid requests to /api/dashboard...\n');

  for (let i = 1; i <= 105; i++) {
    try {
      const response = await fetch(`${BASE_URL}/api/dashboard`);
      const data = await response.json();
      
      if (response.ok) {
        successRequests.push(i);
        if (i <= 3) console.log(`✅ Request ${i}: ${response.status} - success`);
      } else {
        failedRequests.push({ request: i, status: response.status, data });
        if (i <= 3) console.log(`❌ Request ${i}: ${response.status} - ${JSON.stringify(data)}`);
      }
    } catch (error) {
      failedRequests.push({ request: i, error: error.message });
      if (i <= 3) console.log(`❌ Request ${i}: Error - ${error.message}`);
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`   Successful: ${successRequests.length}`);
  console.log(`   Blocked:    ${failedRequests.length}`);

  if (failedRequests.length > 0) {
    console.log(`\n🔍 First blocked response:`);
    console.log(`   ${JSON.stringify(failedRequests[0], null, 2)}`);
  }

  return { success: successRequests.length, failed: failedRequests.length };
}

async function testDedicatedLimitRoute() {
  console.log('\n========================================');
  console.log('TEST 2: /test-limit Route (2 req/10s)');
  console.log('========================================\n');

  const successRequests = [];
  const failedRequests = [];

  console.log('Making 5 rapid requests to /test-limit...\n');

  for (let i = 1; i <= 5; i++) {
    try {
      const response = await fetch(`${BASE_URL}/test-limit`);
      const data = await response.json();
      
      if (response.ok) {
        successRequests.push(i);
        console.log(`✅ Request ${i}: ${response.status} - ${JSON.stringify(data)}`);
      } else {
        failedRequests.push({ request: i, status: response.status, data });
        console.log(`❌ Request ${i}: ${response.status} - ${JSON.stringify(data)}`);
      }
    } catch (error) {
      failedRequests.push({ request: i, error: error.message });
      console.log(`❌ Request ${i}: Error - ${error.message}`);
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`   Successful: ${successRequests.length}`);
  console.log(`   Blocked:    ${failedRequests.length}`);

  return { success: successRequests.length, failed: failedRequests.length };
}

async function runTests() {
  console.log('🧪 Rate Limiting Verification');
  console.log('=============================');

  // Wait a moment for server to be ready if needed
  await delay(1000);

  // Test 1: Global API limiter
  const test1Results = await testGlobalAPILimit();

  // Small delay between tests
  await delay(2000);

  // Test 2: Dedicated test limit route
  const test2Results = await testDedicatedLimitRoute();

  // Summary
  console.log('\n========================================');
  console.log('📋 FINAL SUMMARY');
  console.log('========================================');
  console.log(`Global /api limiter:  ${test1Results.failed > 0 ? '✅ WORKING' : '❌ NOT BLOCKING'} (${test1Results.success} OK, ${test1Results.failed} blocked)`);
  console.log(`Test route limiter:   ${test2Results.failed > 0 ? '✅ WORKING' : '❌ NOT BLOCKING'} (${test2Results.success} OK, ${test2Results.failed} blocked)`);
  
  const allPassed = test1Results.failed > 0 && test2Results.failed > 0;
  console.log(`\n🎯 Overall: ${allPassed ? '✅ ALL LIMITERS FUNCTIONAL' : '❌ SOME LIMITERS FAILED'}`);
}

runTests().catch(console.error);
