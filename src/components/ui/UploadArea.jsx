import { useCallback, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import Button from './Button.jsx'
import { classNames } from '../../utils/formatters.js'

export default function UploadArea({ onFileSelected, accept = '.csv,.xlsx,.xls', maxSizeLabel = '100MB' }) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState(null)
  const inputRef = useRef(null)

  const handleFiles = useCallback(
    (files) => {
      const file = files?.[0]
      if (!file) return
      setFileName(file.name)
      onFileSelected?.(file)
    },
    [onFileSelected]
  )

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={classNames(
        'bg-surface-container-lowest rounded-card border-2 border-dashed p-10 flex flex-col items-center justify-center transition-all cursor-pointer min-h-[320px]',
        isDragging ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'
      )}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
        <Icon
          name={fileName ? 'check_circle' : 'cloud_upload'}
          size={36}
          className={fileName ? 'text-emerald-600' : 'text-primary'}
        />
      </div>
      {fileName ? (
        <>
          <h3 className="text-title-lg text-on-surface mb-2">File Received!</h3>
          <p className="text-label-md text-on-surface-variant mb-8">Analyzing {fileName}...</p>
        </>
      ) : (
        <>
          <h3 className="text-title-lg text-on-surface mb-2">Drag &amp; Drop your dataset here</h3>
          <p className="text-label-md text-on-surface-variant mb-8">
            Supported formats: <span className="font-code text-primary">CSV, XLSX, XLS</span> (Max {maxSizeLabel})
          </p>
        </>
      )}
      <Button
        variant="primary"
        size="md"
        onClick={(e) => {
          e.stopPropagation()
          inputRef.current?.click()
        }}
      >
        Browse Files
      </Button>
    </section>
  )
}
