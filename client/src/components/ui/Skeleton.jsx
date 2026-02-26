export default function Skeleton({ width = '100%', height = 20, borderRadius = 12, style = {} }) {
    return (
        <div
            className="skeleton"
            style={{ width, height, borderRadius, ...style }}
        />
    );
}

export function TripSkeleton() {
    return (
        <div className="animate-fade-in" style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px' }}>
            <div className="glass-card" style={{
                padding: '40px 32px',
                textAlign: 'center',
                marginBottom: 32,
                background: 'linear-gradient(135deg, rgba(79,70,229,0.05), rgba(168,85,247,0.05))',
            }}>
                <div className="animate-pulse" style={{ fontSize: '3rem', marginBottom: 16 }}>🤖</div>
                <h3 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '1.3rem',
                    marginBottom: 8,
                }}>
                    AI is crafting your trip...
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 20 }}>
                    Generating itinerary, finding hotels, building budget breakdown
                </p>
                <div style={{
                    height: 4,
                    borderRadius: 2,
                    background: 'var(--border-color)',
                    maxWidth: 300,
                    margin: '0 auto',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        height: '100%',
                        borderRadius: 2,
                        background: 'linear-gradient(90deg, #4f46e5, #a855f7, #ec4899)',
                        animation: 'progressBar 2.5s ease-in-out infinite alternate',
                    }} />
                </div>
            </div>

            <div style={{ marginBottom: 24 }}>
                <Skeleton height={12} width={100} style={{ marginBottom: 10 }} />
                <Skeleton height={220} borderRadius={20} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
                {[1, 2, 3].map((i) => (
                    <div key={i}>
                        <Skeleton height={200} borderRadius={20} />
                    </div>
                ))}
            </div>

            {[1, 2].map((i) => (
                <Skeleton key={i} height={140} borderRadius={20} style={{ marginBottom: 16 }} />
            ))}
        </div>
    );
}
