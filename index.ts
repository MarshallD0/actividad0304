import express from 'express';
import studentRoutes from './src/routes/students';

const app = express();

// Middleware
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
    res.send('API is running');
});

// API Routes
app.use('/api/students', studentRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});