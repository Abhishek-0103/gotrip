const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const BUDGET_TIERS = {
  low: {
    label: 'Budget-Friendly',
    hotels: 'Budget hotels, hostels, guesthouses (₹800-2,500/night)',
    transport: 'Public transport, shared cabs, buses, economy trains',
    food: 'Street food, local eateries, budget restaurants (₹150-500/meal)',
    activities: 'Free attractions, walking tours, public beaches, local markets',
  },
  moderate: {
    label: 'Mid-Range',
    hotels: '3-star hotels, boutique stays (₹3,000-8,000/night)',
    transport: 'Mix of public and private transport, AC trains, domestic flights',
    food: 'Mid-range restaurants, cafes, occasional fine dining (₹500-1,500/meal)',
    activities: 'Paid attractions, guided tours, adventure sports, cultural shows',
  },
  premium: {
    label: 'Luxury / Premium',
    hotels: '4-5 star hotels, luxury resorts, premium villas (₹10,000-40,000+/night)',
    transport: 'Private cars, business class flights, luxury transfers',
    food: 'Fine dining, award-winning restaurants, gourmet experiences (₹2,000-6,000+/meal)',
    activities: 'Private tours, exclusive experiences, spa treatments, VIP access',
  },
};

const TRAVEL_STYLES = {
  adventure: 'Focus on adventure activities like hiking, trekking, water sports, paragliding, camping, and outdoor exploration.',
  relaxation: 'Focus on relaxation — spa treatments, beach lounging, scenic walks, yoga retreats, and peaceful environments.',
  cultural: 'Focus on cultural immersion — museums, historical sites, local festivals, art galleries, traditional performances, and heritage walks.',
  family: 'Focus on family-friendly activities — theme parks, zoos, easy hikes, interactive museums, kid-friendly restaurants, and safe areas.',
  romantic: 'Focus on romantic experiences — sunset views, couples spa, candlelight dinners, scenic boat rides, private tours, and intimate settings.',
};

function buildPrompt({ destination, duration, budget, travelStyle }) {
  const budgetInfo = BUDGET_TIERS[budget];
  const styleInfo = TRAVEL_STYLES[travelStyle];

  return `You are an expert travel planner AI. Generate a detailed, realistic travel itinerary.

TRIP DETAILS:
- Destination: ${destination}
- Duration: ${duration} days
- Budget Category: ${budgetInfo.label}
- Travel Style: ${travelStyle.charAt(0).toUpperCase() + travelStyle.slice(1)}

BUDGET GUIDELINES:
- Accommodation: ${budgetInfo.hotels}
- Transport: ${budgetInfo.transport}
- Food: ${budgetInfo.food}
- Activities: ${budgetInfo.activities}

TRAVEL STYLE:
${styleInfo}

INSTRUCTIONS:
1. Create a realistic, day-by-day itinerary for ${duration} days.
2. Include 3 real hotel recommendations with actual names, realistic ratings, and price estimates.
3. Provide a realistic total budget breakdown.
4. All hotel names must be real, well-known hotels in the destination area.
5. Include Google Maps search links for each hotel.
6. Provide transport suggestions for reaching the destination and local travel.
7. ALL costs MUST be in Indian Rupees (₹). Use realistic Indian pricing.
8. For each hotel, provide an "imageQuery" field with a short descriptive search query to find an image of that hotel (e.g., "Taj Lake Palace Udaipur exterior").
9. For EVERY activity, include a "placeName" (short name of the attraction/place) and a "mapsLink" (Google Maps search URL for that place). This is CRITICAL — every activity must be linked to a real place on Google Maps.

Respond ONLY with valid JSON in EXACTLY this format (no markdown, no code blocks, no extra text):
{
  "destination": "${destination}",
  "duration": ${duration},
  "budgetCategory": "${budget}",
  "totalEstimatedBudget": "₹XX,XXX - ₹XX,XXX",
  "budgetBreakdown": {
    "stay": "₹XX,XXX",
    "transport": "₹XX,XXX",
    "food": "₹XX,XXX",
    "activities": "₹XX,XXX"
  },
  "transportSuggestions": {
    "reachingDestination": "How to reach (flight/train/bus details with approximate costs in ₹)",
    "localTransport": "Local transport options and tips with costs in ₹"
  },
  "hotels": [
    {
      "name": "Real Hotel Name",
      "priceRange": "₹X,XXX - ₹X,XXX per night",
      "rating": 4.5,
      "mapsLink": "https://www.google.com/maps/search/Hotel+Name+${encodeURIComponent(destination)}",
      "description": "Brief description of the hotel",
      "imageQuery": "Hotel Name city exterior view"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Descriptive Day Title",
      "activities": [
        {
          "time": "Morning",
          "activity": "Activity description",
          "placeName": "Name of the Place/Attraction",
          "mapsLink": "https://www.google.com/maps/search/Place+Name+${encodeURIComponent(destination)}",
          "estimatedCost": "₹XXX"
        }
      ],
      "meals": {
        "breakfast": "Restaurant/place name — ₹XXX",
        "lunch": "Restaurant/place name — ₹XXX",
        "dinner": "Restaurant/place name — ₹XXX"
      },
      "estimatedDayCost": "₹X,XXX"
    }
  ],
  "tips": ["Useful tip 1", "Useful tip 2", "Useful tip 3"]
}`;
}

async function generateTrip({ destination, duration, budget, travelStyle }) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = buildPrompt({ destination, duration, budget, travelStyle });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

    const tripData = JSON.parse(text);

    return tripData;
  } catch (error) {
    console.error('Gemini API Error:', error.message);

    if (error.message.includes('API_KEY')) {
      throw new Error('Invalid or missing Gemini API key. Please check your .env file.');
    }

    if (error instanceof SyntaxError) {
      throw new Error('AI returned an invalid response format. Please try again.');
    }

    throw new Error(`Failed to generate trip: ${error.message}`);
  }
}

module.exports = { generateTrip };
