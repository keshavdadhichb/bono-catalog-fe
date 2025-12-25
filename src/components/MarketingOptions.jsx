import React from 'react'
import LayoutPreview, { LAYOUTS } from './LayoutPreview'

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
    { value: 'leaning_wall', label: 'Leaning on Wall' },
    { value: 'crouching', label: 'Crouching' },
    { value: 'editorial_dramatic', label: 'Editorial Dramatic' }
]

// Props
const props = [
    { value: 'none', label: 'None' },
    { value: 'cap', label: 'Baseball Cap' },
    { value: 'sunglasses', label: 'Sunglasses' },
    { value: 'watch', label: 'Watch' },
    { value: 'headphones', label: 'Headphones' },
    { value: 'coffee', label: 'Coffee Cup' },
    { value: 'skateboard', label: 'Skateboard' },
    { value: 'basketball', label: 'Basketball' }
]

export default function MarketingOptions({
    theme, setTheme,
    prop, setProp,
    pose, setPose,
    layoutStyle, setLayoutStyle,
    // Text fields
    headline, setHeadline,
    subtext, setSubtext,
    brand, setBrand,
    price, setPrice,
    cta, setCta,
    tagline, setTagline
}) {
    // Get text fields for selected layout
    const selectedLayout = LAYOUTS[layoutStyle] || LAYOUTS.hero_bottom
    const activeTextFields = selectedLayout.textFields || []

    return (
        <div className="marketing-options">
            {/* Layout Selection with Preview */}
            <div className="form-group">
                <label>Layout Style</label>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Select a layout to see which text fields are available
                </p>
                <LayoutPreview selected={layoutStyle} onSelect={setLayoutStyle} />
                <p style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '6px',
                    fontSize: '0.875rem'
                }}>
                    <strong>{selectedLayout.name}:</strong> {selectedLayout.description}
                </p>
            </div>

            {/* Theme */}
            <div className="form-group">
                <label>Theme / Background</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    {themes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
            </div>

            {/* Pose & Props */}
            <div className="form-row">
                <div className="form-group">
                    <label>Pose</label>
                    <select value={pose} onChange={(e) => setPose(e.target.value)}>
                        {poses.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Props</label>
                    <select value={prop} onChange={(e) => setProp(e.target.value)}>
                        {props.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                </div>
            </div>

            {/* Dynamic Text Fields based on Layout */}
            <div className="form-section-divider" style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)'
            }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                    📝 Text Content for {selectedLayout.name}
                </h3>

                {/* Headline */}
                {activeTextFields.includes('headline') && (
                    <div className="form-group">
                        <label>Headline (Main Text)</label>
                        <input
                            type="text"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value.toUpperCase())}
                            placeholder="e.g., RELAXED FIT"
                            maxLength={30}
                        />
                    </div>
                )}

                {/* Subtext */}
                {activeTextFields.includes('subtext') && (
                    <div className="form-group">
                        <label>Subtext</label>
                        <input
                            type="text"
                            value={subtext}
                            onChange={(e) => setSubtext(e.target.value)}
                            placeholder="e.g., Premium Cotton Collection"
                            maxLength={50}
                        />
                    </div>
                )}

                {/* Brand */}
                {activeTextFields.includes('brand') && (
                    <div className="form-group">
                        <label>Brand Name</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            placeholder="e.g., BONO"
                            maxLength={20}
                        />
                    </div>
                )}

                {/* Tagline */}
                {activeTextFields.includes('tagline') && (
                    <div className="form-group">
                        <label>Tagline</label>
                        <input
                            type="text"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            placeholder="e.g., Made for Champions"
                            maxLength={40}
                        />
                    </div>
                )}

                {/* Price */}
                {activeTextFields.includes('price') && (
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g., ₹1,299"
                            maxLength={15}
                        />
                    </div>
                )}

                {/* Sizes */}
                {activeTextFields.includes('sizes') && (
                    <div className="form-group">
                        <label>Available Sizes</label>
                        <input
                            type="text"
                            value={subtext}
                            onChange={(e) => setSubtext(e.target.value)}
                            placeholder="e.g., S M L XL XXL"
                            maxLength={25}
                        />
                    </div>
                )}

                {/* CTA */}
                {activeTextFields.includes('cta') && (
                    <div className="form-group">
                        <label>Call to Action</label>
                        <input
                            type="text"
                            value={cta}
                            onChange={(e) => setCta(e.target.value)}
                            placeholder="e.g., SHOP NOW"
                            maxLength={20}
                        />
                    </div>
                )}

                {activeTextFields.length === 0 && (
                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        This layout doesn't include text overlay.
                    </p>
                )}
            </div>
        </div>
    )
}
