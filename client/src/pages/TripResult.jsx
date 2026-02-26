import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import ItineraryView from '../components/trip/ItineraryView';
import { TripSkeleton } from '../components/ui/Skeleton';
import ErrorAlert from '../components/ui/ErrorAlert';

export default function TripResult() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const res = await api.get(`/trips/${id}`);
                setTrip(res.data.data.trip);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load trip.');
            } finally {
                setLoading(false);
            }
        };
        fetchTrip();
    }, [id]);

    if (loading) return (<div style={{ padding: '40px 24px' }}><TripSkeleton /></div>);

    if (error) return (
        <div style={{ padding: '40px 24px' }}>
            <ErrorAlert message={error} onRetry={() => window.location.reload()} />
            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Link to="/dashboard" className="btn-outline" style={{ textDecoration: 'none' }}>← Back to Dashboard</Link>
            </div>
        </div>
    );

    if (!trip) return null;

    const mapEmbedUrl = trip.coordinates?.lat
        ? `https://maps.google.com/maps?q=${trip.coordinates.lat},${trip.coordinates.lng}&output=embed`
        : `https://maps.google.com/maps?q=${encodeURIComponent(trip.destination)}&output=embed`;

    const placeDetails = { photoUrl: trip.destinationImage, coordinates: trip.coordinates };

    return (
        <div className="animate-fade-in-up" style={{ padding: '40px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1100, margin: '0 auto 28px', flexWrap: 'wrap', gap: 12 }}>
                <Link to="/dashboard" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 10, background: 'rgba(79, 70, 229, 0.06)', border: '1px solid rgba(79, 70, 229, 0.15)', transition: 'all 0.3s' }}>← Back to My Trips</Link>
                <button className="btn-outline" onClick={() => navigate('/plan')} style={{ padding: '10px 24px', fontSize: '0.88rem' }}>✨ Plan New Trip</button>
            </div>
            <ItineraryView tripData={trip.tripData} placeDetails={placeDetails} mapEmbedUrl={mapEmbedUrl} />
        </div>
    );
}
