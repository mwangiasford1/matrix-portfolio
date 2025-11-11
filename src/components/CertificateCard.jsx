const CertificateCard = ({ certificate }) => {
  const { title, issuer, date, description, pdfPath } = certificate

  const handleView = () => {
    window.open(pdfPath, '_blank', 'noopener,noreferrer')
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = pdfPath.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="group relative bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 rounded-lg hover:border-matrix-green transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-matrix-green/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold matrix-text group-hover:animate-pulse mb-2">
            {title}
          </h3>
          <p className="text-sm text-matrix-green mb-1">{issuer}</p>
          <p className="text-xs opacity-70">{date}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm opacity-80 mb-6 leading-relaxed">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleView}
          className="group/btn flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black/30 border border-matrix-green/50 rounded-lg hover:border-matrix-green hover:bg-matrix-green/10 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg 
            className="w-4 h-4 group-hover/btn:animate-pulse" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
            />
          </svg>
          <span className="text-sm font-semibold">View</span>
        </button>

        <button
          onClick={handleDownload}
          className="group/btn flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-matrix-green/20 border border-matrix-green rounded-lg hover:bg-matrix-green hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-matrix-green/30 active:scale-95"
        >
          <svg 
            className="w-4 h-4 group-hover/btn:animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
            />
          </svg>
          <span className="text-sm font-semibold">Download</span>
        </button>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-matrix-green/20 group-hover:border-matrix-green/50 transition-colors duration-300 rounded-tr-lg"></div>
    </div>
  )
}

export default CertificateCard