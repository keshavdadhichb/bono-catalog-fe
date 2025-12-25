import React from 'react'

// Layout configurations with visual descriptions
const LAYOUTS = {
    hero_bottom: {
        name: "Hero Bottom",
        description: "Large headline at bottom, model above",
        textFields: ["headline", "subtext"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#1a1a1a" rx="4" />
                <rect x="5" y="5" width="80" height="100" fill="#3a3a3a" rx="2" />
                <circle cx="45" cy="50" r="15" fill="#666" />
                <rect x="30" y="70" width="30" height="30" fill="#666" />
                <rect x="10" y="115" width="70" height="12" fill="#4a9eff" rx="2" />
                <rect x="20" y="132" width="50" height="6" fill="#666" rx="1" />
            </svg>
        )
    },
    split_vertical: {
        name: "Split Vertical",
        description: "Image left, text panel right",
        textFields: ["headline", "subtext", "price"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#1a1a1a" rx="4" />
                <rect x="5" y="5" width="40" height="150" fill="#3a3a3a" rx="2" />
                <circle cx="25" cy="60" r="12" fill="#666" />
                <rect x="15" y="75" width="20" height="25" fill="#666" />
                <rect x="50" y="5" width="35" height="150" fill="#2a2a2a" rx="2" />
                <rect x="55" y="50" width="25" height="8" fill="#4a9eff" rx="1" />
                <rect x="55" y="62" width="20" height="4" fill="#666" rx="1" />
                <rect x="55" y="80" width="15" height="6" fill="#4a9" rx="1" />
            </svg>
        )
    },
    magazine_cover: {
        name: "Magazine Cover",
        description: "Title at top, model center, details at bottom",
        textFields: ["brand", "headline", "subtext"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#1a1a1a" rx="4" />
                <rect x="20" y="8" width="50" height="10" fill="#ff4a4a" rx="2" />
                <rect x="5" y="25" width="80" height="100" fill="#3a3a3a" rx="2" />
                <circle cx="45" cy="60" r="18" fill="#666" />
                <rect x="28" y="82" width="34" height="40" fill="#666" />
                <rect x="15" y="132" width="60" height="8" fill="#4a9eff" rx="1" />
                <rect x="25" y="145" width="40" height="5" fill="#666" rx="1" />
            </svg>
        )
    },
    minimal_corner: {
        name: "Minimal Corner",
        description: "Small text in corner, model dominates",
        textFields: ["brand", "tagline"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#1a1a1a" rx="4" />
                <rect x="5" y="5" width="80" height="150" fill="#3a3a3a" rx="2" />
                <circle cx="45" cy="70" r="25" fill="#666" />
                <rect x="25" y="100" width="40" height="50" fill="#666" />
                <rect x="8" y="10" width="20" height="6" fill="#4a9eff" rx="1" />
            </svg>
        )
    },
    overlay_gradient: {
        name: "Overlay Gradient",
        description: "Gradient overlay with text on image",
        textFields: ["headline", "subtext", "cta"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#3a3a3a" rx="4" />
                <circle cx="45" cy="60" r="22" fill="#666" />
                <rect x="25" y="85" width="40" height="45" fill="#666" />
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="50%" stopColor="transparent" />
                        <stop offset="100%" stopColor="#000" stopOpacity="0.8" />
                    </linearGradient>
                </defs>
                <rect x="0" y="0" width="90" height="160" fill="url(#grad)" rx="4" />
                <rect x="10" y="120" width="70" height="10" fill="#4a9eff" rx="2" />
                <rect x="20" y="135" width="50" height="5" fill="#fff" fillOpacity="0.8" rx="1" />
                <rect x="30" y="146" width="30" height="8" fill="#ff4a4a" rx="2" />
            </svg>
        )
    },
    framed_border: {
        name: "Framed Border",
        description: "White border frame around image",
        textFields: ["headline", "subtext"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#1a1a1a" rx="4" />
                <rect x="8" y="8" width="74" height="110" fill="#fff" rx="2" />
                <rect x="12" y="12" width="66" height="102" fill="#3a3a3a" rx="2" />
                <circle cx="45" cy="50" r="15" fill="#666" />
                <rect x="32" y="68" width="26" height="40" fill="#666" />
                <rect x="15" y="125" width="60" height="10" fill="#4a9eff" rx="2" />
                <rect x="25" y="140" width="40" height="5" fill="#666" rx="1" />
            </svg>
        )
    },
    bold_typography: {
        name: "Bold Typography",
        description: "Huge impactful text, model secondary",
        textFields: ["headline"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#1a1a1a" rx="4" />
                <rect x="5" y="10" width="80" height="90" fill="#4a9eff" rx="2" />
                <text x="45" y="50" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">TEXT</text>
                <text x="45" y="75" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">HERE</text>
                <rect x="25" y="105" width="40" height="50" fill="#3a3a3a" rx="2" />
                <circle cx="45" cy="120" r="10" fill="#666" />
                <rect x="35" y="132" width="20" height="20" fill="#666" />
            </svg>
        )
    },
    product_focus: {
        name: "Product Focus",
        description: "Clean, product-centric catalog style",
        textFields: ["headline", "price", "sizes"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#fff" rx="4" />
                <rect x="5" y="20" width="80" height="100" fill="#f5f5f5" rx="2" />
                <circle cx="45" cy="60" r="18" fill="#ddd" />
                <rect x="30" y="82" width="30" height="35" fill="#ddd" />
                <rect x="20" y="8" width="50" height="8" fill="#333" rx="1" />
                <rect x="35" y="128" width="20" height="8" fill="#4a9" rx="1" />
                <rect x="25" y="142" width="40" height="6" fill="#999" rx="1" />
            </svg>
        )
    }
}

export default function LayoutPreview({ selected, onSelect }) {
    return (
        <div className="layout-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem'
        }}>
            {Object.entries(LAYOUTS).map(([key, layout]) => (
                <div
                    key={key}
                    onClick={() => onSelect(key)}
                    className={`layout-option ${selected === key ? 'selected' : ''}`}
                    style={{
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: selected === key ? '2px solid var(--accent)' : '2px solid transparent',
                        background: selected === key ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                        transition: 'all 0.2s'
                    }}
                >
                    <div style={{ height: '80px', marginBottom: '0.5rem' }}>
                        {layout.diagram}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>
                        {layout.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

// Export layout config for text field filtering
export { LAYOUTS }
