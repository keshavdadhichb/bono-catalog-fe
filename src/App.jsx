import { useState, useCallback } from 'react'
import UploadForm from './components/UploadForm'
import CategorySelector from './components/CategorySelector'
import ModelDescription from './components/ModelDescription'
import ShotAndPose from './components/ShotAndPose'
import CreativeDirection from './components/CreativeDirection'
import MarketingOptions from './components/MarketingOptions'
import CatalogForm from './components/CatalogForm'
import GenerationProgress from './components/GenerationProgress'
import LayoutPreview from './components/LayoutPreview'
import QualitySelector from './components/QualitySelector'

// Wizard step definitions per mode
const WIZARD_STEPS = {
    photo: [
        { id: 'mode', label: 'Mode', icon: '🎯' },
        { id: 'category', label: 'Category & Model', icon: '👤' },
        { id: 'style', label: 'Style', icon: '🎨' },
        { id: 'products', label: 'Products', icon: '📦' },
        { id: 'quality', label: 'Quality & Generate', icon: '✨' }
    ],
    poster: [
        { id: 'mode', label: 'Mode', icon: '🎯' },
        { id: 'category', label: 'Category & Model', icon: '👤' },
        { id: 'theme', label: 'Theme & Style', icon: '🎨' },
        { id: 'layout', label: 'Layout', icon: '📐' },
        { id: 'products', label: 'Products', icon: '📦' },
        { id: 'quality', label: 'Quality & Generate', icon: '✨' }
    ],
    catalog: [
        { id: 'mode', label: 'Mode', icon: '🎯' },
        { id: 'collection', label: 'Collection', icon: '📚' },
        { id: 'theme', label: 'Theme', icon: '🎨' },
        { id: 'products', label: 'Products', icon: '📦' },
        { id: 'quality', label: 'Quality & Generate', icon: '✨' }
    ]
}

