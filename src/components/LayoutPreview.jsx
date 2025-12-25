import React from 'react'

// Layout configurations with visual descriptions - 12 layouts
const LAYOUTS = {
    hero_bottom: {
        name: "Hero Bottom",
        description: "Large headline at bottom, model above",
        textFields: ["headline", "subtext"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#1a1a1a" rx="4" />
                <rect x="5" y="5" width="80" height="100" fill="#2a2a2a" rx="2" />
                <circle cx="45" cy="45" r="18" fill="#444" />
                <rect x="28" y="68" width="34" height="35" fill="#444" rx="2" />
                <rect x="10" y="115" width="70" height="14" fill="#4a9eff" rx="2" />
                <rect x="20" y="135" width="50" height="8" fill="#666" rx="1" />
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
                <rect x="5" y="5" width="38" height="150" fill="#2a2a2a" rx="2" />
                <circle cx="24" cy="55" r="14" fill="#444" />
                <rect x="12" y="72" width="24" height="35" fill="#444" rx="2" />
                <rect x="48" y="5" width="37" height="150" fill="#222" rx="2" />
                <rect x="53" y="50" width="27" height="10" fill="#4a9eff" rx="1" />
                <rect x="53" y="65" width="22" height="6" fill="#666" rx="1" />
                <rect x="53" y="85" width="18" height="8" fill="#4a9" rx="1" />
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
                <rect x="20" y="8" width="50" height="12" fill="#ff4a4a" rx="2" />
                <rect x="5" y="28" width="80" height="95" fill="#2a2a2a" rx="2" />
                <circle cx="45" cy="62" r="20" fill="#444" />
                <rect x="28" y="86" width="34" height="35" fill="#444" rx="2" />
                <rect x="12" y="130" width="66" height="10" fill="#4a9eff" rx="1" />
                <rect x="22" y="145" width="46" height="6" fill="#666" rx="1" />
            </svg>
        )
    },
    minimal_corner: {
        name: "Minimal Corner",
        description: "Small text in corner, model dominates",
        textFields: ["brand", "tagline"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#2a2a2a" rx="4" />
                <circle cx="45" cy="65" r="28" fill="#444" />
                <rect x="22" y="98" width="46" height="55" fill="#444" rx="2" />
                <rect x="8" y="10" width="22" height="8" fill="#4a9eff" rx="1" />
                <rect x="8" y="22" width="16" height="4" fill="#666" rx="1" />
            </svg>
        )
    },
    overlay_gradient: {
        name: "Gradient Overlay",
        description: "Gradient overlay with text on image",
        textFields: ["headline", "subtext", "cta"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="40%" stopColor="#2a2a2a" />
                        <stop offset="100%" stopColor="#000" />
                    </linearGradient>
                </defs>
                <rect x="0" y="0" width="90" height="160" fill="url(#grad1)" rx="4" />
                <circle cx="45" cy="55" r="22" fill="#444" />
                <rect x="25" y="80" width="40" height="40" fill="#444" rx="2" />
                <rect x="12" y="125" width="66" height="12" fill="#4a9eff" rx="2" />
                <rect x="22" y="142" width="46" height="6" fill="#888" rx="1" />
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
                <rect x="8" y="8" width="74" height="105" fill="#fff" rx="2" />
                <rect x="12" y="12" width="66" height="97" fill="#2a2a2a" rx="2" />
                <circle cx="45" cy="48" r="16" fill="#444" />
                <rect x="30" y="68" width="30" height="38" fill="#444" rx="2" />
                <rect x="15" y="122" width="60" height="12" fill="#4a9eff" rx="2" />
                <rect x="25" y="140" width="40" height="6" fill="#666" rx="1" />
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
                <rect x="5" y="10" width="80" height="80" fill="#4a9eff" rx="2" />
                <text x="45" y="45" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">BIG</text>
                <text x="45" y="70" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">TEXT</text>
                <rect x="25" y="100" width="40" height="55" fill="#2a2a2a" rx="2" />
                <circle cx="45" cy="115" r="12" fill="#444" />
                <rect x="35" y="130" width="20" height="22" fill="#444" rx="1" />
            </svg>
        )
    },
    product_focus: {
        name: "Product Focus",
        description: "Clean, product-centric catalog style",
        textFields: ["headline", "price", "sizes"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#f5f5f5" rx="4" />
                <rect x="20" y="8" width="50" height="10" fill="#333" rx="1" />
                <rect x="10" y="25" width="70" height="95" fill="#e5e5e5" rx="2" />
                <circle cx="45" cy="60" r="18" fill="#ccc" />
                <rect x="30" y="82" width="30" height="35" fill="#ccc" rx="2" />
                <rect x="35" y="128" width="20" height="10" fill="#4a9" rx="1" />
                <rect x="25" y="145" width="40" height="6" fill="#999" rx="1" />
            </svg>
        )
    },
    // NEW LAYOUTS
    diagonal_split: {
        name: "Diagonal Split",
        description: "Dynamic diagonal divide with text",
        textFields: ["headline", "subtext"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#1a1a1a" rx="4" />
                <polygon points="0,0 90,0 90,100 0,160" fill="#2a2a2a" />
                <circle cx="50" cy="55" r="20" fill="#444" />
                <rect x="35" y="78" width="30" height="35" fill="#444" rx="2" />
                <rect x="8" y="125" width="50" height="12" fill="#4a9eff" rx="2" />
                <rect x="8" y="142" width="35" height="6" fill="#666" rx="1" />
            </svg>
        )
    },
    centered_minimal: {
        name: "Centered Minimal",
        description: "Model centered, text above and below",
        textFields: ["brand", "headline"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#1a1a1a" rx="4" />
                <rect x="25" y="10" width="40" height="10" fill="#4a9eff" rx="1" />
                <rect x="10" y="30" width="70" height="100" fill="#2a2a2a" rx="2" />
                <circle cx="45" cy="65" r="22" fill="#444" />
                <rect x="28" y="92" width="34" height="35" fill="#444" rx="2" />
                <rect x="20" y="138" width="50" height="10" fill="#666" rx="1" />
            </svg>
        )
    },
    story_card: {
        name: "Story Card",
        description: "Instagram story style - 9:16 full bleed",
        textFields: ["headline", "cta"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#2a2a2a" rx="4" />
                <circle cx="45" cy="60" r="28" fill="#444" />
                <rect x="20" y="92" width="50" height="50" fill="#444" rx="2" />
                <rect x="10" y="8" width="20" height="20" fill="#ff4a9e" rx="10" />
                <rect x="15" y="145" width="60" height="10" fill="#4a9eff" rx="2" />
            </svg>
        )
    },
    lookbook_spread: {
        name: "Lookbook Spread",
        description: "Editorial lookbook with multiple elements",
        textFields: ["brand", "headline", "subtext", "price"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#1a1a1a" rx="4" />
                <rect x="5" y="5" width="80" height="70" fill="#2a2a2a" rx="2" />
                <circle cx="45" cy="35" r="18" fill="#444" />
                <rect x="32" y="55" width="26" height="18" fill="#444" rx="1" />
                <rect x="5" y="80" width="40" height="8" fill="#ff4a4a" rx="1" />
                <rect x="5" y="92" width="80" height="12" fill="#4a9eff" rx="1" />
                <rect x="5" y="110" width="60" height="6" fill="#666" rx="1" />
                <rect x="5" y="130" width="25" height="20" fill="#4a9" rx="2" />
                <text x="17" y="143" fill="#fff" fontSize="8">₹1,299</text>
            </svg>
        )
    }
}

export default function LayoutPreview({ selected, onSelect }) {
    return (
        <div className="layout-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.6rem'
        }}>
            {Object.entries(LAYOUTS).map(([key, layout]) => (
                <div
                    key={key}
                    onClick={() => onSelect(key)}
                    className={`layout-option ${selected === key ? 'selected' : ''}`}
                    style={{
                        cursor: 'pointer',
                        padding: '0.4rem',
                        borderRadius: '8px',
                        border: selected === key ? '2px solid var(--accent)' : '2px solid transparent',
                        background: selected === key ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                        transition: 'all 0.2s ease',
                        transform: selected === key ? 'scale(1.02)' : 'scale(1)'
                    }}
                >
                    <div style={{ height: '70px', marginBottom: '0.4rem' }}>
                        {layout.diagram}
                    </div>
                    <div style={{
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {layout.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

// Export layout config for text field filtering
export { LAYOUTS }
