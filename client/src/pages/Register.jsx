import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (isAuthenticated) return <Navigate to="/plan" replace />;

    const passwordStrength = () => {
        if (!password) return { level: 0, label: '', color: '' };
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        if (score <= 1) return { level: 1, label: 'Weak', color: '#ef4444' };
        if (score <= 3) return { level: 2, label: 'Medium', color: '#f59e0b' };
        return { level: 3, label: 'Strong', color: '#10b981' };
    };

    const strength = passwordStrength();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return;
        setLoading(true);
        setError('');
        try {
            await register({ name, email, password });
            navigate('/plan');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex' }}>
            <div style={{
                flex: '1 1 50%', background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                padding: '60px 48px', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.2), transparent 60%)', top: '-8%', right: '-5%', filter: 'blur(40px)', animation: 'orbFloat1 11s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 60%)', bottom: '-5%', left: '-5%', filter: 'blur(50px)', animation: 'orbFloat2 9s ease-in-out infinite' }} />
                <div className="animate-fade-in-up" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 440 }}>
                    <div className="animate-float" style={{ fontSize: '4rem', marginBottom: 24, filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))' }}>🌍</div>
                    <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#fff', marginBottom: 12, lineHeight: 1.1 }}>Start Your Journey</h1>
                    <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 32 }}>
                        Create a free account and unlock AI-powered travel planning with personalized itineraries, real hotel recommendations, and detailed budget breakdowns.
                    </p>
                    <div style={{ textAlign: 'left', maxWidth: 300, margin: '0 auto' }}>
                        {['✅ AI-generated day-by-day plans', '✅ Real hotels with ratings', '✅ Budget breakdown in ₹', '✅ Google Maps integration', '✅ Save & export as PDF'].map(f => (
                            <p key={f} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', marginBottom: 8 }}>{f}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ flex: '1 1 50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'var(--bg-primary)', overflowY: 'auto' }}>
                <div className="animate-slide-right" style={{ width: '100%', maxWidth: 420 }}>
                    <div style={{ marginBottom: 28 }}>
                        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.8rem', marginBottom: 8 }}>Create Account</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Free forever • No credit card required</p>
                    </div>
                    {error && (
                        <div className="animate-scale-in" style={{ padding: '14px 18px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 14, color: '#ef4444', fontSize: '0.88rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span>⚠️</span> {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 18 }}>
                            <label className="label">👤 Full Name</label>
                            <input type="text" className="input-field" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} minLength={2} autoFocus />
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <label className="label">📧 Email</label>
                            <input type="email" className="input-field" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
                        </div>
                        <div style={{ marginBottom: 6 }}>
                            <label className="label">🔒 Password</label>
                            <input type="password" className="input-field" placeholder="Min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} minLength={6} />
                        </div>
                        {password && (
                            <div style={{ marginBottom: 18 }}>
                                <div style={{ height: 4, borderRadius: 2, background: 'var(--border-color)', overflow: 'hidden', marginBottom: 4 }}>
                                    <div style={{ height: '100%', width: `${(strength.level / 3) * 100}%`, background: strength.color, borderRadius: 2, transition: 'all 0.4s ease' }} />
                                </div>
                                <span style={{ fontSize: '0.75rem', color: strength.color, fontWeight: 600 }}>{strength.label}</span>
                            </div>
                        )}
                        <div style={{ marginBottom: 24 }}>
                            <label className="label">🔒 Confirm Password</label>
                            <input type="password" className="input-field" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={loading} minLength={6}
                                style={{ borderColor: confirmPassword && password !== confirmPassword ? 'rgba(239, 68, 68, 0.5)' : confirmPassword && password === confirmPassword ? 'rgba(16, 185, 129, 0.5)' : undefined }} />
                            {password && confirmPassword && password !== confirmPassword && (<p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: 4 }}>Passwords do not match</p>)}
                            {password && confirmPassword && password === confirmPassword && (<p style={{ color: '#10b981', fontSize: '0.78rem', marginTop: 4 }}>✓ Passwords match</p>)}
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading || (password !== confirmPassword) || !name || !email} style={{ width: '100%', padding: '16px', fontSize: '1rem' }}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                                    Creating account...
                                </span>
                            ) : '🚀 Create Account'}
                        </button>
                    </form>
                    <p style={{ textAlign: 'center', marginTop: 28, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Sign in →</Link>
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
