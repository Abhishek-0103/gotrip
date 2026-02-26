import { useRef } from 'react';
import BudgetChart from './BudgetChart';
import HotelCard from './HotelCard';
import DayCard from './DayCard';
import MapEmbed from './MapEmbed';

export default function ItineraryView({ tripData, placeDetails, mapEmbedUrl, onSave, saving = false }) {
    const contentRef = useRef(null);

    if (!tripData) return null;

    const bgImage = placeDetails?.photoUrl;

    const handleExportPDF = async () => {
        if (!contentRef.current) return;
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const opt = {
                margin: [10, 10],
                filename: `GoTrip-${tripData.destination || 'trip'}.pdf`,
                image: { type: 'jpeg', quality: 0.95 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };
            await html2pdf().set(opt).from(contentRef.current).save();
        } catch {
            alert('PDF export failed. Please try again.');
        }
    };

    return (
        <div ref={contentRef} style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{
                borderRadius: 24,
                overflow: 'hidden',
                marginBottom: 36,
                position: 'relative',
                minHeight: 340,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                background: bgImage
                    ? `url(${bgImage}) center/cover`
                    : 'linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)',
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)',
                }} />

                <div style={{ position: 'relative', zIndex: 1, padding: '32px 36px' }}>
                    <h1 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                        color: '#fff',
                        marginBottom: 10,
                        textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                    }}>
                        📍 {tripData.destination}
                    </h1>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                        {[
                            `📅 ${tripData.duration} Days`,
                            `💰 ${tripData.budgetCategory?.charAt(0).toUpperCase() + tripData.budgetCategory?.slice(1)}`,
                            tripData.totalEstimatedBudget ? `💵 ${tripData.totalEstimatedBudget}` : null,
                        ].filter(Boolean).map((tag) => (
                            <span key={tag} style={{
                                padding: '6px 16px',
                                background: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: 20,
                                color: '#fff',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                border: '1px solid rgba(255,255,255,0.15)',
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        {onSave && (
                            <button
                                className="btn-primary"
                                onClick={onSave}
                                disabled={saving}
                                style={{ padding: '12px 28px', fontSize: '0.9rem' }}
                            >
                                {saving ? 'Saving...' : '💾 Save Trip'}
                            </button>
                        )}
                        <button
                            className="btn-outline"
                            onClick={handleExportPDF}
                            style={{
                                padding: '12px 28px', fontSize: '0.9rem',
                                color: '#fff', borderColor: 'rgba(255,255,255,0.4)',
                            }}
                        >
                            📄 Export PDF
                        </button>
                    </div>
                </div>
            </div>

            {tripData.budgetBreakdown && (
                <div style={{ marginBottom: 32 }}>
                    <BudgetChart
                        budgetBreakdown={tripData.budgetBreakdown}
                        totalBudget={tripData.totalEstimatedBudget}
                    />
                </div>
            )}

            {tripData.transportSuggestions && (
                <div className="glass-card" style={{ padding: '24px 28px', marginBottom: 32 }}>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        marginBottom: 16,
                        display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        🚗 Getting There & Around
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                        {Object.entries(tripData.transportSuggestions).map(([key, val]) => (
                            <div key={key} style={{
                                padding: '16px 20px',
                                borderRadius: 14,
                                background: 'rgba(99, 102, 241, 0.05)',
                                border: '1px solid rgba(99, 102, 241, 0.15)',
                            }}>
                                <span style={{
                                    fontSize: '0.78rem', fontWeight: 700,
                                    color: '#6366f1', textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}>
                                    {key === 'reachingDestination' ? '✈️ Reaching There' : '🚌 Local Transport'}
                                </span>
                                <p style={{
                                    fontSize: '0.88rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.6,
                                    marginTop: 6,
                                }}>
                                    {val}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tripData.hotels?.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        marginBottom: 16,
                        display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        🏨 Recommended Hotels
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 20,
                    }}>
                        {tripData.hotels.map((hotel, i) => (
                            <HotelCard key={hotel.name || i} hotel={hotel} index={i} />
                        ))}
                    </div>
                </div>
            )}

            {mapEmbedUrl && (
                <div style={{ marginBottom: 32 }}>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        marginBottom: 16,
                        display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        🗺️ Destination Map
                    </h3>
                    <MapEmbed url={mapEmbedUrl} />
                </div>
            )}

            {tripData.itinerary?.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        marginBottom: 16,
                        display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        📋 Day-by-Day Itinerary
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {tripData.itinerary.map((day) => (
                            <DayCard key={day.day} day={day} destination={tripData.destination} />
                        ))}
                    </div>
                </div>
            )}

            {tripData.tips?.length > 0 && (
                <div className="glass-card" style={{ padding: '24px 28px', marginBottom: 32 }}>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        marginBottom: 16,
                        display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        💡 Travel Tips
                    </h3>
                    <div style={{ display: 'grid', gap: 10 }}>
                        {tripData.tips.map((tip, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: 12, alignItems: 'flex-start',
                                padding: '12px 16px',
                                borderRadius: 12,
                                background: 'rgba(16, 185, 129, 0.05)',
                                border: '1px solid rgba(16, 185, 129, 0.15)',
                            }}>
                                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>✓</span>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    {tip}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
