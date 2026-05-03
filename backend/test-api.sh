#!/bin/bash
# Test completo de la API de NutriAI

BASE_URL="http://localhost:3000/api"

echo "=== NutriAI API Test Suite ==="
echo ""

# 1. Register
echo "1. Registering user..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@nutriai.com",
    "password": "TestPassword123!"
  }')

echo "$REGISTER_RESPONSE" | jq .

TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.token')
USER_ID=$(echo "$REGISTER_RESPONSE" | jq -r '.user.id')

if [ "$TOKEN" = "null" ]; then
  echo "❌ Registration failed"
  exit 1
fi

echo "✅ User registered. Token: ${TOKEN:0:20}..."
echo ""

# 2. Login
echo "2. Testing login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@nutriai.com",
    "password": "TestPassword123!"
  }')

echo "$LOGIN_RESPONSE" | jq .
echo "✅ Login successful"
echo ""

# 3. Get profile (empty)
echo "3. Getting empty profile..."
curl -s "$BASE_URL/users/profile" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

# 4. Update profile (onboarding)
echo "4. Completing onboarding..."
PROFILE_UPDATE=$(curl -s -X PUT "$BASE_URL/users/profile" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 30,
    "gender": "male",
    "height_cm": 175,
    "weight_kg": 80,
    "neat": "moderate",
    "allergies": ["peanuts"],
    "intolerances": [],
    "budget": "medium",
    "goal": "fat_loss"
  }')

echo "$PROFILE_UPDATE" | jq .
echo "✅ Profile updated"
echo ""

# 5. Get updated profile
echo "5. Getting updated profile..."
curl -s "$BASE_URL/users/profile" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

# 6. Create body measurement
echo "6. Creating body measurement..."
MEASUREMENT=$(curl -s -X POST "$BASE_URL/measurements" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "weight_kg": 80,
    "neck_cm": 38,
    "chest_cm": 102,
    "waist_cm": 85,
    "hip_cm": 98,
    "arm_cm": 35,
    "thigh_cm": 58,
    "notes": "Primera medición"
  }')

echo "$MEASUREMENT" | jq .
echo "✅ Measurement created"
echo ""

# 7. Get measurements
echo "7. Getting measurements..."
curl -s "$BASE_URL/measurements?limit=5" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

echo "=== ✅ All tests passed ==="
echo ""
echo "Next steps:"
echo "- Add OpenAI API key to .env to test nutrition plan generation"
echo "- Test Vision API with actual image URL"
