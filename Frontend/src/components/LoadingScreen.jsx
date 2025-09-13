import { useEffect, useState } from 'react'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState('INITIALIZING...')

  useEffect(() => {
    const texts = ['INITIALIZING...', 'LOADING MATRIX...', 'CONNECTING...', 'READY']
    let textIndex = 0
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2
        
        if (newProgress >= 25 && textIndex === 0) {
          setText(texts[1])
          textIndex = 1
        } else if (newProgress >= 50 && textIndex === 1) {
          setText(texts[2])
          textIndex = 2
        } else if (newProgress >= 75 && textIndex === 2) {
          setText(texts[3])
          textIndex = 3
        }
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        
        return newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-matrix-dark flex items-center justify-center z-50">
      <div className="text-center">
        <div className="text-4xl font-bold matrix-text mb-8 animate-pulse">
          ASFORD.EXE
        </div>
        <div className="w-64 h-2 bg-black/50 rounded-full mb-4">
          <div 
            className="h-full bg-matrix-green rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-matrix-green text-sm font-mono">{text}</div>
        <div className="text-matrix-green text-xs mt-2">{progress}%</div>
      </div>
    </div>
  )
}

export default LoadingScreen