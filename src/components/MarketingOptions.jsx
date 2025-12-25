import React from 'react'

const themes = [
    { value: 'studio_minimal', label: 'Studio Minimal' },
    { value: 'varsity_locker', label: 'Varsity / Locker Room' },
    { value: 'studio_color', label: 'Studio Color' },
    { value: 'urban_street', label: 'Urban Street' },
    { value: 'abstract_color', label: 'Abstract Color' }
]

const props = [
    { value: 'none', label: 'None' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'skateboard', label: 'Skateboard' },
    { value: 'headphones', label: 'Headphones' },
    { value: 'backpack', label: 'Backpack' },
    { value: 'sunglasses', label: 'Sunglasses' },
    { value: 'chair', label: 'Chair' }
]

const layouts = [
    { value: 'framed_breakout', label: 'Framed Break-out' },
    { value: 'magazine_style', label: 'Magazine Style' },
    { value: 'full_bleed', label: 'Full Bleed' },
    { value: 'split_screen', label: 'Split Screen' }
]

export default function MarketingOptions({
    theme,
    setTheme,
    prop,
    setProp,
    headlineText,
    setHeadlineText,
    subText,
    setSubText,
    layoutStyle,
    setLayoutStyle
}) {
    return (
        <div className="marketing-options">
            <div className="form-row">
                <div className="form-group">
                    <label>Theme</label>
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        {themes.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Prop</label>
                    <select value={prop} onChange={(e) => setProp(e.target.value)}>
                        {props.map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Headline Text</label>
                    <input
                        type="text"
                        value={headlineText}
                        onChange={(e) => setHeadlineText(e.target.value)}
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

            <div className="form-group">
                <label>Layout Style</label>
                <div className="button-grid layout-grid">
                    {layouts.map(l => (
                        <button
                            key={l.value}
                            type="button"
                            className={`option-btn ${layoutStyle === l.value ? 'selected' : ''}`}
                            onClick={() => setLayoutStyle(l.value)}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
