export default function Footer() {
    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)',
            padding: '48px 32px 28px',
        }}>
            <div style={{
                maxWidth: 1320,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 40,
                marginBottom: 40,
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: '1.4rem' }}>✈️</span>
                        <span style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 800,
                            fontSize: '1.2rem',
                            background: 'linear-gradient(135deg, #4f46e5, #a855f7)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            GoTrip Pro
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: 260 }}>
                        AI-powered travel planner that generates personalized itineraries with budget breakdowns and real hotel recommendations.
                    </p>
                </div>

                <div>
                    <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, marginBottom: 14, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        Built With
                    </h4>
                    {['React + Vite', 'Node.js + Express', 'MongoDB + Mongoose', 'Google Gemini AI', 'Google Maps API'].map(t => (
                        <p key={t} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 6 }}>{t}</p>
                    ))}
                </div>

                <div>
                    <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, marginBottom: 14, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        Features
                    </h4>
                    {['AI Itineraries', 'Hotel Recommendations', 'Budget Breakdown', 'Interactive Maps', 'Dark Mode'].map(t => (
                        <p key={t} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 6 }}>{t}</p>
                    ))}
                </div>

                <div>
                    <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, marginBottom: 14, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        Project
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 6 }}>B.Tech Final Year Project</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 6 }}>Full-Stack Development</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 6 }}>AI + API Integration</p>
                </div>
            </div>

            <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: 20,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
            }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    © {new Date().getFullYear()} GoTrip Pro — AI Smart Travel Planner
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    Made with ❤️ using React, Express, MongoDB & Gemini AI
                </p>
            </div>
        </footer>
    );
}
