import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
    { icon: '🤖', title: 'AI-Powered Plans', desc: 'Personalized day-by-day itineraries crafted by Google Gemini AI in seconds', gradient: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.06))' },
    { icon: '🏨', title: 'Real Hotels', desc: 'Verified hotel picks with ratings, live images, and Google Maps links', gradient: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(251,146,60,0.06))' },
    { icon: '📊', title: 'Budget Insights', desc: 'Visual cost breakdown — know exactly where every rupee goes', gradient: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(52,211,153,0.06))' },
    { icon: '🗺️', title: 'Live Maps', desc: 'Embedded Google Maps preview for destinations and every hotel', gradient: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(96,165,250,0.06))' },
    { icon: '💾', title: 'Save & Export', desc: 'Save trips to your dashboard and download as printable PDFs', gradient: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(244,114,182,0.06))' },
    { icon: '🎨', title: 'Premium UI', desc: 'Glassmorphism design with dark mode, animations, and responsive layout', gradient: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(167,139,250,0.06))' },
];

const DESTINATIONS = [
    { name: 'Goa', emoji: '🏖️', tagline: 'Beaches & Nightlife' },
    { name: 'Manali', emoji: '🏔️', tagline: 'Mountains & Snow' },
    { name: 'Jaipur', emoji: '🏰', tagline: 'Culture & Heritage' },
    { name: 'Kerala', emoji: '🌴', tagline: 'Backwaters & Nature' },
    { name: 'Varanasi', emoji: '🕉️', tagline: 'Spiritual & Ancient' },
    { name: 'Udaipur', emoji: '💕', tagline: 'Romance & Lakes' },
];

const STATS = [
    { value: '50+', label: 'Destinations' },
    { value: '₹0', label: 'Cost to Use' },
    { value: '30s', label: 'Generation Time' },
    { value: '24/7', label: 'AI Available' },
];

