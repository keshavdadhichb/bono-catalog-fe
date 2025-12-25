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

    // Shot and pose (shared between modes)
    const [shotAngle, setShotAngle] = useState('front_facing')
    const [poseType, setPoseType] = useState('catalog_standard')

    // Marketing options (poster mode)
    const [marketingTheme, setMarketingTheme] = useState('studio_minimal')
    const [prop, setProp] = useState('none')
    const [layoutStyle, setLayoutStyle] = useState('framed_breakout')

    // Text overlay fields (all optional)
    const [heroText, setHeroText] = useState('')
    const [subText, setSubText] = useState('')
    const [cornerText, setCornerText] = useState('')
    const [sizeText, setSizeText] = useState('')
    const [priceText, setPriceText] = useState('')
    const [textColor, setTextColor] = useState('white')
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
        setJobStatus({ status: 'generating', message: 'Generating images...' })

        try {
            const formData = new FormData()
            formData.append('brand_name', brandName)
            formData.append('category', category)
            formData.append('generation_mode', generationMode)
            formData.append('skin_tone', skinTone)
            formData.append('hair_type', hairType)
            formData.append('body_type', bodyType)
            formData.append('shot_angle', shotAngle)
            formData.append('pose_type', poseType)

            if (generationMode === 'photo') {
                formData.append('creative_direction', creativeDirection)
            } else {
                formData.append('marketing_theme', marketingTheme)
                formData.append('prop', prop)
                formData.append('layout_style', layoutStyle)
                // Text overlay fields
                formData.append('hero_text', heroText)
                formData.append('sub_text', subText)
                formData.append('corner_text', cornerText)
                formData.append('size_text', sizeText)
                formData.append('price_text', priceText)
                formData.append('text_color', textColor)
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

            // Debug: log response info
            const contentType = response.headers.get('content-type')
            console.log('Response status:', response.status)
            console.log('Content-Type:', contentType)
            console.log('Content-Length:', response.headers.get('content-length'))

            if (!response.ok) {
                // Try to get error message
                let errorMsg = 'Generation failed'
                try {
                    const text = await response.text()
                    console.log('Error response:', text.substring(0, 500))
                    try {
                        const err = JSON.parse(text)
                        errorMsg = err.detail || errorMsg
                    } catch {
                        errorMsg = text.substring(0, 200) || `Server error: ${response.status}`
                    }
                } catch {
                    errorMsg = `Server error: ${response.status}`
                }
                throw new Error(errorMsg)
            }

            // Check if response is actually a ZIP
            if (!contentType || !contentType.includes('application/zip')) {
                // Response is not a ZIP - it might be an error page
                const text = await response.text()
                console.error('Expected ZIP but got:', contentType)
                console.error('Response body:', text.substring(0, 500))
                throw new Error(`Server returned ${contentType || 'unknown'} instead of ZIP. Check console for details.`)
            }

            // Response is a ZIP file blob
            const blob = await response.blob()
            console.log('Blob size:', blob.size, 'type:', blob.type)

            // Create download link
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${brandName}_${generationMode === 'poster' ? 'posters' : 'photos'}.zip`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)

            setJobStatus({ status: 'completed', message: 'Download complete!' })
            setIsGenerating(false)

        } catch (error) {
            console.error('Generation error:', error)
            setJobStatus({ status: 'failed', message: error.message })
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
                                <h2><span className="step">5</span>Poster Options</h2>
                                <MarketingOptions
                                    theme={marketingTheme}
                                    setTheme={setMarketingTheme}
                                    prop={prop}
                                    setProp={setProp}
                                    pose={poseType}
                                    setPose={setPoseType}
                                    shotAngle={shotAngle}
                                    setShotAngle={setShotAngle}
                                    layoutStyle={layoutStyle}
                                    setLayoutStyle={setLayoutStyle}
                                    heroText={heroText}
                                    setHeroText={setHeroText}
                                    subText={subText}
                                    setSubText={setSubText}
                                    cornerText={cornerText}
                                    setCornerText={setCornerText}
                                    sizeText={sizeText}
                                    setSizeText={setSizeText}
                                    priceText={priceText}
                                    setPriceText={setPriceText}
                                    textColor={textColor}
                                    setTextColor={setTextColor}
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

                    {/* Status Message */}
                    {jobStatus && (
                        <div className={`status-message ${jobStatus.status}`} style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'center',
                            background: jobStatus.status === 'completed' ? '#e8f5e9' :
                                jobStatus.status === 'failed' ? '#ffebee' : 'var(--bg-secondary)',
                            color: jobStatus.status === 'completed' ? '#2e7d32' :
                                jobStatus.status === 'failed' ? '#c62828' : 'var(--text-secondary)'
                        }}>
                            {jobStatus.status === 'generating' && (
                                <span className="spinner" style={{ marginRight: '0.5rem' }}></span>
                            )}
                            {jobStatus.message}
                            {jobStatus.status === 'completed' && (
                                <button className="btn" onClick={handleReset} style={{ marginLeft: '1rem' }}>
                                    New Generation
                                </button>
                            )}
                            {jobStatus.status === 'failed' && (
                                <button className="btn" onClick={handleReset} style={{ marginLeft: '1rem' }}>
                                    Try Again
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default App
