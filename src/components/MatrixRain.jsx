import { useEffect, useRef } from 'react'

const MatrixRain = ({ isActive }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")
    const font_size = 10
    const columns = canvas.width / font_size
    const drops = []

    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#00ff41'
      ctx.font = font_size + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * font_size, drops[i] * font_size)
        
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)
    return () => clearInterval(interval)
  }, [isActive])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20"
    />
  )
}

export default MatrixRain