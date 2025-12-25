import React from 'react'

// Expanded themes
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

// Expanded poses (NEW!)
const poses = [
    { value: 'catalog_standard', label: 'Catalog Standard' },
    { value: 'hands_on_hips', label: 'Hands on Hips' },
    { value: 'hands_in_pockets', label: 'Hands in Pockets' },
    { value: 'arms_crossed', label: 'Arms Crossed' },
    { value: 'walking', label: 'Walking' },
    { value: 'walking_towards', label: 'Walking Towards' },
    { value: 'sitting_chair', label: 'Sitting on Chair' },
    { value: 'sitting_stool', label: 'Sitting on Stool' },
    { value: 'sitting_floor', label: 'Sitting on Floor' },
    { value: 'leaning_wall', label: 'Leaning on Wall' },
    { value: 'shoulder_lean', label: 'Shoulder Lean' },
    { value: 'crouching', label: 'Crouching' },
    { value: 'jumping', label: 'Jumping' },
    { value: 'dynamic_movement', label: 'Dynamic Movement' },
    { value: 'editorial_dramatic', label: 'Editorial Dramatic' },
    { value: 'editorial_relaxed', label: 'Editorial Relaxed' }
]

// Expanded props (NEW!)
const props = [
    { value: 'none', label: 'None' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'skateboard', label: 'Skateboard' },
    { value: 'football', label: 'Football' },
    { value: 'cap', label: 'Baseball Cap' },
    { value: 'beanie', label: 'Beanie' },
    { value: 'sunglasses', label: 'Sunglasses' },
    { value: 'sunglasses_holding', label: 'Holding Sunglasses' },
    { value: 'watch', label: 'Luxury Watch' },
    { value: 'chain', label: 'Gold Chain' },
    { value: 'headphones', label: 'Headphones' },
    { value: 'earbuds', label: 'Earbuds' },
    { value: 'backpack', label: 'Backpack' },
    { value: 'sling_bag', label: 'Sling Bag' },
    { value: 'coffee', label: 'Coffee Cup' },
    { value: 'phone', label: 'Smartphone' },
    { value: 'chair', label: 'Designer Chair' },
    { value: 'hoodie_up', label: 'Hoodie Up' }
]

const layouts = [
    { value: 'framed_breakout', label: 'Framed Break-out' },
    { value: 'magazine_style', label: 'Magazine Style' },
    { value: 'full_bleed', label: 'Full Bleed' },
    { value: 'split_screen', label: 'Split Screen' },
    { value: 'centered_minimal', label: 'Centered Minimal' },
    { value: 'off_center_dramatic', label: 'Off-Center Dramatic' }
]

// Style presets (NEW!)
const stylePresets = [
    { value: '', label: 'Custom (No Preset)' },
    { value: 'editorial_high_fashion', label: 'Editorial High Fashion' },
    { value: 'street_urban', label: 'Street Urban' },
    { value: 'catalog_clean', label: 'Catalog Clean' },
    { value: 'sporty_athletic', label: 'Sporty Athletic' },
    { value: 'lifestyle_casual', label: 'Lifestyle Casual' }
]

const shotAngles = [
    { value: 'front_facing', label: 'Front Facing' },
    { value: 'three_quarter', label: '3/4 Angle' },
    { value: 'side_profile', label: 'Side Profile' },
    { value: 'low_angle', label: 'Low Angle (Hero)' },
    { value: 'high_angle', label: 'High Angle' },
    { value: 'dutch_angle', label: 'Dutch Angle' },
    { value: 'dynamic', label: 'Dynamic' }
]

export default function MarketingOptions({
    theme,
    setTheme,
    prop,
    setProp,
    pose,
    setPose,
    shotAngle,
    setShotAngle,
    headlineText,
    setHeadlineText,
    subText,
    setSubText,
    layoutStyle,
    setLayoutStyle,
    stylePreset,
    setStylePreset,
    textColor,
    setTextColor
}) {
    return (
        <div className="marketing-options">
            {/* Style Preset (Quick Start) */}
            <div className="form-group">
                <label>Style Preset (Quick Start)</label>
                <select value={stylePreset} onChange={(e) => setStylePreset(e.target.value)}>
                    {stylePresets.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                </select>
            </div>

            {/* Theme and Layout */}
            <div className="form-row">
                <div className="form-group">
                    <label>Theme / Background</label>
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        {themes.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Layout Style</label>
                    <select value={layoutStyle} onChange={(e) => setLayoutStyle(e.target.value)}>
                        {layouts.map(l => (
                            <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Pose and Props */}
            <div className="form-row">
                <div className="form-group">
                    <label>Pose</label>
                    <select value={pose} onChange={(e) => setPose(e.target.value)}>
                        {poses.map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Props / Accessories</label>
                    <select value={prop} onChange={(e) => setProp(e.target.value)}>
                        {props.map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Shot Angle */}
            <div className="form-group">
                <label>Camera Angle</label>
                <select value={shotAngle} onChange={(e) => setShotAngle(e.target.value)}>
                    {shotAngles.map(a => (
                        <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                </select>
            </div>

            {/* Typography */}
            <div className="form-row">
                <div className="form-group">
                    <label>Headline Text</label>
                    <input
                        type="text"
                        value={headlineText}
                        onChange={(e) => setHeadlineText(e.target.value.toUpperCase())}
                        placeholder="e.g., RELAXED"
                        maxLength={20}
                    />
                </div>

                <div className="form-group">
                    <label>Subtext</label>
                    <input
                        type="text"
                        value={subText}
                        onChange={(e) => setSubText(e.target.value)}
                        placeholder="e.g., Premium Cotton"
                        maxLength={40}
                    />
                </div>
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
    )
}
