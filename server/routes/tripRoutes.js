const express = require('express');
const auth = require('../middleware/auth');
const Trip = require('../models/Trip');
const { generateTrip } = require('../services/geminiService');
const { getPlaceDetails, getHotelPhoto, getMapEmbedUrl } = require('../services/googleService');

const router = express.Router();

router.post('/generate', auth, async (req, res, next) => {
    try {
        const { destination, duration, budget, travelStyle } = req.body;

        if (!destination || !duration || !budget || !travelStyle) {
            return res.status(400).json({
                success: false,
                message: 'Please provide destination, duration, budget, and travel style.',
            });
        }

        const durationNum = parseInt(duration);
        if (isNaN(durationNum) || durationNum < 1 || durationNum > 30) {
            return res.status(400).json({
                success: false,
                message: 'Duration must be between 1 and 30 days.',
            });
        }

        const validBudgets = ['low', 'moderate', 'premium'];
        if (!validBudgets.includes(budget.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: 'Budget must be one of: low, moderate, premium.',
            });
        }

        const validStyles = ['adventure', 'relaxation', 'cultural', 'family', 'romantic'];
        if (!validStyles.includes(travelStyle.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: 'Travel style must be one of: adventure, relaxation, cultural, family, romantic.',
            });
        }

        const tripData = await generateTrip({
            destination,
            duration: durationNum,
            budget: budget.toLowerCase(),
            travelStyle: travelStyle.toLowerCase(),
        });

        const placeDetails = await getPlaceDetails(destination);

        if (tripData.hotels && tripData.hotels.length > 0) {
            const hotelPhotoPromises = tripData.hotels.map(async (hotel) => {
                const photoUrl = await getHotelPhoto(hotel.name, destination, hotel.imageQuery);
                return { ...hotel, imageUrl: photoUrl };
            });
            tripData.hotels = await Promise.all(hotelPhotoPromises);
        }

        const mapEmbedUrl = getMapEmbedUrl(destination);

        res.json({
            success: true,
            data: {
                tripData,
                placeDetails,
                mapEmbedUrl,
            },
        });
    } catch (error) {
        next(error);
    }
});

router.post('/save', auth, async (req, res, next) => {
    try {
        const { destination, duration, budget, travelStyle, tripData, destinationImage, coordinates } = req.body;

        if (!destination || !tripData) {
            return res.status(400).json({
                success: false,
                message: 'Trip data is required to save.',
            });
        }

        const trip = await Trip.create({
            userId: req.userId,
            destination,
            duration,
            budget,
            travelStyle,
            tripData,
            destinationImage,
            coordinates,
        });

        res.status(201).json({
            success: true,
            message: 'Trip saved successfully!',
            data: { trip },
        });
    } catch (error) {
        next(error);
    }
});

router.get('/', auth, async (req, res, next) => {
    try {
        const trips = await Trip.find({ userId: req.userId })
            .sort({ createdAt: -1 })
            .select('-tripData');

        res.json({
            success: true,
            data: { trips },
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', auth, async (req, res, next) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found.',
            });
        }

        res.json({
            success: true,
            data: { trip },
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        const trip = await Trip.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found.',
            });
        }

        res.json({
            success: true,
            message: 'Trip deleted successfully.',
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
