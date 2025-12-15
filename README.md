# City Finder

A simple Node.js TypeScript application with a file-based SQLite database that provides city information through a REST API endpoint.

## Features

- **File-based SQLite database** - No external database server required
- **TypeScript** - Type-safe development
- **REST API** - Simple endpoint to query city information
- **Pre-seeded data** - Includes sample cities (New York, London, Tokyo, Paris, Sydney)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript code:
```bash
npm run build
```

## Usage

### Development Mode

Run the application in development mode with hot reload:
```bash
npm run dev
```

### Production Mode

Build and run:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

## API Endpoints

### Get City Information

**POST** `/city`

Request body:
```json
{
  "name": "New York"
}
```

Response (success):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "New York",
    "country": "USA",
    "population": 8336817,
    "description": "The most populous city in the United States, known for its iconic skyline and cultural diversity.",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "created_at": "2024-01-01 12:00:00"
  }
}
```

Response (not found):
```json
{
  "error": "City \"UnknownCity\" not found in the database"
}
```

### Health Check

**GET** `/health`

Returns the API status.

## Example Usage

Using curl:
```bash
curl -X POST http://localhost:3000/city \
  -H "Content-Type: application/json" \
  -d '{"name": "London"}'
```

Using JavaScript fetch:
```javascript
fetch('http://localhost:3000/city', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'Tokyo' })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Database

The SQLite database file (`cities.db`) is automatically created in the project root when the application starts. The database includes a `cities` table with the following schema:

- `id` - Primary key
- `name` - City name (unique)
- `country` - Country name
- `population` - Population count
- `description` - City description
- `latitude` - Latitude coordinate
- `longitude` - Longitude coordinate
- `created_at` - Timestamp

## Adding Cities

You can add cities to the database by directly inserting records into the SQLite database file, or by modifying the `seedDatabase` function in `src/database.ts`.

## Testing

The project includes end-to-end (e2e) tests using Jest and Supertest.

### Run Tests

Run all e2e tests:
```bash
npm run test:e2e
```

Run all tests (if you add unit tests later):
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Test Coverage

The e2e tests cover:
- ✅ Successful city lookups for all pre-seeded cities (New York, London, Tokyo, Paris, Sydney)
- ✅ Case-insensitive city name matching
- ✅ Handling of extra whitespace in city names
- ✅ Error handling for non-existent cities (404)
- ✅ Validation for missing or invalid city names (400)
- ✅ Health check endpoint

## License

MIT
