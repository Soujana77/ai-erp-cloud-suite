# Rate Limiting Test Instructions

## Quick Test

1. Start the server:
   ```powershell
   cd backend
   npm start
   ```

2. In a separate terminal, run the verification script:
   ```powershell
   cd backend
   node verify-rate-limit.js
   ```

## Expected Behavior

### Global /api Rate Limit (100 requests / 10s)
- Should allow ~100 requests
- Block the 101+ with response:
  ```json
  {
    "success": false,
    "message": "Too many requests, please try again later"
  }
  ```

### Test Route /test-limit (2 requests / 10s)
- 1st request: ✅ { success: true, message: "Request success", ... }
- 2nd request: ✅ same
- 3rd+ request: ❌ { success: false, message: "Too many requests" }
- Wait 10 seconds, limit resets

## What Was Fixed

### Before (Issues):
1. Global limiter used `max: 2` — too restrictive for real usage
2. Test route returned `{ message: "Request success" }` — wrong format
3. Rate limit error response was non-standard
4. No unified response format across limiters

### After (Production-Ready):
1. Global limiter: `max: 100` per 10s — reasonable default
2. Test route: strict `max: 2` per 10s for easy verification
3. All rate limit responses use standard format:
   ```json
   { "success": false, "message": "Too many requests..." }
   ```
4. Success responses follow app standard:
   ```json
   { "success": true, "message": "...", "data": {...} }
   ```
5. `keyGenerator` uses `req.ip` for correct client identification
6. `trust proxy` set for proper IP behind proxies
7. Custom handler overrides express-rate-limit default

## Files Modified
- `backend/src/app.js` — complete rate limiting implementation
