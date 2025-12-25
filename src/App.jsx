import { useState, useCallback } from 'react'
import UploadForm from './components/UploadForm'
import CategorySelector from './components/CategorySelector'
import ModelDescription from './components/ModelDescription'
import ShotAndPose from './components/ShotAndPose'
import CreativeDirection from './components/CreativeDirection'
import MarketingOptions from './components/MarketingOptions'
import GenerationProgress from './components/GenerationProgress'

function App() {
    // Generation mode: "photo" or "poster"
    const [generationMode, setGenerationMode] = useState('photo')

    // Form state
    const [category, setCategory] = useState('teen_boy')
    const [brandName, setBrandName] = useState('')
    const [creativeDirection, setCreativeDirection] = useState('')
    const [products, setProducts] = useState([])

    // Model description
    const [skinTone, setSkinTone] = useState('fair')
    const [hairType, setHairType] = useState('short black hair')
    const [bodyType, setBodyType] = useState('')

    // Shot and pose (photo mode)
    const [shotAngle, setShotAngle] = useState('front_facing')
    const [poseType, setPoseType] = useState('catalog_standard')

    // Marketing options (poster mode)
    const [marketingTheme, setMarketingTheme] = useState('studio_minimal')
    const [prop, setProp] = useState('none')
    const [headlineText, setHeadlineText] = useState('')
    const [subText, setSubText] = useState('')
    const [layoutStyle, setLayoutStyle] = useState('framed_breakout')
    const [logo, setLogo] = useState(null)

    // Generation state
    const [jobId, setJobId] = useState(null)
    const [jobStatus, setJobStatus] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleAddProduct = useCallback((frontImage, backImage) => {
        setProducts(prev => [...prev, {
            id: Date.now(),
            frontImage,
            backImage,
            frontPreview: URL.createObjectURL(frontImage),
            backPreview: URL.createObjectURL(backImage)
        }])
    }, [])

    const handleRemoveProduct = useCallback((id) => {
        setProducts(prev => prev.filter(p => p.id !== id))
    }, [])

    const handleLogoUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setLogo(file)
        }
    }

    const handleSubmit = async () => {
        if (!brandName || products.length === 0) {
            alert('Please enter brand name and add at least one product')
            return
        }

        setIsGenerating(true)

        try {
            const formData = new FormData()
            formData.append('brand_name', brandName)
            formData.append('category', category)
            formData.append('generation_mode', generationMode)
            formData.append('skin_tone', skinTone)
            formData.append('hair_type', hairType)
            formData.append('body_type', bodyType)

            if (generationMode === 'photo') {
                formData.append('shot_angle', shotAngle)
                formData.append('pose_type', poseType)
                formData.append('creative_direction', creativeDirection)
            } else {
                formData.append('marketing_theme', marketingTheme)
                formData.append('prop', prop)
                formData.append('headline_text', headlineText)
                formData.append('sub_text', subText)
                formData.append('layout_style', layoutStyle)
                if (logo) {
                    formData.append('logo', logo)
                }
            }

            products.forEach(p => {
                formData.append('front_images', p.frontImage)
                formData.append('back_images', p.backImage)
            })

            const response = await fetch('/api/generate', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                const err = await response.json()
                throw new Error(err.detail || 'Failed to start generation')
            }

            const data = await response.json()
            setJobId(data.job_id)
            setJobStatus(data)
        } catch (error) {
            console.error('Generation error:', error)
            alert('Failed to start generation: ' + error.message)
            setIsGenerating(false)
        }
    }

    const handleReset = () => {
        setJobId(null)
        setJobStatus(null)
        setIsGenerating(false)
        setProducts([])
    }

    const isFormValid = brandName && products.length > 0

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <div className="logo-icon">B</div>
                        <span className="logo-text">Bono</span>
                    </div>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
                        Catalog Generator
                    </div>
                </div>
            </header>

            <main className="main-content">
                <div className="hero">
                    <h1>{generationMode === 'poster' ? 'Marketing Poster' : 'Model Photo'} Generation</h1>
                    <p>
                        {generationMode === 'poster'
                            ? 'Create complete marketing posters with themes, props, and typography.'
                            : 'Generate professional virtual try-on photos for your products.'}
                    </p>
                </div>

                {!jobId ? (
                    <div className="form-container">
                        {/* Mode Toggle */}
                        <section className="form-section">
                            <h2><span className="step">1</span>Mode</h2>
                            <div className="mode-toggle">
                                <button
                                    type="button"
                                    className={`mode-btn ${generationMode === 'photo' ? 'active' : ''}`}
                                    onClick={() => setGenerationMode('photo')}
                                >
                                    Simple Photo
                                </button>
                                <button
                                    type="button"
                                    className={`mode-btn ${generationMode === 'poster' ? 'active' : ''}`}
                                    onClick={() => setGenerationMode('poster')}
                                >
                                    Marketing Poster
                                </button>
                            </div>
                        </section>

                        {/* Category */}
                        <section className="form-section">
                            <h2><span className="step">2</span>Category</h2>
                            <CategorySelector value={category} onChange={setCategory} />
                        </section>

                        {/* Brand Name */}
                        <section className="form-section">
                            <h2><span className="step">3</span>Brand</h2>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    placeholder="Brand name"
                                />
                            </div>
                        </section>

                        {/* Model Appearance */}
                        <section className="form-section">
                            <h2><span className="step">4</span>Model</h2>
                            <ModelDescription
                                skinTone={skinTone}
                                hairType={hairType}
                                bodyType={bodyType}
                                onSkinToneChange={setSkinTone}
                                onHairTypeChange={setHairType}
                                onBodyTypeChange={setBodyType}
                            />
                        </section>

                        {/* Conditional: Photo or Poster Options */}
                        {generationMode === 'photo' ? (
                            <>
                                {/* Shot & Pose */}
                                <section className="form-section">
                                    <h2><span className="step">5</span>Pose</h2>
                                    <ShotAndPose
                                        shotAngle={shotAngle}
                                        poseType={poseType}
                                        onShotAngleChange={setShotAngle}
                                        onPoseTypeChange={setPoseType}
                                    />
                                </section>

                                {/* Creative Direction */}
                                <section className="form-section">
                                    <h2><span className="step">6</span>Direction (Optional)</h2>
                                    <CreativeDirection
                                        value={creativeDirection}
                                        onChange={setCreativeDirection}
                                    />
                                </section>
                            </>
                        ) : (
                            <>
                                {/* Marketing Options */}
                                <section className="form-section">
                                    <h2><span className="step">5</span>Theme & Layout</h2>
                                    <MarketingOptions
                                        theme={marketingTheme}
                                        setTheme={setMarketingTheme}
                                        prop={prop}
                                        setProp={setProp}
                                        headlineText={headlineText}
                                        setHeadlineText={setHeadlineText}
                                        subText={subText}
                                        setSubText={setSubText}
                                        layoutStyle={layoutStyle}
                                        setLayoutStyle={setLayoutStyle}
                                    />
                                </section>

                                {/* Logo Upload */}
                                <section className="form-section">
                                    <h2><span className="step">6</span>Logo (Optional)</h2>
                                    <div className="form-group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            style={{ padding: '0.75rem' }}
                                        />
                                        {logo && (
                                            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                Logo: {logo.name}
                                            </p>
                                        )}
                                    </div>
                                </section>
                            </>
                        )}

                        {/* Upload Products */}
                        <section className="form-section">
                            <h2><span className="step">7</span>Products ({products.length}/10)</h2>
                            <UploadForm
                                products={products}
                                onAddProduct={handleAddProduct}
                                onRemoveProduct={handleRemoveProduct}
                            />
                        </section>

                        {/* Submit Button */}
                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleSubmit}
                            disabled={!isFormValid || isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <span className="spinner"></span>
                                    Processing
                                </>
                            ) : (
                                generationMode === 'poster' ? 'Generate Posters' : 'Generate Photos'
                            )}
                        </button>
                    </div>
                ) : (
                    <>
                        <GenerationProgress
                            jobId={jobId}
                            onStatusUpdate={setJobStatus}
                        />

                        {jobStatus?.status === 'completed' && (
                            <div className="download-section">
                                <h3>Complete</h3>
                                <p>{jobStatus.message}</p>

                                {/* Preview Grid */}
                                {jobStatus.preview_images && jobStatus.preview_images.length > 0 && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                                        gap: '1rem',
                                        marginBottom: '2rem'
                                    }}>
                                        {jobStatus.preview_images.map((url, i) => (
                                            <div key={i} style={{
                                                background: 'var(--bg-tertiary)',
                                                borderRadius: 'var(--radius-md)',
                                                overflow: 'hidden'
                                            }}>
                                                <img
                                                    src={url}
                                                    alt={`Photo ${i + 1}`}
                                                    style={{ width: '100%', height: 'auto' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Download Button */}
                                <a
                                    href={jobStatus.download_url}
                                    className="btn btn-primary btn-large"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Download All
                                </a>

                                <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                    High resolution PNG files
                                </p>

                                <button
                                    className="btn"
                                    onClick={handleReset}
                                    style={{ marginTop: '1rem' }}
                                >
                                    New Session
                                </button>
                            </div>
                        )}

                        {jobStatus?.status === 'failed' && (
                            <div className="download-section">
                                <h3>Error</h3>
                                <p>{jobStatus.message}</p>
                                <button className="btn btn-primary" onClick={handleReset}>
                                    Try Again
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}

export default App
