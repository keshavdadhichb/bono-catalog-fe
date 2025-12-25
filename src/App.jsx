import { useState, useCallback } from 'react'
import UploadForm from './components/UploadForm'
import CategorySelector from './components/CategorySelector'
import ModelDescription from './components/ModelDescription'
import ShotAndPose from './components/ShotAndPose'
import CreativeDirection from './components/CreativeDirection'
import GenerationProgress from './components/GenerationProgress'

function App() {
    // Form state
    const [category, setCategory] = useState('teen_boy')
    const [brandName, setBrandName] = useState('')
    const [creativeDirection, setCreativeDirection] = useState('')
    const [products, setProducts] = useState([])

    // Model description
    const [skinTone, setSkinTone] = useState('medium brown')
    const [hairType, setHairType] = useState('short black hair')
    const [bodyType, setBodyType] = useState('')

    // Shot and pose
    const [shotAngle, setShotAngle] = useState('front_facing')
    const [poseType, setPoseType] = useState('catalog_standard')

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
            formData.append('creative_direction', creativeDirection)
            formData.append('skin_tone', skinTone)
            formData.append('hair_type', hairType)
            formData.append('body_type', bodyType)
            formData.append('shot_angle', shotAngle)
            formData.append('pose_type', poseType)

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
                        Virtual Try-On
                    </div>
                </div>
            </header>

            <main className="main-content">
                <div className="hero">
                    <h1>Model Photo Generation</h1>
                    <p>
                        Generate professional virtual try-on photos for your products.
                    </p>
                </div>

                {!jobId ? (
                    <div className="form-container">
                        {/* Step 1: Category */}
                        <section className="form-section">
                            <h2><span className="step">1</span>Category</h2>
                            <CategorySelector value={category} onChange={setCategory} />
                        </section>

                        {/* Step 2: Brand Name */}
                        <section className="form-section">
                            <h2><span className="step">2</span>Brand</h2>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    placeholder="Brand name"
                                />
                            </div>
                        </section>

                        {/* Step 3: Model Appearance */}
                        <section className="form-section">
                            <h2><span className="step">3</span>Model</h2>
                            <ModelDescription
                                skinTone={skinTone}
                                hairType={hairType}
                                bodyType={bodyType}
                                onSkinToneChange={setSkinTone}
                                onHairTypeChange={setHairType}
                                onBodyTypeChange={setBodyType}
                            />
                        </section>

                        {/* Step 4: Shot & Pose */}
                        <section className="form-section">
                            <h2><span className="step">4</span>Pose</h2>
                            <ShotAndPose
                                shotAngle={shotAngle}
                                poseType={poseType}
                                onShotAngleChange={setShotAngle}
                                onPoseTypeChange={setPoseType}
                            />
                        </section>

                        {/* Step 5: Upload Products */}
                        <section className="form-section">
                            <h2><span className="step">5</span>Products ({products.length}/10)</h2>
                            <UploadForm
                                products={products}
                                onAddProduct={handleAddProduct}
                                onRemoveProduct={handleRemoveProduct}
                            />
                        </section>

                        {/* Step 6: Creative Direction */}
                        <section className="form-section">
                            <h2><span className="step">6</span>Direction (Optional)</h2>
                            <CreativeDirection
                                value={creativeDirection}
                                onChange={setCreativeDirection}
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
                                'Generate Photos'
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
