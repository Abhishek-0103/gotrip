const axios = require('axios');

const GOOGLE_API_BASE = 'https://maps.googleapis.com/maps/api';

function hasValidGoogleKey() {
    const key = process.env.GOOGLE_MAPS_API_KEY;
    return key && key !== 'your_google_maps_api_key_here' && key.length > 10;
}

async function getWikipediaImage(searchTerm) {
    try {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`;
        const res = await axios.get(url, {
            timeout: 6000,
            headers: { 'User-Agent': 'GoTripPro/1.0 (travel-planner-app)' },
        });

        if (res.data?.originalimage?.source) {
            return res.data.originalimage.source;
        }
        if (res.data?.thumbnail?.source) {
            return res.data.thumbnail.source.replace(/\/\d+px-/, '/1200px-');
        }
        return null;
    } catch {
        return null;
    }
}

async function findBestWikipediaImage(primaryTerm, fallbackTerms = []) {
    const primary = await getWikipediaImage(primaryTerm);
    if (primary) return primary;

    for (const term of fallbackTerms) {
        const img = await getWikipediaImage(term);
        if (img) return img;
    }
    return null;
}

async function getPlaceDetails(placeName) {
    const fallback = {
        name: placeName,
        coordinates: null,
        photoUrl: null,
        mapsLink: `https://www.google.com/maps/search/${encodeURIComponent(placeName)}`,
    };

    try {
        if (hasValidGoogleKey()) {
            const apiKey = process.env.GOOGLE_MAPS_API_KEY;
            const searchUrl = `${GOOGLE_API_BASE}/place/textsearch/json`;
            const searchResponse = await axios.get(searchUrl, {
                params: { query: placeName, key: apiKey },
                timeout: 8000,
            });

            if (searchResponse.data.status === 'OK' && searchResponse.data.results.length) {
                const place = searchResponse.data.results[0];
                const location = place.geometry?.location;

                let photoUrl = null;
                if (place.photos?.length > 0) {
                    const photoRef = place.photos[0].photo_reference;
                    try {
                        const photoApiUrl = `${GOOGLE_API_BASE}/place/photo?maxwidth=1200&photo_reference=${photoRef}&key=${apiKey}`;
                        const photoRes = await axios.get(photoApiUrl, {
                            maxRedirects: 5,
                            timeout: 8000,
                            responseType: 'stream',
                        });
                        photoUrl = photoRes.request?.res?.responseUrl || photoApiUrl;
                        photoRes.data.destroy();
                    } catch {
                        console.log('Google Places photo fetch failed, trying Wikipedia...');
                    }
                }

                if (!photoUrl) {
                    photoUrl = await findBestWikipediaImage(placeName, [
                        `${placeName} tourism`,
                        `${placeName} city`,
                        `${placeName} India`,
                    ]);
                }

                return {
                    name: place.name || placeName,
                    coordinates: location ? { lat: location.lat, lng: location.lng } : null,
                    photoUrl,
                    mapsLink: `https://www.google.com/maps/search/${encodeURIComponent(place.name || placeName)}`,
                    placeId: place.place_id,
                };
            }
        }

        const wikiImage = await findBestWikipediaImage(placeName, [
            `${placeName} tourism`,
            `${placeName} city`,
            `${placeName} India`,
        ]);
        return { ...fallback, photoUrl: wikiImage };
    } catch (error) {
        console.error('Place details error:', error.message);
        try {
            const wikiImage = await findBestWikipediaImage(placeName, [`${placeName} India`]);
            return { ...fallback, photoUrl: wikiImage };
        } catch {
            return fallback;
        }
    }
}

async function getHotelPhoto(hotelName, destination, imageQuery) {
    try {
        if (hasValidGoogleKey()) {
            const apiKey = process.env.GOOGLE_MAPS_API_KEY;
            const searchUrl = `${GOOGLE_API_BASE}/place/textsearch/json`;
            const searchResponse = await axios.get(searchUrl, {
                params: {
                    query: `${hotelName} hotel ${destination}`,
                    type: 'lodging',
                    key: apiKey,
                },
                timeout: 8000,
            });

            if (searchResponse.data.status === 'OK' && searchResponse.data.results.length) {
                const place = searchResponse.data.results[0];
                if (place.photos?.length > 0) {
                    const photoRef = place.photos[0].photo_reference;
                    try {
                        const photoApiUrl = `${GOOGLE_API_BASE}/place/photo?maxwidth=600&photo_reference=${photoRef}&key=${apiKey}`;
                        const photoRes = await axios.get(photoApiUrl, {
                            maxRedirects: 5,
                            timeout: 8000,
                            responseType: 'stream',
                        });
                        const finalUrl = photoRes.request?.res?.responseUrl || photoApiUrl;
                        photoRes.data.destroy();
                        return finalUrl;
                    } catch {
                    }
                }
            }
        }

        const wikiImage = await findBestWikipediaImage(hotelName, [
            `${hotelName} ${destination}`,
            `${hotelName} hotel`,
            imageQuery || '',
        ].filter(Boolean));

        return wikiImage;
    } catch (error) {
        console.error('Hotel photo error:', error.message);
        return null;
    }
}

function getMapEmbedUrl(query) {
    if (hasValidGoogleKey()) {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        return `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(query)}&key=${apiKey}`;
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

module.exports = {
    getPlaceDetails,
    getHotelPhoto,
    getMapEmbedUrl,
};
