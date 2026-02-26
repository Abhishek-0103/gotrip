const TIME_COLORS = {
    morning: '#f59e0b',
    afternoon: '#3b82f6',
    evening: '#8b5cf6',
    night: '#6366f1',
};

function buildMapsLink(placeName, destination) {
    if (!placeName) return null;
    const query = destination ? `${placeName} ${destination}` : placeName;
    return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
}

export default function DayCard({ day, destination }) {
    return (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{
                padding: '20px 28px',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 8,
            }}>
                <div>
                    <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        color: '#fff',
                    }}>
                        Day {day.day}
                    </span>
                    <span style={{
                        marginLeft: 12,
                        fontSize: '0.95rem',
                        color: 'rgba(255,255,255,0.85)',
                        fontWeight: 400,
                    }}>
                        {day.title}
                    </span>
                </div>
                {day.estimatedDayCost && (
                    <span style={{
                        padding: '6px 16px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: 20,
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        backdropFilter: 'blur(8px)',
                    }}>
                        {day.estimatedDayCost}
                    </span>
                )}
            </div>

            <div style={{ padding: '24px 28px' }}>
                {day.activities?.map((act, i) => {
                    const timeKey = (act.time || '').toLowerCase();
                    const dotColor = TIME_COLORS[timeKey] || '#6366f1';
                    const mapsLink = act.mapsLink || (act.placeName ? buildMapsLink(act.placeName, destination) : null);

                    return (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                gap: 16,
                                marginBottom: i < day.activities.length - 1 ? 20 : 0,
                                position: 'relative',
                            }}
                        >
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 20,
                            }}>
                                <div style={{
                                    width: 14, height: 14, borderRadius: '50%',
                                    background: dotColor,
                                    boxShadow: `0 0 12px ${dotColor}40`,
                                    flexShrink: 0, marginTop: 4,
                                }} />
                                {i < day.activities.length - 1 && (
                                    <div style={{ width: 2, flex: 1, background: 'var(--border-color)', marginTop: 4 }} />
                                )}
                            </div>

                            <div style={{ flex: 1, paddingBottom: 4 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 6 }}>
                                    <span style={{
                                        fontSize: '0.82rem', fontWeight: 700,
                                        color: dotColor, textTransform: 'capitalize',
                                    }}>
                                        {act.time}
                                    </span>
                                    {act.estimatedCost && (
                                        <span style={{
                                            fontSize: '0.78rem', fontWeight: 600,
                                            color: 'var(--text-muted)',
                                            background: 'var(--bg-glass)',
                                            padding: '2px 10px', borderRadius: 8,
                                            border: '1px solid var(--border-color)',
                                        }}>
                                            {act.estimatedCost}
                                        </span>
                                    )}
                                </div>

                                <p style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.55,
                                    marginTop: 4,
                                }}>
                                    {act.activity}
                                </p>

                                {mapsLink && (
                                    <a
                                        href={mapsLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            marginTop: 8,
                                            padding: '5px 14px',
                                            borderRadius: 20,
                                            background: 'linear-gradient(135deg, rgba(66,133,244,0.1), rgba(52,168,83,0.1))',
                                            border: '1px solid rgba(66,133,244,0.2)',
                                            color: '#4285f4',
                                            fontSize: '0.78rem',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            transition: 'all 0.3s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = 'linear-gradient(135deg, #4285f4, #34a853)';
                                            e.target.style.color = '#fff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = 'linear-gradient(135deg, rgba(66,133,244,0.1), rgba(52,168,83,0.1))';
                                            e.target.style.color = '#4285f4';
                                        }}
                                    >
                                        📍 {act.placeName || 'View on Maps'} →
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {day.meals && (
                <div style={{
                    padding: '16px 28px',
                    borderTop: '1px solid var(--border-color)',
                    background: 'var(--bg-glass)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 12,
                }}>
                    {Object.entries(day.meals).map(([meal, detail]) => (
                        <div key={meal} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: '1rem' }}>
                                {meal === 'breakfast' ? '🌅' : meal === 'lunch' ? '☀️' : '🌙'}
                            </span>
                            <div>
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {meal}
                                </span>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                                    {detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
