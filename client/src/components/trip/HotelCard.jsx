import { useState } from 'react';

const GRADIENTS = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
];

export default function HotelCard({ hotel, index = 0 }) {
    const photoSrc = hotel.imageUrl || hotel.photoUrl;
    const [imgFailed, setImgFailed] = useState(false);
    const showImage = photoSrc && !imgFailed;
    const gradient = GRADIENTS[index % GRADIENTS.length];

    const stars = [];
    const rating = Number(hotel.rating) || 4;
    for (let i = 0; i < 5; i++) {
        stars.push(i < Math.round(rating) ? '⭐' : '☆');
    }

    return (
        <div className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{
                height: 200,
                position: 'relative',
                background: gradient,
                overflow: 'hidden',
            }}>
                {showImage && (
                    <img
                        src={photoSrc}
                        alt={hotel.name}
                        onError={() => setImgFailed(true)}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                )}

                {!showImage && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 20, textAlign: 'center',
                    }}>
                        <span style={{
                            fontSize: '3rem',
                            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                        }}>🏨</span>
                    </div>
                )}

                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }} />

                <div style={{
                    position: 'absolute', top: 12, right: 12,
                    padding: '6px 12px',
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 10,
                    color: '#fbbf24',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex', alignItems: 'center', gap: 4,
                }}>
                    ⭐ {hotel.rating}
                </div>

                <h3 style={{
                    position: 'absolute',
                    bottom: 14, left: 16, right: 16,
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#fff',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                    lineHeight: 1.3,
                    zIndex: 1,
                }}>
                    {hotel.name}
                </h3>
            </div>

            <div style={{ padding: '18px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {hotel.description && (
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        marginBottom: 14,
                        flex: 1,
                    }}>
                        {hotel.description}
                    </p>
                )}

                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 14, flexWrap: 'wrap', gap: 8,
                }}>
                    <div>
                        <span style={{
                            fontSize: '1.05rem', fontWeight: 800,
                            fontFamily: "'Outfit', sans-serif",
                            color: 'var(--text-primary)',
                        }}>
                            {hotel.priceRange}
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: 1, fontSize: '0.65rem' }}>
                        {stars.map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                </div>

                {hotel.mapsLink && (
                    <a
                        href={hotel.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            padding: '12px',
                            background: 'linear-gradient(135deg, #4285f4, #34a853)',
                            color: '#fff', fontWeight: 600, borderRadius: 12,
                            textDecoration: 'none', fontSize: '0.88rem',
                            transition: 'all 0.3s',
                        }}
                    >
                        📍 View on Google Maps
                    </a>
                )}
            </div>
        </div>
    );
}
