import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (isAuthenticated) return <Navigate to="/plan" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login({ email, password });
            navigate('/plan');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex' }}>
            <div style={{
                flex: '1 1 50%',
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                padding: '60px 48px', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 60%)', top: '-10%', left: '-5%', filter: 'blur(40px)', animation: 'orbFloat1 12s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15), transparent 60%)', bottom: '-5%', right: '-5%', filter: 'blur(50px)', animation: 'orbFloat2 10s ease-in-out infinite' }} />
                <div className="animate-fade-in-up" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 440 }}>
                    <div className="animate-float" style={{ fontSize: '4rem', marginBottom: 24, filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))' }}>✈️</div>
                    <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#fff', marginBottom: 12, lineHeight: 1.1 }}>Welcome Back</h1>
                    <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 32 }}>
                        Sign in to access your AI-powered trip plans, saved itineraries, and personalized travel recommendations.
                    </p>
                    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {['🤖 Gemini AI', '🗺️ Google Maps', '₹ INR Budget'].map(t => (
                            <span key={t} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500, padding: '6px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20 }}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ flex: '1 1 50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'var(--bg-primary)' }}>
                <div className="animate-slide-right" style={{ width: '100%', maxWidth: 400 }}>
                    <div style={{ marginBottom: 32 }}>
                        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.8rem', marginBottom: 8 }}>Sign In</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Enter your credentials to continue</p>
                    </div>
                    {error && (
                        <div className="animate-scale-in" style={{ padding: '14px 18px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 14, color: '#ef4444', fontSize: '0.88rem', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span>⚠️</span> {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 20 }}>
                            <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>📧 Email</label>
                            <input type="email" className="input-field" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} autoFocus />
                        </div>
                        <div style={{ marginBottom: 28 }}>
                            <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>🔒 Password</label>
                            <input type="password" className="input-field" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} minLength={6} />
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '1rem' }}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                                    Signing in...
                                </span>
                            ) : 'Sign In →'}
                        </button>
                    </form>
                    <p style={{ textAlign: 'center', marginTop: 28, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Create one free →</Link>
                    </p>
                </div>
            </div>
            <style>{`
        @media (max-width: 900px) {
          div[style*="flex: 1 1 50%"]:first-child { display: none !important; }
          div[style*="flex: 1 1 50%"]:last-child { flex: 1 !important; }
        }
      `}</style>
        </div>
    );
}
