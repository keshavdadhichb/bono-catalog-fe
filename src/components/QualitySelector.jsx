import React from 'react'

const QUALITY_OPTIONS = [
    {
        value: "1K",
        label: "1K",
        desc: "Fast",
        cost: "₹2-3",
        icon: "⚡"
    },
    {
        value: "2K",
        label: "2K",
        desc: "Balanced",
        cost: "₹3-4",
        icon: "⚖️"
    },
    {
        value: "4K",
        label: "4K",
        desc: "Best",
        cost: "₹4-5",
        icon: "✨"
    }
]

const styles = {
    container: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '0.5rem'
    },
    option: (isSelected) => ({
        flex: 1,
        padding: '0.75rem 0.5rem',
        borderRadius: '12px',
        border: isSelected ? '2px solid var(--accent-primary)' : '2px solid var(--border-color)',
        background: isSelected ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        textAlign: 'center',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
    }),
    icon: {
        fontSize: '1.2rem',
        marginBottom: '0.25rem'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: 700,
        color: 'var(--text-primary)'
    },
    desc: {
        fontSize: '0.65rem',
        color: 'var(--text-muted)',
        marginTop: '0.15rem'
    },
    cost: {
        fontSize: '0.6rem',
        color: 'var(--text-tertiary)',
        marginTop: '0.25rem',
        background: 'var(--bg-primary)',
        padding: '0.15rem 0.4rem',
        borderRadius: '8px',
        display: 'inline-block'
    }
}

export default function QualitySelector({ selected, onSelect }) {
    return (
        <div style={styles.container}>
            {QUALITY_OPTIONS.map(opt => (
                <div
                    key={opt.value}
                    onClick={() => onSelect(opt.value)}
                    style={styles.option(selected === opt.value)}
                    onMouseEnter={(e) => {
                        if (selected !== opt.value) {
                            e.currentTarget.style.borderColor = 'var(--text-muted)'
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (selected !== opt.value) {
                            e.currentTarget.style.borderColor = 'var(--border-color)'
                        }
                    }}
                >
                    <div style={styles.icon}>{opt.icon}</div>
                    <div style={styles.label}>{opt.label}</div>
                    <div style={styles.desc}>{opt.desc}</div>
                    <div style={styles.cost}>{opt.cost}/image</div>
                </div>
            ))}
        </div>
    )
}
