export default function MapEmbed({ url }) {
    if (!url) return null;

    return (
        <div className="glass-card" style={{
            padding: 0,
            overflow: 'hidden',
            borderRadius: 20,
        }}>
            <iframe
                title="Destination Map"
                src={url}
                style={{
                    width: '100%',
                    height: 380,
                    border: 'none',
                    display: 'block',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}
