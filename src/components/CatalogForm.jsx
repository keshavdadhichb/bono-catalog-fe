import React, { useState } from 'react'
import ThemePreview from './ThemePreview'

export default function CatalogForm({
    category, setCategory,
    collectionName, setCollectionName,
    collectionNumber, setCollectionNumber,
    theme, setTheme,
    skinTone, setSkinTone,
    bodyType, setBodyType,
    // Text fields
    textFields, setTextFields,
    // Images
    products, setProducts,
    logo, setLogo,
    onAddProduct, onRemoveProduct
}) {

    const handleTextChange = (field, value) => {
        setTextFields(prev => ({ ...prev, [field]: value }))
    }

    const [frontFile, setFrontFile] = useState(null)
    const [backFile, setBackFile] = useState(null)

    const handleAddPiece = () => {
        if (frontFile && backFile) {
            onAddProduct(frontFile, backFile)
            setFrontFile(null)
            setBackFile(null)
            // Reset file inputs
            document.getElementById('catalog-front-input').value = ''
            document.getElementById('catalog-back-input').value = ''
        }
    }

    return (
        <div className="catalog-form">
            {/* Header Info */}
            <div className="info-banner" style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%)',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1.5rem'
            }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>📚 Master Catalog</h3>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', opacity: 0.9 }}>
                    Generate a complete catalog: Cover + {products.length} products (front & back) + Thank You page
                </p>
            </div>

            {/* Section 1: Collection Info */}
            <div className="form-section">
                <h2><span className="step">1</span>Collection Info</h2>

                <div className="form-group">
                    <label>Collection Name *</label>
                    <input
                        type="text"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                        placeholder="Summer Essentials 2024"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Collection Number</label>
                        <input
                            type="text"
                            value={collectionNumber}
                            onChange={(e) => setCollectionNumber(e.target.value)}
                            placeholder="Vol. 24"
                        />
                    </div>
                    <div className="form-group">
                        <label>Category *</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="teen_boy">Teen Boy</option>
                            <option value="teen_girl">Teen Girl</option>
                            <option value="infant_boy">Infant Boy</option>
                            <option value="infant_girl">Infant Girl</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Section 2: Theme */}
            <div className="form-section">
                <h2><span className="step">2</span>Theme & Style</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    This theme applies to cover, all product pages, and thank you page
                </p>
                <ThemePreview selected={theme} onSelect={setTheme} />

                <div className="form-row" style={{ marginTop: '1rem' }}>
                    <div className="form-group">
                        <label>Skin Tone</label>
                        <select value={skinTone} onChange={(e) => setSkinTone(e.target.value)}>
                            <option value="fair">Fair</option>
                            <option value="light">Light</option>
                            <option value="medium">Medium</option>
                            <option value="olive">Olive</option>
                            <option value="tan">Tan</option>
                            <option value="brown">Brown</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Body Type</label>
                        <input
                            type="text"
                            value={bodyType}
                            onChange={(e) => setBodyType(e.target.value)}
                            placeholder="Athletic, Slim, etc."
                        />
                    </div>
                </div>
            </div>

            {/* Section 3: Logo */}
            <div className="form-section">
                <h2><span className="step">3</span>Logo</h2>
                <div className="form-group">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogo(e.target.files[0])}
                        style={{ padding: '0.75rem' }}
                    />
                    {logo && (
                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            ✓ {logo.name}
                        </p>
                    )}
                </div>
            </div>

            {/* Section 4: Product Pieces */}
            <div className="form-section">
                <h2><span className="step">4</span>Product Pieces ({products.length})</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Add up to 20 products. Each needs front and back image.
                </p>

                {/* Current uploaded products */}
                {products.length > 0 && (
                    <div className="product-list" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                    }}>
                        {products.map((p, idx) => (
                            <div key={p.id} style={{
                                position: 'relative',
                                background: 'var(--bg-tertiary)',
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={p.frontPreview}
                                    alt={`Product ${idx + 1}`}
                                    style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '4px',
                                    left: '4px',
                                    background: 'var(--accent)',
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '0.65rem',
                                    fontWeight: 600
                                }}>
                                    #{idx + 1}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemoveProduct(p.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '4px',
                                        right: '4px',
                                        background: '#ef4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add new product */}
                {products.length < 20 && (
                    <div className="add-product" style={{
                        background: 'var(--bg-secondary)',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '2px dashed var(--border-color)'
                    }}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Front Image</label>
                                <input
                                    id="catalog-front-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFrontFile(e.target.files[0])}
                                />
                            </div>
                            <div className="form-group">
                                <label>Back Image</label>
                                <input
                                    id="catalog-back-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setBackFile(e.target.files[0])}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleAddPiece}
                            disabled={!frontFile || !backFile}
                            style={{
                                marginTop: '0.75rem',
                                padding: '0.5rem 1rem',
                                background: frontFile && backFile ? 'var(--accent)' : 'var(--bg-tertiary)',
                                color: frontFile && backFile ? 'white' : 'var(--text-muted)',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: frontFile && backFile ? 'pointer' : 'not-allowed',
                                width: '100%'
                            }}
                        >
                            + Add Product #{products.length + 1}
                        </button>
                    </div>
                )}
            </div>

            {/* Section 5: Optional Text Fields */}
            <div className="form-section">
                <h2><span className="step">5</span>Text Fields (Optional)</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    These will appear on cover and product pages as appropriate
                </p>

                <div className="form-row">
                    <div className="form-group">
                        <label>Tagline</label>
                        <input
                            type="text"
                            value={textFields.tagline || ''}
                            onChange={(e) => handleTextChange('tagline', e.target.value)}
                            placeholder="Premium Comfort Wear"
                        />
                    </div>
                    <div className="form-group">
                        <label>Season</label>
                        <input
                            type="text"
                            value={textFields.season || ''}
                            onChange={(e) => handleTextChange('season', e.target.value)}
                            placeholder="Summer 2024"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Year</label>
                        <input
                            type="text"
                            value={textFields.year || ''}
                            onChange={(e) => handleTextChange('year', e.target.value)}
                            placeholder="2024"
                        />
                    </div>
                    <div className="form-group">
                        <label>Price Range</label>
                        <input
                            type="text"
                            value={textFields.price_range || ''}
                            onChange={(e) => handleTextChange('price_range', e.target.value)}
                            placeholder="₹499 - ₹1,299"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Fabric Info</label>
                    <input
                        type="text"
                        value={textFields.fabric || ''}
                        onChange={(e) => handleTextChange('fabric', e.target.value)}
                        placeholder="100% Premium Cotton"
                    />
                </div>

                <div className="form-group">
                    <label>Brand Message</label>
                    <input
                        type="text"
                        value={textFields.brand_message || ''}
                        onChange={(e) => handleTextChange('brand_message', e.target.value)}
                        placeholder="Made with Love in India"
                    />
                </div>

                <details style={{ marginTop: '0.5rem' }}>
                    <summary style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        + More Custom Fields
                    </summary>
                    <div style={{ marginTop: '0.75rem' }}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Custom 1</label>
                                <input
                                    type="text"
                                    value={textFields.custom_1 || ''}
                                    onChange={(e) => handleTextChange('custom_1', e.target.value)}
                                    placeholder="Custom text..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Custom 2</label>
                                <input
                                    type="text"
                                    value={textFields.custom_2 || ''}
                                    onChange={(e) => handleTextChange('custom_2', e.target.value)}
                                    placeholder="Custom text..."
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Custom 3</label>
                                <input
                                    type="text"
                                    value={textFields.custom_3 || ''}
                                    onChange={(e) => handleTextChange('custom_3', e.target.value)}
                                    placeholder="Custom text..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Custom 4</label>
                                <input
                                    type="text"
                                    value={textFields.custom_4 || ''}
                                    onChange={(e) => handleTextChange('custom_4', e.target.value)}
                                    placeholder="Custom text..."
                                />
                            </div>
                        </div>
                    </div>
                </details>
            </div>

            {/* Summary */}
            <div style={{
                background: 'var(--bg-secondary)',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem'
            }}>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.9rem' }}>📋 Catalog Summary</h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <li>1 Cover Page</li>
                    <li>{products.length * 2} Product Pages ({products.length} products × 2 views)</li>
                    <li>1 Thank You Page</li>
                    <li><strong>Total: {1 + (products.length * 2) + 1} pages</strong></li>
                </ul>
            </div>
        </div>
    )
}
