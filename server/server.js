const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many requests. Please try again later.',
    },
});
app.use('/api/', limiter);

const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        message: 'AI generation rate limit reached. Please wait before generating more trips.',
    },
});
app.use('/api/trips/generate', aiLimiter);

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'GoTrip Pro API is running!',
        timestamp: new Date().toISOString(),
    });
});

app.use('/api/auth', authRoutes);

app.use('/api/trips', tripRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found.`,
    });
});

app.use(errorHandler);

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 5000;

    const startServer = async () => {
        const dbConnected = await connectDB();

        app.listen(PORT, () => {
            console.log(`\n🚀 GoTrip Pro API Server`);
            console.log(`   Port:     ${PORT}`);
            console.log(`   Mode:     ${process.env.NODE_ENV || 'development'}`);
            console.log(`   Database: ${dbConnected ? '✅ Connected' : '⚠️  Not connected'}`);
            console.log(`   Health:   http://localhost:${PORT}/api/health\n`);
        });
    };

    startServer().catch((err) => {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    });
}
