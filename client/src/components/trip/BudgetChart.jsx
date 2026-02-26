import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function parseAmount(str) {
    if (!str) return 0;
    const match = str.replace(/,/g, '').match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
}

export default function BudgetChart({ budgetBreakdown, totalBudget }) {
    const categories = [
        { key: 'stay', label: '🏨 Accommodation', color: '#6366f1' },
        { key: 'transport', label: '🚗 Transport', color: '#f59e0b' },
        { key: 'food', label: '🍽️ Food & Dining', color: '#10b981' },
        { key: 'activities', label: '🎯 Activities', color: '#ec4899' },
    ];

    const values = categories.map(c => parseAmount(budgetBreakdown?.[c.key]));
    const total = values.reduce((a, b) => a + b, 0);

    const data = {
        labels: categories.map(c => c.label),
        datasets: [{
            data: values,
            backgroundColor: categories.map(c => c.color),
            borderWidth: 0,
            hoverOffset: 8,
            spacing: 3,
            borderRadius: 6,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                borderRadius: 12,
                titleFont: { family: "'Outfit', sans-serif", size: 13 },
                bodyFont: { family: "'Inter', sans-serif", size: 12 },
                callbacks: {
                    label: (ctx) => {
                        const val = ctx.raw;
                        const pct = total > 0 ? ((val / total) * 100).toFixed(0) : 0;
                        return ` ₹${val.toLocaleString('en-IN')} (${pct}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className="glass-card" style={{ padding: '28px 32px' }}>
            <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '1.2rem',
                marginBottom: 24,
                display: 'flex', alignItems: 'center', gap: 10,
            }}>
                📊 Budget Breakdown
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(200px, 280px) 1fr',
                gap: 32,
                alignItems: 'center',
            }}>
                <div style={{ position: 'relative', height: 260 }}>
                    <Doughnut data={data} options={options} />
                    <div style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Total</div>
                        <div style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 800,
                            fontSize: '1.3rem',
                            color: 'var(--text-primary)',
                        }}>
                            {totalBudget || `₹${total.toLocaleString('en-IN')}`}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {categories.map((cat, i) => {
                        const val = values[i];
                        const pct = total > 0 ? ((val / total) * 100).toFixed(0) : 0;
                        return (
                            <div
                                key={cat.key}
                                style={{
                                    padding: '18px 16px',
                                    borderRadius: 14,
                                    background: `${cat.color}08`,
                                    border: `1px solid ${cat.color}25`,
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                        {cat.label}
                                    </span>
                                    <span style={{
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        color: cat.color,
                                        background: `${cat.color}15`,
                                        padding: '2px 8px',
                                        borderRadius: 6,
                                    }}>
                                        {pct}%
                                    </span>
                                </div>
                                <div style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '1.05rem',
                                    color: 'var(--text-primary)',
                                }}>
                                    ₹{val.toLocaleString('en-IN')}
                                </div>
                                <div style={{
                                    marginTop: 8,
                                    height: 4,
                                    borderRadius: 2,
                                    background: `${cat.color}15`,
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${pct}%`,
                                        background: cat.color,
                                        borderRadius: 2,
                                        transition: 'width 1s ease',
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
