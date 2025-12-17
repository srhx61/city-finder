import express, { Request, Response } from 'express';
import cors from 'cors';
import { initializeDatabase, getDatabase, City } from './database';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database on startup
initializeDatabase().catch(console.error);

// City information endpoint
app.post('/city', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({
        error: 'City name is required and must be a string'
      });
    }

    const db = await getDatabase();
    const city = await db.get<City>(
      'SELECT * FROM cities WHERE LOWER(name) = LOWER(?)',
      [name.trim()]
    );

    if (!city) {
      return res.status(404).json({
        error: `City "${name}" not found in the database`
      });
    }

    res.json({
      success: true,
      data: {
        id: city.id,
        name: city.name,
        country: city.country,
        population: city.population,
        description: city.description,
        coordinates: {
          latitude: city.latitude,
          longitude: city.longitude
        },
        created_at: city.created_at
      }
    });
  } catch (error) {
    console.error('Error fetching city information:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Backup endpoint - read-only export of all cities as JSON
app.get('/backup', async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const cities = await db.all<City[]>('SELECT * FROM cities');

    res.json({
      success: true,
      count: cities.length,
      data: cities
    });
  } catch (error) {
    console.error('Error creating backup export:', error);
    res.status(500).json({
      error: 'Internal server error while creating backup export'
    });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'City Finder API is running' });
});

// Export app for testing
export default app;

// Start server - Azure requires the server to always listen
// Only skip if we're in a test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`City endpoint: POST http://localhost:${PORT}/city`);
  });
}

