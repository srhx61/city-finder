import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

let db: Database | null = null;

export async function initializeDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  db = await open({
    filename: './cities.db',
    driver: sqlite3.Database
  });

  // Create cities table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      country TEXT,
      population INTEGER,
      description TEXT,
      latitude REAL,
      longitude REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert some sample cities if the table is empty
  const count = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM cities');
  if (count && count.count === 0) {
    await seedDatabase(db);
  }

  return db;
}

async function seedDatabase(db: Database): Promise<void> {
  const sampleCities = [
    {
      name: 'New York',
      country: 'USA',
      population: 8336817,
      description: 'The most populous city in the United States, known for its iconic skyline and cultural diversity.',
      latitude: 40.7128,
      longitude: -74.0060
    },
    {
      name: 'London',
      country: 'United Kingdom',
      population: 8982000,
      description: 'The capital and largest city of England and the United Kingdom, rich in history and culture.',
      latitude: 51.5074,
      longitude: -0.1278
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 13960000,
      description: 'The capital of Japan and one of the most populous metropolitan areas in the world.',
      latitude: 35.6762,
      longitude: 139.6503
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2161000,
      description: 'The capital of France, known as the City of Light, famous for art, fashion, and cuisine.',
      latitude: 48.8566,
      longitude: 2.3522
    },
    {
      name: 'Sydney',
      country: 'Australia',
      population: 5312000,
      description: 'The largest city in Australia, known for its harbor, Opera House, and beautiful beaches.',
      latitude: -33.8688,
      longitude: 151.2093
    },
    {
      name: 'Berlin',
      country: 'Germany',
      population: 3677000,
      description: 'The capital and largest city of Germany, known for its history, art scene, and vibrant culture.',
      latitude: 52.5200,
      longitude: 13.4050
    },
    {
      name: 'Rome',
      country: 'Italy',
      population: 2873000,
      description: 'The capital of Italy, known as the Eternal City, famous for its ancient history and architecture.',
      latitude: 41.9028,
      longitude: 12.4964
    },
    {
      name: 'Madrid',
      country: 'Spain',
      population: 3223000,
      description: 'The capital and largest city of Spain, known for its art museums, royal palaces, and vibrant nightlife.',
      latitude: 40.4168,
      longitude: -3.7038
    },
    {
      name: 'Dubai',
      country: 'United Arab Emirates',
      population: 3400000,
      description: 'A global city and business hub known for luxury shopping, ultramodern architecture, and vibrant nightlife.',
      latitude: 25.2048,
      longitude: 55.2708
    },
    {
      name: 'Singapore',
      country: 'Singapore',
      population: 5454000,
      description: 'A global financial center and island city-state known for its multiculturalism and modern skyline.',
      latitude: 1.3521,
      longitude: 103.8198
    },
    {
      name: 'Mumbai',
      country: 'India',
      population: 12478000,
      description: 'The financial capital of India, known for Bollywood, Gateway of India, and vibrant street life.',
      latitude: 19.0760,
      longitude: 72.8777
    },
    {
      name: 'São Paulo',
      country: 'Brazil',
      population: 12325000,
      description: 'The largest city in Brazil and South America, a major financial center with diverse culture.',
      latitude: -23.5505,
      longitude: -46.6333
    },
    {
      name: 'Los Angeles',
      country: 'USA',
      population: 3967000,
      description: 'The entertainment capital of the world, known for Hollywood, beaches, and diverse neighborhoods.',
      latitude: 34.0522,
      longitude: -118.2437
    },
    {
      name: 'Chicago',
      country: 'USA',
      population: 2697000,
      description: 'Known as the Windy City, famous for architecture, deep-dish pizza, and blues music.',
      latitude: 41.8781,
      longitude: -87.6298
    },
    {
      name: 'Toronto',
      country: 'Canada',
      population: 2930000,
      description: 'The largest city in Canada, known for its multiculturalism, CN Tower, and vibrant arts scene.',
      latitude: 43.6532,
      longitude: -79.3832
    },
    {
      name: 'Barcelona',
      country: 'Spain',
      population: 1620000,
      description: 'A vibrant city known for Gaudi architecture, beautiful beaches, and rich Catalan culture.',
      latitude: 41.3851,
      longitude: 2.1734
    },
    {
      name: 'Amsterdam',
      country: 'Netherlands',
      population: 872000,
      description: 'Known for its canals, art museums, and progressive culture, with a rich history.',
      latitude: 52.3676,
      longitude: 4.9041
    },
    {
      name: 'Vienna',
      country: 'Austria',
      population: 1920000,
      description: 'The capital of Austria, known for its imperial palaces, classical music, and coffee culture.',
      latitude: 48.2082,
      longitude: 16.3738
    },
    {
      name: 'Bangkok',
      country: 'Thailand',
      population: 10539000,
      description: 'The capital of Thailand, known for ornate temples, vibrant street life, and floating markets.',
      latitude: 13.7563,
      longitude: 100.5018
    },
    {
      name: 'Seoul',
      country: 'South Korea',
      population: 9720000,
      description: 'The capital of South Korea, a modern metropolis known for K-pop, technology, and traditional palaces.',
      latitude: 37.5665,
      longitude: 126.9780
    },
    {
      name: 'Hong Kong',
      country: 'China',
      population: 7507000,
      description: 'A global financial hub known for its skyline, shopping, and fusion of Eastern and Western cultures.',
      latitude: 22.3193,
      longitude: 114.1694
    },
    {
      name: 'Cairo',
      country: 'Egypt',
      population: 10230000,
      description: 'The capital of Egypt, home to ancient pyramids, the Sphinx, and rich Islamic architecture.',
      latitude: 30.0444,
      longitude: 31.2357
    },
    {
      name: 'Istanbul',
      country: 'Turkey',
      population: 15519000,
      description: 'A transcontinental city bridging Europe and Asia, known for the Hagia Sophia and Grand Bazaar.',
      latitude: 41.0082,
      longitude: 28.9784
    },
    {
      name: 'Moscow',
      country: 'Russia',
      population: 12615000,
      description: 'The capital of Russia, known for the Kremlin, Red Square, and rich cultural heritage.',
      latitude: 55.7558,
      longitude: 37.6173
    },
    {
      name: 'Mexico City',
      country: 'Mexico',
      population: 9209000,
      description: 'The capital of Mexico, a vibrant city known for Aztec history, colorful neighborhoods, and cuisine.',
      latitude: 19.4326,
      longitude: -99.1332
    }
  ];

  const insertStmt = await db.prepare(`
    INSERT INTO cities (name, country, population, description, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const city of sampleCities) {
    await insertStmt.run(
      city.name,
      city.country,
      city.population,
      city.description,
      city.latitude,
      city.longitude
    );
  }

  await insertStmt.finalize();
}

export async function getDatabase(): Promise<Database> {
  if (!db) {
    return await initializeDatabase();
  }
  return db;
}

export interface City {
  id: number;
  name: string;
  country: string | null;
  population: number | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
}


