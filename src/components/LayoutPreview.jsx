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
    },
    // BONO DESIGNER LAYOUTS
    orange_diagonal: {
        name: "Orange Diagonal",
        description: "Split background with diagonal banner",
        textFields: ["brand", "headline", "subtext", "tagline"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="80" fill="#fff" rx="4 4 0 0" />
                <rect x="0" y="80" width="90" height="80" fill="#E67E22" rx="0 0 4 4" />
                <circle cx="45" cy="55" r="18" fill="#ddd" />
                <rect x="30" y="75" width="30" height="35" fill="#ddd" rx="2" />
                <polygon points="0,100 90,70 90,90 0,120" fill="#D35400" />
                <rect x="25" y="10" width="40" height="10" fill="#E67E22" rx="1" />
                <rect x="10" y="130" width="50" height="8" fill="#fff" rx="1" />
                <rect x="10" y="145" width="30" height="6" fill="#333" rx="1" />
            </svg>
        )
    },
    yellow_vibrant: {
        name: "Yellow Vibrant",
        description: "Bright yellow with purple accents",
        textFields: ["headline", "subtext", "brand"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#F1C40F" rx="4" />
                <rect x="5" y="10" width="70" height="15" stroke="#8E44AD" fill="none" strokeWidth="2" rx="1" />
                <text x="40" y="22" textAnchor="middle" fill="#8E44AD" fontSize="10" fontWeight="bold">FASHION</text>
                <circle cx="45" cy="70" r="22" fill="#ddd" />
                <rect x="28" y="95" width="34" height="40" fill="#ddd" rx="2" />
                <rect x="10" y="140" width="50" height="12" fill="#fff" stroke="#8E44AD" strokeWidth="1" rx="1" />
                <circle cx="75" cy="50" r="3" fill="#8E44AD" />
                <circle cx="80" cy="55" r="3" fill="#8E44AD" />
                <circle cx="85" cy="50" r="3" fill="#8E44AD" />
                <rect x="75" y="100" width="2" height="50" fill="#8E44AD" />
            </svg>
        )
    },
    pink_elegant: {
        name: "Pink Elegant",
        description: "Soft pink with elegant typography",
        textFields: ["headline", "subtext", "brand"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#FADBD8" rx="4" />
                <rect x="15" y="10" width="60" height="12" fill="#E67E22" rx="1" />
                <text x="45" y="19" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">VELVET REVERIE</text>
                <rect x="25" y="25" width="40" height="8" fill="none" stroke="#E67E22" strokeWidth="1" rx="1" />
                <circle cx="45" cy="85" r="25" fill="#eee" />
                <rect x="28" y="112" width="34" height="40" fill="#eee" rx="2" />
                <rect x="8" y="50" width="6" height="45" fill="#E67E22" rx="1" />
                <rect x="76" y="50" width="6" height="45" fill="#E67E22" rx="1" />
                <text x="11" y="80" fill="#fff" fontSize="5" transform="rotate(-90 11 80)">DATE</text>
                <text x="79" y="80" fill="#fff" fontSize="5" transform="rotate(90 79 80)">BONO</text>
            </svg>
        )
    },
    orange_framed: {
        name: "Orange Framed",
        description: "Deep orange with white frame",
        textFields: ["headline", "tagline", "brand"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#D35400" rx="4" />
                <rect x="8" y="8" width="74" height="144" fill="none" stroke="#fff" strokeWidth="2" rx="2" />
                <rect x="6" y="6" width="4" height="4" fill="#fff" />
                <rect x="80" y="6" width="4" height="4" fill="#fff" />
                <rect x="6" y="150" width="4" height="4" fill="#fff" />
                <rect x="80" y="150" width="4" height="4" fill="#fff" />
                <text x="45" y="35" textAnchor="middle" fill="#fff" fontSize="8" opacity="0.6">FASHION</text>
                <text x="45" y="50" textAnchor="middle" fill="#fff" fontSize="8" opacity="0.4">FASHION</text>
                <circle cx="45" cy="85" r="22" fill="#c0c0c0" />
                <rect x="28" y="110" width="34" height="35" fill="#c0c0c0" rx="2" />
                <rect x="15" y="125" width="20" height="6" fill="#fff" rx="1" />
                <circle cx="75" cy="15" r="2" fill="#fff" opacity="0.5" />
                <circle cx="80" cy="20" r="2" fill="#fff" opacity="0.5" />
            </svg>
        )
    },
    // AESTHETIC LAYOUTS
    minimalist_editorial: {
        name: "Minimalist Editorial",
        description: "High-end magazine with white space",
        textFields: ["headline", "subtext"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#F8F6F3" rx="4" />
                <rect x="5" y="20" width="35" height="8" fill="#333" rx="1" />
                <rect x="5" y="32" width="30" height="4" fill="#888" rx="1" />
                <rect x="5" y="40" width="32" height="4" fill="#888" rx="1" />
                <rect x="5" y="48" width="28" height="4" fill="#888" rx="1" />
                <rect x="44" y="10" width="1" height="130" fill="#333" />
                <circle cx="68" cy="55" r="18" fill="#ddd" />
                <rect x="53" y="78" width="30" height="40" fill="#ddd" rx="2" />
                <rect x="5" y="145" width="35" height="5" fill="#666" rx="1" />
            </svg>
        )
    },
    urban_brutalist: {
        name: "Urban Brutalist",
        description: "Edgy streetwear concrete style",
        textFields: ["headline", "subtext"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#A0A0A0" rx="4" />
                <text x="45" y="35" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold" opacity="0.3">URBAN</text>
                <line x1="10" y1="50" x2="80" y2="50" stroke="#333" strokeWidth="0.5" />
                <line x1="10" y1="110" x2="80" y2="110" stroke="#333" strokeWidth="0.5" />
                <line x1="30" y1="30" x2="30" y2="130" stroke="#333" strokeWidth="0.5" />
                <line x1="60" y1="30" x2="60" y2="130" stroke="#333" strokeWidth="0.5" />
                <circle cx="45" cy="70" r="18" fill="#ddd" />
                <rect x="30" y="90" width="30" height="35" fill="#ddd" rx="2" />
                <rect x="60" y="15" width="25" height="20" fill="#333" rx="1" />
                <text x="72" y="27" textAnchor="middle" fill="#fff" fontSize="4">SPEC: DATA</text>
                <rect x="15" y="140" width="60" height="12" fill="#333" rx="1" />
                <text x="45" y="149" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">STREETWEAR</text>
            </svg>
        )
    },
    warm_earth: {
        name: "Warm Earth",
        description: "Organic natural earth tones",
        textFields: ["headline", "subtext", "tagline"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#D4C4B0" rx="4" />
                <ellipse cx="20" cy="30" rx="25" ry="20" fill="#C68B77" opacity="0.6" />
                <ellipse cx="70" cy="50" rx="20" ry="25" fill="#9CAF88" opacity="0.5" />
                <ellipse cx="25" cy="130" rx="30" ry="20" fill="#D4A5A5" opacity="0.5" />
                <circle cx="35" cy="70" r="20" fill="#eee" />
                <rect x="20" y="92" width="30" height="40" fill="#eee" rx="2" />
                <rect x="55" y="65" width="30" height="8" fill="#5D4E37" rx="1" />
                <rect x="55" y="78" width="25" height="4" fill="#7D6E57" rx="1" />
                <path d="M70 100 Q75 110 70 120 Q65 130 70 140" stroke="#5D4E37" fill="none" strokeWidth="1" />
                <rect x="55" y="145" width="30" height="5" fill="#5D4E37" rx="1" />
            </svg>
        )
    },
    dark_luxury: {
        name: "Dark Luxury",
        description: "Premium dark with gold accents",
        textFields: ["headline", "subtext"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <defs>
                    <linearGradient id="darkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3a3a3a" />
                        <stop offset="50%" stopColor="#2C2C2C" />
                        <stop offset="100%" stopColor="#1a1a1a" />
                    </linearGradient>
                </defs>
                <rect x="0" y="0" width="90" height="160" fill="url(#darkGrad)" rx="4" />
                <rect x="3" y="3" width="84" height="154" fill="none" stroke="#D4AF37" strokeWidth="1" rx="2" />
                <rect x="20" y="15" width="50" height="10" fill="#D4AF37" rx="1" />
                <text x="45" y="23" textAnchor="middle" fill="#1a1a1a" fontSize="6" fontWeight="bold">PREMIUM</text>
                <circle cx="45" cy="70" r="22" fill="#c0c0c0" />
                <rect x="28" y="95" width="34" height="40" fill="#c0c0c0" rx="2" />
                <rect x="15" y="140" width="60" height="1" fill="#D4AF37" />
                <rect x="22" y="147" width="46" height="5" fill="none" stroke="#D4AF37" strokeWidth="0.5" rx="1" />
            </svg>
        )
    },
    dynamic_typography: {
        name: "Dynamic Typography",
        description: "Text as major visual element",
        textFields: ["headline", "subtext"],
        diagram: (
            <svg viewBox="0 0 90 160" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="90" height="160" fill="#fff" rx="4" />
                <text x="20" y="30" fill="#ddd" fontSize="28" fontWeight="bold" transform="rotate(90 20 30)">ORIGINAL</text>
                <text x="35" y="30" fill="#eee" fontSize="28" fontWeight="bold" transform="rotate(90 35 30)">DESIGN</text>
                <rect x="5" y="10" width="40" height="15" fill="#333" rx="1" />
                <text x="25" y="20" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="bold">THE NEW STANDARD</text>
                <circle cx="60" cy="70" r="20" fill="#bbb" />
                <rect x="45" y="93" width="30" height="40" fill="#bbb" rx="2" />
                <circle cx="12" cy="145" r="6" fill="#E67E22" />
                <rect x="8" y="27" width="20" height="5" fill="#E67E22" rx="1" />
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
