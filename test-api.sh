#!/bin/bash

SERVER_URL="http://localhost:3001"

echo "Testing API endpoints for CryptoN Club"
echo "========================================"

# Function to test GET endpoints
test_get() {
    local endpoint="$1"
    local resource="$2"
    echo -e "\n--- Testing GET $endpoint ---"
    curl -s "$SERVER_URL$endpoint" | head -20
}

# Function to test POST, PUT, DELETE
test_mutation() {
    local method="$1"
    local endpoint="$2"
    local data="$3"
    echo -e "\n--- Testing $method $endpoint ---"
    if [ "$method" = "POST" ]; then
        curl -s -X POST "$SERVER_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data"
    elif [ "$method" = "PUT" ]; then
        curl -s -X PUT "$SERVER_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data"
    elif [ "$method" = "DELETE" ]; then
        curl -s -X DELETE "$SERVER_URL$endpoint"
    fi
}

# Test all GET endpoints
echo "Testing GET endpoints:"
test_get "/api/events" "events"
test_get "/api/members" "members"
test_get "/api/achievements" "achievements"
test_get "/api/blog" "blog posts"

# Test POST endpoints (create sample data)
echo -e "\n\nTesting POST endpoints:"

# Create a test event
test_mutation "POST" "/api/events" '{
  "id": "test-event",
  "title": "Test Event",
  "description": "Test event for API testing",
  "date": "2025-12-01",
  "time": "10:00",
  "location": "Test Location"
}'

# Create a test member
test_mutation "POST" "/api/members" '{
  "id": "test-member",
  "name": "Test Member",
  "email": "test@crypton.com",
  "role": "Tester",
  "year": "3rd Year",
  "github": "testgithub",
  "linkedin": "testlinkedin"
}'

# Create a test achievement
test_mutation "POST" "/api/achievements" '{
  "id": "test-achievement",
  "title": "Test Achievement",
  "description": "Test achievement for API testing",
  "year": "2025",
  "participants": "Test Team"
}'

# Create a test blog post
test_mutation "POST" "/api/blog" '{
  "id": "test-blog",
  "title": "Test Blog Post",
  "content": "This is a test blog post",
  "author": "API Tester",
  "date": "2025-01-01"
}'

# Test PUT endpoints (update data)
echo -e "\n\nTesting PUT endpoints:"
test_mutation "PUT" "/api/events/test-event" '{
  "id": "test-event",
  "title": "Updated Test Event",
  "description": "Updated test event for API testing",
  "date": "2025-12-01",
  "time": "11:00",
  "location": "Updated Location"
}'

# Test DELETE endpoints (delete data)
echo -e "\n\nTesting DELETE endpoints:"
test_mutation "DELETE" "/api/events/test-event"
test_mutation "DELETE" "/api/members/test-member"
test_mutation "DELETE" "/api/achievements/test-achievement"
test_mutation "DELETE" "/api/blog/test-blog"

echo -e "\n\nAPI testing complete!"
