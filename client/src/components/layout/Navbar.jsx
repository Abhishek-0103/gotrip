import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const showSolid = !isHome || scrolled;

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            width: '100%',
            padding: '0 32px',
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: showSolid ? 'var(--bg-secondary)' : 'transparent',
            borderBottom: showSolid ? '1px solid var(--border-color)' : 'none',
            backdropFilter: showSolid ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: showSolid ? 'blur(20px)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            boxShadow: showSolid ? 'var(--shadow-sm)' : 'none',
        }}>
            <Link to="/" style={{
                display: 'flex', alignItems: 'center', gap: 10,
                textDecoration: 'none',
            }}>
                <span style={{ fontSize: '1.5rem', transition: 'transform 0.3s' }}>✈️</span>
                <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '1.35rem',
                    background: 'linear-gradient(135deg, #4f46e5, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    GoTrip Pro
                </span>
            </Link>

            {isAuthenticated && (
                <div style={{
                    display: 'flex', gap: 6,
                    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                }}>
                    {[
                        { to: '/plan', label: '✨ Plan Trip' },
                        { to: '/dashboard', label: '📋 My Trips' },
                    ].map((link) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                style={{
                                    padding: '10px 22px',
                                    borderRadius: 12,
                                    fontSize: '0.9rem',
                                    fontWeight: isActive ? 700 : 500,
                                    color: isActive ? '#fff' : (isHome && !scrolled ? '#fff' : 'var(--text-secondary)'),
                                    background: isActive ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'transparent',
                                    textDecoration: 'none',
                                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                                    boxShadow: isActive ? '0 4px 14px rgba(79,70,229,0.3)' : 'none',
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ThemeToggle />

                {isAuthenticated ? (
                    <>
                        <span style={{
                            fontSize: '0.85rem',
                            color: isHome && !scrolled ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
                            fontWeight: 500,
                            padding: '6px 14px',
                            borderRadius: 10,
                            background: showSolid ? 'var(--bg-glass)' : 'rgba(255,255,255,0.1)',
                            border: '1px solid var(--border-color)',
                            transition: 'all 0.3s',
                        }}>
                            👤 {user?.name?.split(' ')[0]}
                        </span>
                        <button
                            onClick={logout}
                            style={{
                                padding: '9px 22px',
                                border: '2px solid var(--color-danger)',
                                background: 'transparent',
                                color: 'var(--color-danger)',
                                borderRadius: 12,
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={(e) => { e.target.style.background = 'var(--color-danger)'; e.target.style.color = '#fff'; }}
                            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--color-danger)'; }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            style={{
                                padding: '9px 24px',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                color: isHome && !scrolled ? '#fff' : 'var(--text-primary)',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                            }}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            style={{
                                padding: '10px 28px',
                                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                borderRadius: 12,
                                textDecoration: 'none',
                                boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
                                transition: 'all 0.3s',
                            }}
                        >
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
