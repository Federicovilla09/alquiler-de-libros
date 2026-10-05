import { useEffect, useRef, useState } from 'react'
import './CoverUpload.css'
import Button from './Button'

const MAX_SIZE_MB = 5

function CoverUpload({ error: requiredError, onChange }) {
  const [preview, setPreview] = useState(null)
  const [fileError, setFileError] = useState(null)
  const galleryRef = useRef(null)
  const cameraRef = useRef(null)

  // Liberar la dirección temporal de la foto anterior
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  function handleFile(file) {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setFileError('El archivo no es una imagen. Elegí una foto.')
      return
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`La foto pesa más de ${MAX_SIZE_MB} MB. Elegí una más liviana.`)
      return
    }

    setFileError(null)
    setPreview(URL.createObjectURL(file))
    if (onChange) onChange(file)
  }

  function handleInputChange(event) {
    handleFile(event.target.files[0])
    event.target.value = ''
  }

  function handleDrop(event) {
    event.preventDefault()
    handleFile(event.dataTransfer.files[0])
  }

  const message = fileError || requiredError
  const state = preview ? 'uploaded' : message ? 'error' : 'empty'

  return (
    <div
      className={`cover-upload cover-upload--${state}`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      {preview ? (
        <>
          <img className="cover-upload__preview" src={preview} alt="Portada elegida" />
          <Button variant="secondary" icon="camera" onClick={() => galleryRef.current.click()}>
            Cambiar portada
          </Button>
        </>
      ) : (
        <>
          <img className="cover-upload__illustration" src="/illustrations/cover-upload.svg" alt="" />
          <div className="cover-upload__texts">
            <p className="cover-upload__title">Subí una foto de la tapa</p>
            <p className="cover-upload__hint" aria-live="polite">
              {message || 'Arrastrá una imagen aquí, o elegí desde tu galería o cámara'}
            </p>
          </div>
          <div className="cover-upload__actions">
            <Button variant="secondary" icon="picture-gallery" onClick={() => galleryRef.current.click()}>
              Elegir de galería
            </Button>
            <Button icon="camera" onClick={() => cameraRef.current.click()}>
              Tomar foto
            </Button>
          </div>
        </>
      )}

      <input ref={galleryRef} type="file" accept="image/*" hidden onChange={handleInputChange} />
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={handleInputChange} />
    </div>
  )
}

export default CoverUpload