function App() {
    // Wizard state
    const [currentStep, setCurrentStep] = useState(0)

    // Generation mode
    const [generationMode, setGenerationMode] = useState('poster')

    // Form state
    const [category, setCategory] = useState('teen_boy')
    const [brandName, setBrandName] = useState('')
    const [creativeDirection, setCreativeDirection] = useState('')
    const [products, setProducts] = useState([])

    // Model description
    const [skinTone, setSkinTone] = useState('fair')
    const [hairType, setHairType] = useState('short black hair')
    const [bodyType, setBodyType] = useState('')

    // Shot and pose
    const [shotAngle, setShotAngle] = useState('front_facing')
    const [poseType, setPoseType] = useState('catalog_standard')

    // Marketing options (poster mode)
    const [marketingTheme, setMarketingTheme] = useState('studio_minimal')
    const [prop, setProp] = useState('none')
    const [layoutStyle, setLayoutStyle] = useState('hero_bottom')

    // Text fields for poster
    const [headline, setHeadline] = useState('')
    const [subtext, setSubtext] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [cta, setCta] = useState('')
    const [tagline, setTagline] = useState('')
    const [logo, setLogo] = useState(null)

    // Catalog mode state
    const [collectionName, setCollectionName] = useState('')
    const [collectionNumber, setCollectionNumber] = useState('')
    const [catalogTheme, setCatalogTheme] = useState('studio_minimal')
    const [catalogTextFields, setCatalogTextFields] = useState({})

    // Quality selection
    const [imageQuality, setImageQuality] = useState('4K')

    // Generation state
    const [jobStatus, setJobStatus] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)

    // Get current wizard steps based on mode
    const steps = WIZARD_STEPS[generationMode]
    const currentStepData = steps[currentStep]
    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === steps.length - 1

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
        if (file) setLogo(file)
    }

    // Validation for each step
    const canProceed = () => {
        const stepId = currentStepData?.id
        if (stepId === 'mode') return true
        if (stepId === 'category') return category && brandName
        if (stepId === 'style') return true
        if (stepId === 'theme') return marketingTheme || catalogTheme
        if (stepId === 'layout') return layoutStyle
        if (stepId === 'collection') return collectionName
        if (stepId === 'products') return products.length > 0
        if (stepId === 'quality') return imageQuality
        return true
    }

    const handleNext = () => {
        if (isLastStep) {
            handleSubmit()
        } else if (canProceed()) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
        }
    }

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0))
    }

    const handleModeChange = (mode) => {
        setGenerationMode(mode)
        setCurrentStep(0) // Reset to first step when mode changes
    }

    const handleSubmit = async () => {
        if (generationMode === 'catalog') {
            if (!collectionName || products.length === 0) {
                alert('Please enter collection name and add at least one product')
                return
            }
        } else {
            if (!brandName || products.length === 0) {
                alert('Please enter brand name and add at least one product')
                return
            }
        }

        setIsGenerating(true)
        const pageCount = generationMode === 'catalog' ? (2 + products.length * 2) : products.length * 2
        setJobStatus({ status: 'generating', message: `Generating ${pageCount} images...` })

        try {
            const formData = new FormData()
            formData.append('category', category)
            formData.append('skin_tone', skinTone)
            formData.append('body_type', bodyType)
            formData.append('image_quality', imageQuality)

            products.forEach(p => {
                formData.append('front_images', p.frontImage)
                formData.append('back_images', p.backImage)
            })

            let endpoint = '/api/generate'

            if (generationMode === 'catalog') {
                endpoint = '/api/generate-catalog'
                formData.append('collection_name', collectionName)
                formData.append('collection_number', collectionNumber)
                formData.append('theme', catalogTheme)
                formData.append('text_tagline', catalogTextFields.tagline || '')
                formData.append('text_season', catalogTextFields.season || '')
                formData.append('text_year', catalogTextFields.year || '')
                if (logo) formData.append('logo', logo)
            } else {
                formData.append('brand_name', brandName)
                formData.append('generation_mode', generationMode)
                formData.append('hair_type', hairType)
                formData.append('shot_angle', shotAngle)
                formData.append('pose_type', poseType)

                if (generationMode === 'photo') {
                    formData.append('creative_direction', creativeDirection)
                } else {
                    formData.append('marketing_theme', marketingTheme)
                    formData.append('prop', prop)
                    formData.append('layout_style', layoutStyle)
                    formData.append('headline', headline)
                    formData.append('subtext', subtext)
                    formData.append('brand_text', brand || brandName)
                    formData.append('price', price)
                    formData.append('cta', cta)
                    formData.append('tagline', tagline)
                    if (logo) formData.append('logo', logo)
                }
            }

            const response = await fetch(endpoint, { method: 'POST', body: formData })

            if (!response.ok) {
                const text = await response.text()
                throw new Error(text.substring(0, 200) || `Server error: ${response.status}`)
            }

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = generationMode === 'catalog'
                ? `${collectionName || 'catalog'}_${Date.now()}.zip`
                : `${brandName}_${generationMode}_${Date.now()}.zip`
            document.body.appendChild(a)
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)

            setJobStatus({ status: 'success', message: '✅ Downloaded!' })
            setTimeout(() => setJobStatus(null), 3000)
        } catch (error) {
            setJobStatus({ status: 'error', message: error.message })
        } finally {
            setIsGenerating(false)
        }
    }

    // Render current step content
    const renderStepContent = () => {
        const stepId = currentStepData?.id

        switch (stepId) {
            case 'mode':
                return (
                    <div className="step-content fade-in">
                        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Choose Generation Mode</h2>
                        <div className="mode-toggle-enhanced">
                            {['photo', 'poster', 'catalog'].map(mode => (
                                <button
                                    key={mode}
                                    className={generationMode === mode ? 'active' : ''}
                                    onClick={() => handleModeChange(mode)}
                                >
                                    {mode === 'photo' && '📸 Simple Photo'}
                                    {mode === 'poster' && '🎨 Marketing Poster'}
                                    {mode === 'catalog' && '📚 Master Catalog'}
                                </button>
                            ))}
                        </div>
                        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                            {generationMode === 'photo' && 'Clean studio shots of your products on models'}
                            {generationMode === 'poster' && 'Marketing posters with typography and layouts'}
                            {generationMode === 'catalog' && 'Complete catalog with cover, products, and thank you page'}
                        </p>
                    </div>
                )

            case 'category':
                return (
                    <div className="step-content fade-in">
                        <h2 style={{ marginBottom: '1rem' }}>Category & Model</h2>
                        <div className="form-section">
                            <label className="form-label">Brand Name *</label>
                            <input
                                className="form-input"
                                type="text"
                                value={brandName}
                                onChange={e => setBrandName(e.target.value)}
                                placeholder="Enter your brand name"
                            />
                        </div>
                        <CategorySelector selected={category} onSelect={setCategory} />
                        <ModelDescription
                            skinTone={skinTone}
                            setSkinTone={setSkinTone}
                            hairType={hairType}
                            setHairType={setHairType}
                            bodyType={bodyType}
                            setBodyType={setBodyType}
                        />
                    </div>
                )

            case 'style':
                return (
                    <div className="step-content fade-in">
                        <h2 style={{ marginBottom: '1rem' }}>Style & Direction</h2>
                        <ShotAndPose
                            shotAngle={shotAngle}
                            setShotAngle={setShotAngle}
                            poseType={poseType}
                            setPoseType={setPoseType}
                        />
                        <CreativeDirection
                            value={creativeDirection}
                            onChange={setCreativeDirection}
                        />
                    </div>
                )

            case 'theme':
                return (
                    <div className="step-content fade-in">
                        <h2 style={{ marginBottom: '1rem' }}>Theme & Style</h2>
                        {generationMode === 'poster' && (
                            <MarketingOptions
                                theme={marketingTheme}
                                setTheme={setMarketingTheme}
                                prop={prop}
                                setProp={setProp}
                            />
                        )}
                        {generationMode === 'catalog' && (
                            <div className="form-section">
                                <label className="form-label">Catalog Theme</label>
                                <select
                                    className="form-select"
                                    value={catalogTheme}
                                    onChange={e => setCatalogTheme(e.target.value)}
                                >
                                    <option value="studio_minimal">Studio Minimal</option>
                                    <option value="urban_street">Urban Street</option>
                                    <option value="luxury_gold">Luxury Gold</option>
                                    <option value="natural_organic">Natural Organic</option>
                                </select>
                            </div>
                        )}
                    </div>
                )

            case 'layout':
                return (
                    <div className="step-content fade-in">
                        <h2 style={{ marginBottom: '1rem' }}>Choose Layout</h2>
                        <LayoutPreview
                            selected={layoutStyle}
                            onSelect={setLayoutStyle}
                        />
                        <div style={{ marginTop: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.75rem' }}>Poster Text (Optional)</h3>
                            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <input className="form-input" placeholder="Headline" value={headline} onChange={e => setHeadline(e.target.value)} />
                                <input className="form-input" placeholder="Subtext" value={subtext} onChange={e => setSubtext(e.target.value)} />
                                <input className="form-input" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} />
                                <input className="form-input" placeholder="Tagline" value={tagline} onChange={e => setTagline(e.target.value)} />
                            </div>
                            <div style={{ marginTop: '0.75rem' }}>
                                <label className="form-label">Logo (Optional)</label>
                                <input type="file" accept="image/*" onChange={handleLogoUpload} className="form-input" />
                            </div>
                        </div>
                    </div>
                )

            case 'collection':
                return (
                    <div className="step-content fade-in">
                        <h2 style={{ marginBottom: '1rem' }}>Collection Details</h2>
                        <CatalogForm
                            collectionName={collectionName}
                            setCollectionName={setCollectionName}
                            collectionNumber={collectionNumber}
                            setCollectionNumber={setCollectionNumber}
                            theme={catalogTheme}
                            setTheme={setCatalogTheme}
                            logo={logo}
                            onLogoUpload={handleLogoUpload}
                            textFields={catalogTextFields}
                            setTextFields={setCatalogTextFields}
                        />
                    </div>
                )

            case 'products':
                return (
                    <div className="step-content fade-in">
                        <h2 style={{ marginBottom: '1rem' }}>Upload Products</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            Add 1-5 products. Each product needs a front and back image.
                        </p>
                        <UploadForm
                            products={products}
                            onAdd={handleAddProduct}
                            onRemove={handleRemoveProduct}
                        />
                    </div>
                )

            case 'quality':
                return (
                    <div className="step-content fade-in">
                        <h2 style={{ marginBottom: '1rem' }}>Select Quality</h2>
                        <QualitySelector
                            selected={imageQuality}
                            onSelect={setImageQuality}
                        />
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Ready to Generate!</h3>
                            <p style={{ color: 'var(--text-muted)' }}>
                                {products.length} product(s) • {generationMode} mode • {imageQuality} quality
                            </p>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <span className="logo-icon">👕</span>
                        <span className="logo-text">BONO AI</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
                {/* Progress Indicator */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap'
                }}>
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            onClick={() => index <= currentStep && setCurrentStep(index)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: index <= currentStep ? 'pointer' : 'default',
                                opacity: index <= currentStep ? 1 : 0.4,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: index === currentStep
                                    ? 'linear-gradient(135deg, var(--accent-primary), #4a4a4a)'
                                    : index < currentStep
                                        ? 'var(--success)'
                                        : 'var(--bg-tertiary)',
                                color: index <= currentStep ? 'white' : 'var(--text-muted)',
                                fontSize: '1rem',
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                                boxShadow: index === currentStep ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                            }}>
                                {index < currentStep ? '✓' : step.icon}
                            </div>
                            {index < steps.length - 1 && (
                                <div style={{
                                    width: '24px',
                                    height: '2px',
                                    background: index < currentStep ? 'var(--success)' : 'var(--bg-tertiary)',
                                    transition: 'all 0.3s ease'
                                }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="section-enhanced" style={{ minHeight: '400px' }}>
                    {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '1.5rem',
                    gap: '1rem'
                }}>
                    <button
                        onClick={handleBack}
                        disabled={isFirstStep || isGenerating}
                        style={{
                            padding: '0.875rem 2rem',
                            borderRadius: '12px',
                            border: '2px solid var(--border-color)',
                            background: 'transparent',
                            color: isFirstStep ? 'var(--text-muted)' : 'var(--text-primary)',
                            cursor: isFirstStep ? 'not-allowed' : 'pointer',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            opacity: isFirstStep ? 0.5 : 1,
                            transition: 'all 0.3s ease',
                            flex: 1
                        }}
                    >
                        ← Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!canProceed() || isGenerating}
                        className="btn-generate"
                        style={{
                            flex: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {isGenerating ? (
                            <>
                                <span className="spinner"></span>
                                Generating...
                            </>
                        ) : isLastStep ? (
                            '🚀 Generate Now'
                        ) : (
                            'Next →'
                        )}
                    </button>
                </div>

                {/* Status Message */}
                {jobStatus && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        borderRadius: '8px',
                        textAlign: 'center',
                        background: jobStatus.status === 'success'
                            ? 'rgba(61, 90, 61, 0.1)'
                            : jobStatus.status === 'error'
                                ? 'rgba(139, 64, 64, 0.1)'
                                : 'var(--bg-tertiary)',
                        color: jobStatus.status === 'success'
                            ? 'var(--success)'
                            : jobStatus.status === 'error'
                                ? 'var(--error)'
                                : 'var(--text-primary)'
                    }}>
                        {jobStatus.message}
                    </div>
                )}
            </main>
        </div>
    )
}

export default App
