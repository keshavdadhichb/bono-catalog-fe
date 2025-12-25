import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function UploadForm({ products, onAddProduct, onRemoveProduct }) {
    const onDropFront = useCallback((acceptedFiles) => {
        // Store front image temporarily
        window.tempFrontImage = acceptedFiles[0]
    }, [])

    const onDropBack = useCallback((acceptedFiles) => {
        if (window.tempFrontImage && acceptedFiles[0]) {
            onAddProduct(window.tempFrontImage, acceptedFiles[0])
            window.tempFrontImage = null
        }
    }, [onAddProduct])

    const { getRootProps: getFrontProps, getInputProps: getFrontInputProps, isDragActive: isFrontDrag } = useDropzone({
        onDrop: onDropFront,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
        maxFiles: 1
    })

    const { getRootProps: getBackProps, getInputProps: getBackInputProps, isDragActive: isBackDrag } = useDropzone({
        onDrop: onDropBack,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
        maxFiles: 1
    })

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div
                    {...getFrontProps()}
                    className={`dropzone ${isFrontDrag ? 'active' : ''}`}
                >
                    <input {...getFrontInputProps()} />
                    <div className="dropzone-icon">1</div>
                    <p>Front View</p>
                    <span>Drop or click</span>
                </div>

                <div
                    {...getBackProps()}
                    className={`dropzone ${isBackDrag ? 'active' : ''}`}
                >
                    <input {...getBackInputProps()} />
                    <div className="dropzone-icon">2</div>
                    <p>Back View</p>
                    <span>Drop or click</span>
                </div>
            </div>

            {products.length > 0 && (
                <div className="product-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.frontPreview} alt="Front" />
                            <button
                                className="remove-btn"
                                onClick={() => onRemoveProduct(product.id)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UploadForm
