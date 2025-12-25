import React from 'react'

// Themes
const themes = [
    { value: 'studio_minimal', label: 'Studio Minimal' },
    { value: 'varsity_locker', label: 'Varsity / Locker Room' },
    { value: 'studio_color', label: 'Studio Color' },
    { value: 'urban_street', label: 'Urban Street' },
    { value: 'abstract_color', label: 'Abstract Color' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'nature_outdoor', label: 'Nature / Outdoor' },
    { value: 'neon_night', label: 'Neon Night' }
]

// Poses
const poses = [
    { value: 'catalog_standard', label: 'Catalog Standard' },
    { value: 'hands_on_hips', label: 'Hands on Hips' },
    { value: 'hands_in_pockets', label: 'Hands in Pockets' },
    { value: 'arms_crossed', label: 'Arms Crossed' },
    { value: 'walking', label: 'Walking' },
    { value: 'sitting_chair', label: 'Sitting on Chair' },
    { value: 'sitting_stool', label: 'Sitting on Stool' },
    { value: 'leaning_wall', label: 'Leaning on Wall' },
    { value: 'crouching', label: 'Crouching' },
    { value: 'jumping', label: 'Jumping' },
    { value: 'editorial_dramatic', label: 'Editorial Dramatic' }
]

// Props
const props = [
    { value: 'none', label: 'None' },
    { value: 'cap', label: 'Baseball Cap' },
    { value: 'sunglasses', label: 'Sunglasses' },
    { value: 'watch', label: 'Watch' },
    { value: 'chain', label: 'Chain' },
    { value: 'headphones', label: 'Headphones' },
    { value: 'coffee', label: 'Coffee Cup' },
    { value: 'phone', label: 'Smartphone' },
    { value: 'skateboard', label: 'Skateboard' },
    { value: 'basketball', label: 'Basketball' }
]

// Layouts
const layouts = [
    { value: 'framed_breakout', label: 'Framed Break-out' },
    { value: 'magazine_style', label: 'Magazine Style' },
    { value: 'full_bleed', label: 'Full Bleed' },
    { value: 'centered_minimal', label: 'Centered Minimal' }
]

export default function MarketingOptions({
    theme, setTheme,
    prop, setProp,
    pose, setPose,
    shotAngle, setShotAngle,
    layoutStyle, setLayoutStyle,
    // Text Overlay Fields (ALL OPTIONAL)
    heroText, setHeroText,
    subText, setSubText,
    cornerText, setCornerText,
    sizeText, setSizeText,
    priceText, setPriceText,
    textColor, setTextColor
}) {
    return (
        <div className="marketing-options">
            {/* Theme */}
            <div className="form-group">
                <label>Theme / Background</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    {themes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
            </div>

            {/* Pose & Layout */}
            <div className="form-row">
                <div className="form-group">
                    <label>Pose</label>
                    <select value={pose} onChange={(e) => setPose(e.target.value)}>
                        {poses.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Layout Style</label>
                    <select value={layoutStyle} onChange={(e) => setLayoutStyle(e.target.value)}>
                        {layouts.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                </div>
            </div>

            {/* Props */}
            <div className="form-group">
                <label>Props / Accessories</label>
                <select value={prop} onChange={(e) => setProp(e.target.value)}>
                    {props.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
            </div>

            {/* TEXT OVERLAY SECTION */}
            <div className="form-section-divider" style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)'
            }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                    📝 Text Overlay (Applied by Software - 100% Accurate)
                </h3>

                {/* Hero Text */}
                <div className="form-group">
                    <label>Hero Text (Large, Center)</label>
                    <input
                        type="text"
                        value={heroText}
                        onChange={(e) => setHeroText(e.target.value.toUpperCase())}
                        placeholder="e.g., RELAXED FIT"
                        maxLength={25}
                    />
                </div>

                {/* Sub Text */}
                <div className="form-group">
                    <label>Sub Text (Below Hero)</label>
                    <input
                        type="text"
                        value={subText}
                        onChange={(e) => setSubText(e.target.value)}
                        placeholder="e.g., Premium Cotton Collection"
                        maxLength={50}
                    />
                </div>

                {/* Corner & Price Row */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Corner Text (Top Left)</label>
                        <input
                            type="text"
                            value={cornerText}
                            onChange={(e) => setCornerText(e.target.value)}
                            placeholder="e.g., BONO"
                            maxLength={15}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price (Bottom Right)</label>
                        <input
                            type="text"
                            value={priceText}
                            onChange={(e) => setPriceText(e.target.value)}
                            placeholder="e.g., ₹1,299"
                            maxLength={15}
                        />
                    </div>
                </div>

                {/* Size Text */}
                <div className="form-group">
                    <label>Size (Bottom Left)</label>
                    <input
                        type="text"
                        value={sizeText}
                        onChange={(e) => setSizeText(e.target.value)}
                        placeholder="e.g., S M L XL XXL"
                        maxLength={20}
                    />
                </div>

                {/* Text Color */}
                <div className="form-group">
                    <label>Text Color</label>
                    <div className="button-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <button
                            type="button"
                            className={`option-btn ${textColor === 'white' ? 'selected' : ''}`}
                            onClick={() => setTextColor('white')}
                        >
                            White
                        </button>
                        <button
                            type="button"
                            className={`option-btn ${textColor === 'black' ? 'selected' : ''}`}
                            onClick={() => setTextColor('black')}
                        >
                            Black
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
