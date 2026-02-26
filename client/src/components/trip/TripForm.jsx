import { useState } from 'react';

const BUDGETS = [
    { value: 'low', label: 'Budget', emoji: '💰', desc: 'Hostels, street food, public transport', color: '#10b981' },
    { value: 'moderate', label: 'Mid-Range', emoji: '💵', desc: '3-star hotels, local restaurants', color: '#f59e0b' },
    { value: 'premium', label: 'Luxury', emoji: '💎', desc: '5-star hotels, fine dining, private transport', color: '#ec4899' },
];

const STYLES = [
    { value: 'adventure', label: 'Adventure', emoji: '🏔️' },
    { value: 'relaxation', label: 'Relaxation', emoji: '🏖️' },
    { value: 'cultural', label: 'Cultural', emoji: '🏛️' },
    { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { value: 'romantic', label: 'Romantic', emoji: '💕' },
];

export default function TripForm({ onSubmit, loading = false }) {
    const [destination, setDestination] = useState('');
    const [duration, setDuration] = useState(3);
    const [budget, setBudget] = useState('moderate');
    const [travelStyle, setTravelStyle] = useState('cultural');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!destination.trim()) return;
        onSubmit({ destination: destination.trim(), duration, budget, travelStyle });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="glass-card" style={{ padding: '36px 32px' }}>
                <div style={{ marginBottom: 28 }}>
                    <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.95rem' }}>
                        📍 Where do you want to go?
                    </label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="e.g., Goa, Manali, Jaipur, Kerala..."
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                        disabled={loading}
                        autoFocus
                        style={{ fontSize: '1.05rem', padding: '16px 20px' }}
                    />
                </div>

                <div style={{ marginBottom: 28 }}>
                    <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.95rem' }}>
                        📅 Duration — <strong>{duration} {duration === 1 ? 'Day' : 'Days'}</strong>
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={14}
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        disabled={loading}
                        style={{ width: '100%', marginTop: 8, accentColor: '#6366f1', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                        <span>1 Day</span>
                        <span>14 Days</span>
                    </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                    <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.95rem' }}>
                        💰 Budget Level
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginTop: 8 }}>
                        {BUDGETS.map((b) => {
                            const isActive = budget === b.value;
                            return (
                                <button
                                    type="button"
                                    key={b.value}
                                    onClick={() => setBudget(b.value)}
                                    disabled={loading}
                                    style={{
                                        padding: '20px 16px',
                                        borderRadius: 16,
                                        border: `2px solid ${isActive ? b.color : 'var(--border-color)'}`,
                                        background: isActive ? `${b.color}12` : 'var(--bg-glass)',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        transition: 'all 0.3s',
                                        transform: isActive ? 'scale(1.03)' : 'scale(1)',
                                    }}
                                >
                                    <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>{b.emoji}</div>
                                    <div style={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 700, fontSize: '0.95rem',
                                        color: isActive ? b.color : 'var(--text-primary)',
                                    }}>
                                        {b.label}
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>
                                        {b.desc}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ marginBottom: 32 }}>
                    <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.95rem' }}>
                        🎯 Travel Style
                    </label>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
                        {STYLES.map((s) => {
                            const isActive = travelStyle === s.value;
                            return (
                                <button
                                    type="button"
                                    key={s.value}
                                    onClick={() => setTravelStyle(s.value)}
                                    disabled={loading}
                                    style={{
                                        padding: '12px 22px',
                                        borderRadius: 14,
                                        border: `2px solid ${isActive ? '#6366f1' : 'var(--border-color)'}`,
                                        background: isActive ? 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.08))' : 'var(--bg-glass)',
                                        cursor: 'pointer',
                                        fontSize: '0.88rem',
                                        fontWeight: isActive ? 700 : 500,
                                        color: isActive ? '#6366f1' : 'var(--text-secondary)',
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        transition: 'all 0.3s',
                                        transform: isActive ? 'scale(1.03)' : 'scale(1)',
                                    }}
                                >
                                    <span style={{ fontSize: '1.1rem' }}>{s.emoji}</span>
                                    {s.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading || !destination.trim()}
                    style={{
                        width: '100%',
                        padding: '18px',
                        fontSize: '1.1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    }}
                >
                    {loading ? (
                        <>
                            <span style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                            Generating...
                        </>
                    ) : '🚀 Generate AI Trip Plan'}
                </button>
            </div>
        </form>
    );
}
