import { useState } from 'react'

const Navbar = ({ matrixEnabled, toggleMatrix, scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Education', id: 'education' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ]

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-matrix-green/30 transition-all duration-300 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('home')}
              className="group text-xl font-bold matrix-text glitch transition-all duration-500 hover:scale-110 hover:rotate-1 active:scale-95" 
              data-text="ASFORD.EXE"
            >
              <span className="group-hover:animate-pulse group-hover:drop-shadow-lg group-hover:drop-shadow-matrix-green/50">ASFORD.EXE</span>
            </button>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="group relative matrix-text px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-lg">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-matrix-green transition-all duration-300 group-hover:w-full"></div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMatrix}
              className={`group relative overflow-hidden px-4 py-2 text-xs font-bold border rounded-full transition-all duration-500 hover:scale-110 hover:shadow-lg active:scale-95 ${
                matrixEnabled 
                  ? 'border-matrix-green text-matrix-green bg-matrix-green/10 hover:bg-matrix-green/20 hover:shadow-matrix-green/30' 
                  : 'border-gray-500 text-gray-500 hover:border-matrix-green hover:text-matrix-green hover:shadow-matrix-green/20'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  matrixEnabled ? 'bg-matrix-green animate-pulse' : 'bg-gray-500'
                }`}></div>
                MATRIX {matrixEnabled ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group md:hidden matrix-text hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 active:scale-95"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-matrix-green/30 bg-black/10 backdrop-blur-xl shadow-lg shadow-black/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="group block w-full text-left matrix-text hover:text-white px-4 py-3 text-base font-medium transition-all duration-300 hover:translate-x-2 hover:bg-matrix-green/5 border-l-2 border-transparent hover:border-matrix-green"
                >
                  <span className="group-hover:drop-shadow-lg">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar