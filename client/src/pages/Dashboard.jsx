import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Skeleton from '../components/ui/Skeleton';
import ErrorAlert from '../components/ui/ErrorAlert';

const BUDGET_COLORS = { low: '#10b981', moderate: '#f59e0b', premium: '#ec4899' };
const STYLE_ICONS = { adventure: '🏔️', relaxation: '🏖️', cultural: '🏛️', family: '👨‍👩‍👧‍👦', romantic: '💕' };
const CARD_GRADIENTS = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
    'linear-gradient(135deg, #a18cd1, #fbc2eb)',
];

function TripCard({ trip, index, onDelete, deleting, onView }) {
    const [imgFailed, setImgFailed] = useState(false);
    const hasImage = trip.destinationImage && !imgFailed;
    const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
    return (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 140, position: 'relative', background: gradient, overflow: 'hidden' }}>
                {hasImage && (<img src={trip.destinationImage} alt={trip.destination} onError={() => setImgFailed(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />)}
                {!hasImage && (<div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}>🌍</span></div>)}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)', pointerEvents: 'none' }} />
                <h3 style={{ position: 'absolute', bottom: 14, left: 16, right: 16, fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.15rem', color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)', zIndex: 1 }}>📍 {trip.destination}</h3>
            </div>
            <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                    <span style={{ padding: '4px 12px', borderRadius: 12, fontSize: '0.78rem', fontWeight: 600, background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>📅 {trip.duration} days</span>
                    <span style={{ padding: '4px 12px', borderRadius: 12, fontSize: '0.78rem', fontWeight: 600, background: `${BUDGET_COLORS[trip.budget] || '#6366f1'}15`, color: BUDGET_COLORS[trip.budget] || '#6366f1', textTransform: 'capitalize' }}>💰 {trip.budget}</span>
                    <span style={{ padding: '4px 12px', borderRadius: 12, fontSize: '0.78rem', fontWeight: 600, background: 'var(--bg-glass)', border: '1px solid var(--border-color)', textTransform: 'capitalize' }}>{STYLE_ICONS[trip.travelStyle] || '🌍'} {trip.travelStyle}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 14, marginTop: 'auto' }}>
                    Created {new Date(trip.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn-primary" onClick={() => onView(trip._id)} style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}>View Details</button>
                    <button className="btn-danger" onClick={() => onDelete(trip._id)} disabled={deleting} style={{ padding: '10px 16px', fontSize: '0.85rem' }}>{deleting ? '...' : '🗑️'}</button>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(null);

    useEffect(() => { fetchTrips(); }, []);

    const fetchTrips = async () => {
        try { setLoading(true); const res = await api.get('/trips'); setTrips(res.data.data.trips); }
        catch (err) { setError(err.response?.data?.message || 'Failed to load trips.'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (tripId) => {
        if (!window.confirm('Are you sure you want to delete this trip?')) return;
        setDeleting(tripId);
        try { await api.delete(`/trips/${tripId}`); setTrips((prev) => prev.filter((t) => t._id !== tripId)); }
        catch (err) { setError(err.response?.data?.message || 'Failed to delete trip.'); }
        finally { setDeleting(null); }
    };

    return (
        <div style={{ padding: '40px 24px', maxWidth: 1220, margin: '0 auto' }}>
            <div className="animate-fade-in-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
                <div>
                    <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2rem)', marginBottom: 4, background: 'linear-gradient(135deg, #4f46e5, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>📋 My Trips</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{trips.length > 0 ? `${trips.length} saved trip${trips.length > 1 ? 's' : ''}` : 'No saved trips yet'}</p>
                </div>
                <Link to="/plan" className="btn-primary" style={{ textDecoration: 'none' }}>✨ Plan New Trip</Link>
            </div>
            {error && <ErrorAlert message={error} onRetry={fetchTrips} />}
            {loading && (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>{[1, 2, 3].map((i) => (<Skeleton key={i} height={280} borderRadius={20} />))}</div>)}
            {!loading && trips.length === 0 && !error && (
                <div className="animate-bounce-in" style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <div style={{ fontSize: '5rem', marginBottom: 20 }}>🌍</div>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.6rem', marginBottom: 10 }}>No Trips Yet</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 28, maxWidth: 400, margin: '0 auto 28px', fontSize: '0.95rem', lineHeight: 1.6 }}>Start by creating your first AI-powered trip plan — it only takes 30 seconds!</p>
                    <Link to="/plan" className="btn-primary" style={{ textDecoration: 'none', padding: '16px 40px', fontSize: '1.05rem' }}>🚀 Create Your First Trip</Link>
                </div>
            )}
            {!loading && trips.length > 0 && (
                <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 22 }}>
                    {trips.map((trip, index) => (<TripCard key={trip._id} trip={trip} index={index} onDelete={handleDelete} deleting={deleting === trip._id} onView={(id) => navigate(`/trip/${id}`)} />))}
                </div>
            )}
        </div>
    );
}
