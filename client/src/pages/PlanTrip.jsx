import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TripForm from '../components/trip/TripForm';
import ItineraryView from '../components/trip/ItineraryView';
import { TripSkeleton } from '../components/ui/Skeleton';
import ErrorAlert from '../components/ui/ErrorAlert';

export default function PlanTrip() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [formData, setFormData] = useState(null);

    const handleGenerate = async (data) => {
        setLoading(true);
        setError('');
        setResult(null);
        setFormData(data);
        try {
            const res = await api.post('/trips/generate', data);
            setResult(res.data.data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to generate trip. Please try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!result || !formData) return;
        setSaving(true);
        try {
            await api.post('/trips/save', {
                destination: formData.destination,
                duration: formData.duration,
                budget: formData.budget,
                travelStyle: formData.travelStyle,
                tripData: result.tripData,
                destinationImage: result.placeDetails?.photoUrl || null,
                coordinates: result.placeDetails?.coordinates || null,
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save trip.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
            {!result && !loading && (
                <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div className="animate-float" style={{ fontSize: '3rem', marginBottom: 16 }}>✨</div>
                    <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 10, background: 'linear-gradient(135deg, #4f46e5, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Plan Your Dream Trip</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
                        Tell us where you want to go — our AI will craft a personalized day-by-day itinerary with hotels, budget, and maps 🗺️
                    </p>
                </div>
            )}
            {!result && !loading && (
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <TripForm onSubmit={handleGenerate} loading={loading} />
                </div>
            )}
            {loading && <TripSkeleton />}
            {error && <ErrorAlert message={error} onRetry={() => { setError(''); setResult(null); }} />}
            {result && !loading && (
                <div className="animate-fade-in-up">
                    <ItineraryView tripData={result.tripData} placeDetails={result.placeDetails} mapEmbedUrl={result.mapEmbedUrl} onSave={handleSave} saving={saving} />
                    <div style={{ textAlign: 'center', marginTop: 12, marginBottom: 32 }}>
                        <button className="btn-outline" onClick={() => { setResult(null); setError(''); }} style={{ padding: '14px 36px' }}>🔄 Plan a Different Trip</button>
                    </div>
                </div>
            )}
        </div>
    );
}