export default function Home() {
    const { isAuthenticated } = useAuth();

    return (
        <div style={{ width: '100%' }}>

            <section style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 24px',
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)',
                position: 'relative',
                overflow: 'hidden',
                marginTop: -70,
                paddingTop: 70,
            }}>
                <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.25), transparent 60%)', top: '-10%', left: '-5%', filter: 'blur(40px)', animation: 'orbFloat1 14s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent 60%)', bottom: '-15%', right: '-8%', filter: 'blur(50px)', animation: 'orbFloat2 11s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent 60%)', top: '40%', left: '60%', filter: 'blur(40px)', animation: 'orbFloat1 9s ease-in-out infinite reverse' }} />

                <div className="animate-fade-in-up" style={{ position: 'relative', zIndex: 1, maxWidth: 820 }}>
                    <div className="animate-float" style={{ fontSize: '5rem', marginBottom: 20, filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))' }}>✈️</div>
                    <h1 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                        color: '#ffffff',
                        marginBottom: 12,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                    }}>
                        GoTrip <span style={{ background: 'linear-gradient(135deg, #fb923c, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pro</span>
                    </h1>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 2.8vw, 1.5rem)',
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: 10,
                        fontWeight: 300,
                        letterSpacing: '0.02em',
                    }}>
                        AI Smart Travel Planner
                    </p>
                    <p style={{
                        fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                        color: 'rgba(255,255,255,0.55)',
                        maxWidth: 520,
                        margin: '0 auto 40px',
                        lineHeight: 1.7,
                    }}>
                        Plan your dream trip in seconds — AI-generated itineraries, real hotel picks,
                        budget breakdowns, and interactive maps. All in Indian Rupees (₹).
                    </p>

                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link
                            to={isAuthenticated ? '/plan' : '/register'}
                            className="btn-primary"
                            style={{
                                padding: '18px 44px',
                                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                fontSize: '1.1rem',
                                textDecoration: 'none',
                                boxShadow: '0 8px 30px rgba(249,115,22,0.4)',
                                borderRadius: 16,
                            }}
                        >
                            🚀 Start Planning — Free
                        </Link>
                        {!isAuthenticated && (
                            <Link
                                to="/login"
                                style={{
                                    padding: '18px 40px',
                                    background: 'rgba(255,255,255,0.08)',
                                    color: '#ffffff',
                                    fontWeight: 600,
                                    borderRadius: 16,
                                    fontSize: '1.05rem',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                }}
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    <div style={{
                        marginTop: 56,
                        display: 'flex',
                        gap: 0,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {STATS.map((s, i) => (
                            <div key={s.label} style={{
                                padding: '16px 28px',
                                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                            }}>
                                <div style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '1.6rem',
                                    color: '#fff',
                                    marginBottom: 2,
                                }}>
                                    {s.value}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: 28,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    animation: 'float 2s ease-in-out infinite',
                }}>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
                    <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.3)' }}>↓</span>
                </div>
            </section>

            <section style={{
                padding: '72px 24px',
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-color)',
            }}>
                <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        textAlign: 'center',
                        marginBottom: 8,
                    }}>
                        🔥 Popular Destinations
                    </h2>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 40, fontSize: '0.95rem' }}>
                        Generate AI itineraries for India's most loved travel spots
                    </p>

                    <div className="stagger-children" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: 16,
                    }}>
                        {DESTINATIONS.map(d => (
                            <Link
                                key={d.name}
                                to={isAuthenticated ? '/plan' : '/register'}
                                className="glass-card"
                                style={{
                                    padding: '28px 16px',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{ fontSize: '2.5rem', marginBottom: 10, transition: 'transform 0.3s' }}>{d.emoji}</div>
                                <div style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '1.08rem',
                                    color: 'var(--text-primary)',
                                    marginBottom: 4,
                                }}>
                                    {d.name}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.tagline}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: '88px 24px' }}>
                <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        textAlign: 'center',
                        marginBottom: 8,
                    }}>
                        Everything You Need
                    </h2>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 52, fontSize: '0.95rem' }}>
                        A complete AI travel platform — not a classroom demo
                    </p>

                    <div
                        className="stagger-children"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: 24,
                        }}
                    >
                        {FEATURES.map((f) => (
                            <div key={f.title} className="glass-card" style={{ padding: '32px 28px', background: f.gradient }}>
                                <div style={{
                                    fontSize: '2.6rem', marginBottom: 16,
                                    width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    borderRadius: 14,
                                    background: 'var(--bg-glass)',
                                    border: '1px solid var(--border-color)',
                                }}>
                                    {f.icon}
                                </div>
                                <h3 style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '1.15rem',
                                    marginBottom: 8,
                                    color: 'var(--text-primary)',
                                }}>
                                    {f.title}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{
                padding: '88px 24px',
                background: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
            }}>
                <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        marginBottom: 52,
                    }}>
                        How It Works
                    </h2>
                    <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {[
                            { step: '01', title: 'Enter Details', desc: 'Pick destination, duration, budget & travel style', icon: '📝' },
                            { step: '02', title: 'AI Generates', desc: 'Gemini AI creates your personalized itinerary in ~30s', icon: '🤖' },
                            { step: '03', title: 'Explore & Save', desc: 'View maps, hotels, budget chart — save or export as PDF', icon: '🗺️' },
                        ].map((s, i) => (
                            <div key={s.step} style={{ flex: '1 1 220px', minWidth: 200, position: 'relative' }}>
                                {i < 2 && (
                                    <div style={{
                                        display: 'none',
                                        position: 'absolute', top: 32, left: '100%', width: 40, height: 2,
                                        background: 'var(--border-color)',
                                    }} />
                                )}
                                <div style={{
                                    width: 72, height: 72, borderRadius: 20,
                                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 18px',
                                    fontSize: '1.8rem',
                                    boxShadow: '0 8px 24px rgba(79,70,229,0.3)',
                                    transition: 'transform 0.3s',
                                }}>
                                    {s.icon}
                                </div>
                                <div style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '0.7rem',
                                    color: 'var(--color-primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: 6,
                                }}>
                                    Step {s.step}
                                </div>
                                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, marginBottom: 6, fontSize: '1.1rem' }}>{s.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: '48px 24px', textAlign: 'center' }}>
                <p style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: 18,
                    fontWeight: 600,
                }}>
                    Built With
                </p>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['React', 'Node.js', 'MongoDB', 'Gemini AI', 'Google Maps', 'Express'].map(t => (
                        <span key={t} style={{
                            padding: '8px 18px',
                            borderRadius: 12,
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            background: 'var(--bg-glass)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-secondary)',
                        }}>
                            {t}
                        </span>
                    ))}
                </div>
            </section>

            <section style={{
                padding: '88px 24px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #0f0c29, #302b63)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent 60%)', top: '-20%', right: '-5%', filter: 'blur(50px)', animation: 'orbFloat2 8s ease-in-out infinite' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        marginBottom: 12,
                        color: '#fff',
                    }}>
                        Ready to Explore India? 🇮🇳
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 36, fontSize: '1rem', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7 }}>
                        Create your free account and generate your first AI trip plan in under 30 seconds.
                    </p>
                    <Link
                        to={isAuthenticated ? '/plan' : '/register'}
                        className="btn-primary"
                        style={{
                            padding: '18px 48px',
                            background: 'linear-gradient(135deg, #f97316, #ea580c)',
                            fontSize: '1.1rem',
                            textDecoration: 'none',
                            boxShadow: '0 8px 30px rgba(249,115,22,0.4)',
                            borderRadius: 16,
                        }}
                    >
                        ✨ Get Started Free
                    </Link>
                </div>
            </section>
        </div>
    );
}
