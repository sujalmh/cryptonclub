@echo off
echo Testing API endpoints for CryptoN Club
echo ========================================
set SERVER_URL=http://localhost:3001

REM Test GET endpoints
echo Testing GET endpoints:
echo --- Testing GET /api/events ---
curl -s "%SERVER_URL%/api/events" | more
echo.
echo --- Testing GET /api/members ---
curl -s "%SERVER_URL%/api/members" | more
echo.
echo --- Testing GET /api/achievements ---
curl -s "%SERVER_URL%/api/achievements" | more
echo.
echo --- Testing GET /api/blog ---
curl -s "%SERVER_URL%/api/blog" | more

REM Test POST endpoints (create sample data)
echo.
echo Testing POST endpoints:

echo --- Testing POST /api/events ---
curl -s -X POST "%SERVER_URL%/api/events" ^
    -H "Content-Type: application/json" ^
    -d "{\"id\": \"test-event\", \"title\": \"Test Event\", \"description\": \"Test event for API testing\", \"date\": \"2025-12-01\", \"time\": \"10:00\", \"location\": \"Test Location\"}"
echo.

echo --- Testing POST /api/members ---
curl -s -X POST "%SERVER_URL%/api/members" ^
    -H "Content-Type: application/json" ^
    -d "{\"id\": \"test-member\", \"name\": \"Test Member\", \"email\": \"test@crypton.com\", \"role\": \"Tester\", \"year\": \"3rd Year\", \"github\": \"testgithub\", \"linkedin\": \"testlinkedin\"}"
echo.

echo --- Testing POST /api/achievements ---
curl -s -X POST "%SERVER_URL%/api/achievements" ^
    -H "Content-Type: application/json" ^
    -d "{\"id\": \"test-achievement\", \"title\": \"Test Achievement\", \"description\": \"Test achievement for API testing\", \"year\": \"2025\", \"participants\": \"Test Team\"}"
echo.

echo --- Testing POST /api/blog ---
curl -s -X POST "%SERVER_URL%/api/blog" ^
    -H "Content-Type: application/json" ^
    -d "{\"id\": \"test-blog\", \"title\": \"Test Blog Post\", \"content\": \"This is a test blog post\", \"author\": \"API Tester\", \"date\": \"2025-01-01\"}"
echo.

REM Test PUT endpoints (update data)
echo.
echo Testing PUT endpoints:
echo --- Testing PUT /api/events/test-event ---
curl -s -X PUT "%SERVER_URL%/api/events/test-event" ^
    -H "Content-Type: application/json" ^
    -d "{\"id\": \"test-event\", \"title\": \"Updated Test Event\", \"description\": \"Updated test event for API testing\", \"date\": \"2025-12-01\", \"time\": \"11:00\", \"location\": \"Updated Location\"}"
echo.

REM Test DELETE endpoints (delete data)
echo.
echo Testing DELETE endpoints:
echo --- Testing DELETE /api/events/test-event ---
curl -s -X DELETE "%SERVER_URL%/api/events/test-event"
echo.

echo --- Testing DELETE /api/members/test-member ---
curl -s -X DELETE "%SERVER_URL%/api/members/test-member"
echo.

echo --- Testing DELETE /api/achievements/test-achievement ---
curl -s -X DELETE "%SERVER_URL%/api/achievements/test-achievement"
echo.

echo --- Testing DELETE /api/blog/test-blog ---
curl -s -X DELETE "%SERVER_URL%/api/blog/test-blog"
echo.

echo.
echo API testing complete! Press any key to exit...
pause >nul
