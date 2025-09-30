import { useState, useEffect } from 'react'
import MatrixRain from './components/MatrixRain'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [matrixEnabled, setMatrixEnabled] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const toggleMatrix = () => setMatrixEnabled(!matrixEnabled)

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    
    console.log('Submitting form data:', formData)
    
    try {
      const response = await fetch('https://matrix-portfolio-7miu.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      console.log('Response status:', response.status)
      const responseData = await response.json()
      console.log('Response data:', responseData)
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitStatus(''), 5000)
      } else {
        setSubmitStatus('error')
        console.error('Server error:', responseData.error)
      }
    } catch (error) {
      console.error('Network error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('nav')
      if (window.scrollY > 100) {
        navbar?.classList.add('backdrop-blur-md')
      } else {
        navbar?.classList.remove('backdrop-blur-md')
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="min-h-screen bg-matrix-dark text-matrix-green relative">
      <MatrixRain isActive={matrixEnabled} />
      <Navbar matrixEnabled={matrixEnabled} toggleMatrix={toggleMatrix} scrollToSection={scrollToSection} />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 matrix-text glitch" data-text="ASFORD">
              ASFORD
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-80 px-4">
              Full Stack Developer | Matrix Enthusiast
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 flex-wrap">
              <a href="https://github.com/mwangiasford1" target="_blank" rel="noopener noreferrer" 
                 className="group p-2 sm:p-3 bg-black/20 backdrop-blur-md border border-matrix-green/30 rounded-full hover:border-matrix-green hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-matrix-green/30">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/asford" target="_blank" rel="noopener noreferrer"
                 className="group p-2 sm:p-3 bg-black/20 backdrop-blur-md border border-matrix-green/30 rounded-full hover:border-matrix-green hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-matrix-green/30">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"
                 className="group p-2 sm:p-3 bg-black/20 backdrop-blur-md border border-matrix-green/30 rounded-full hover:border-matrix-green hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-matrix-green/30">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://discord.gg/NGpwKdYRPY" target="_blank" rel="noopener noreferrer"
                 className="group p-2 sm:p-3 bg-black/20 backdrop-blur-md border border-matrix-green/30 rounded-full hover:border-matrix-green hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-matrix-green/30">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                </svg>
              </a>
              <a href="mailto:mwangiasford12@gmail.com"
                 className="group p-2 sm:p-3 bg-black/20 backdrop-blur-md border border-matrix-green/30 rounded-full hover:border-matrix-green hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-matrix-green/30">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group relative overflow-hidden border border-matrix-green px-8 py-4 font-bold tracking-wider transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-matrix-green/30 active:scale-95"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">VIEW PROJECTS</span>
                <div className="absolute inset-0 bg-matrix-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </button>
              <a 
                href="/Asford_Mwangi_Resume.pdf" 
                download="Asford_Mwangi_Resume.pdf"
                className="group relative overflow-hidden border border-matrix-green px-8 py-4 font-bold tracking-wider transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-matrix-green/30 active:scale-95"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">DOWNLOAD CV</span>
                <div className="absolute inset-0 bg-matrix-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </a>
              <button 
                onClick={() => scrollToSection('contact')}
                className="group relative overflow-hidden border border-matrix-green px-8 py-4 font-bold tracking-wider transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-matrix-green/30 active:scale-95"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">CONTACT</span>
                <div className="absolute inset-0 bg-matrix-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center matrix-text">ABOUT.EXE</h2>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              <div className="order-2 lg:order-1">
                <p className="text-lg leading-relaxed opacity-80 mb-8">
                  I'm Asford Mwangi, a backend-focused software engineering student with a passion for building resilient systems and creative media workflows. Whether I'm debugging Express.js APIs or scripting for VirtualDJ, I thrive on solving real-world problems with precision and flair. My current obsession? Crafting a Matrix-themed portfolio that blends glitch aesthetics with robust MongoDB-backed APIs.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-matrix-green to-green-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <img src="/images/38aebe24-e88a-48b8-bb05-fcd23d881f03_2_watermark.jpeg" alt="Watermark" 
                
                    alt="Asford Mwangi - Backend Developer and Software Engineering Student"
                    loading="lazy"
                    onError={(e) => {e.target.src = '/images/profile-placeholder.svg'}}
                    className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-2xl border-2 border-matrix-green/30 shadow-2xl shadow-matrix-green/20 transition-all duration-300 group-hover:scale-105 group-hover:border-matrix-green"
                  />
                  <div className="absolute inset-0 bg-black/10 rounded-2xl group-hover:bg-transparent transition-all duration-300"></div>
                </div>
              </div>
              <div className="order-3 lg:col-span-2">
                <h3 className="text-2xl font-bold mb-6 matrix-text text-center lg:text-left">🛠️ TECH STACK</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-matrix-green font-semibold mb-2">Backend</h4>
                    <p className="text-sm opacity-80">Node.js, Express.js, MongoDB Atlas, Mongoose</p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-semibold mb-2">Frontend</h4>
                    <p className="text-sm opacity-80">React, Vite, JSX, CSS Modules</p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-semibold mb-2">Debugging Tools</h4>
                    <p className="text-sm opacity-80">Thunder Client, Postman, PowerShell</p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-semibold mb-2">Creative Media</h4>
                    <p className="text-sm opacity-80">OBS Studio, NDI, Teleport, VirtualDJ Scripting, Canva</p>
                  </div>
                  <div>
                    <h4 className="text-matrix-green font-semibold mb-2">Automation</h4>
                    <p className="text-sm opacity-80">PowerShell scripting, Python for environment setup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center matrix-text">⚡ SKILLS.EXE</h2>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              <div className="bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-6 matrix-text">Backend Development</h3>
                {[
                  { name: 'Node.js', level: 90 },
                  { name: 'Express.js', level: 85 },
                  { name: 'MongoDB', level: 80 },
                  { name: 'Python', level: 75 }
                ].map((skill) => (
                  <div key={skill.name} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{skill.name}</span>
                      <span className="text-sm text-matrix-green">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2">
                      <div 
                        className="bg-matrix-green h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-6 matrix-text">Frontend & Tools</h3>
                {[
                  { name: 'React', level: 85 },
                  { name: 'JavaScript', level: 90 },
                  { name: 'Tailwind CSS', level: 80 },
                  { name: 'Git/GitHub', level: 85 }
                ].map((skill) => (
                  <div key={skill.name} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{skill.name}</span>
                      <span className="text-sm text-matrix-green">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2">
                      <div 
                        className="bg-matrix-green h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center matrix-text">💼 EXPERIENCE.LOG</h2>
            <div className="space-y-8">
              {[
                {
                  title: 'Backend Developer',
                  company: 'Freelance',
                  period: '2025 - Present',
                  description: 'Developing robust APIs and database solutions for various clients'
                },
                {
                  title: 'Software Engineering Student',
                  company: 'University',
                  period: '2025 - Present',
                  description: 'Studying computer science with focus on backend development and system design'
                },
                {
                  title: 'Graphics Designer',
                  company: 'Freelance',
                  period: '2024 - Present',
                  description: 'Creating visual content and brand materials using Canva for various clients'
                },
                {
                  title: 'Creative Media Specialist',
                  company: 'Various Projects',
                  period: '2025 - Present',
                  description: 'VirtualDJ scripting and streaming workflow optimization'
                }
              ].map((exp, index) => (
                <div key={index} className="bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 rounded-lg hover:border-matrix-green transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h3 className="text-lg font-bold matrix-text">{exp.title}</h3>
                    <span className="text-sm text-matrix-green">{exp.period}</span>
                  </div>
                  <p className="text-sm opacity-80 mb-2">{exp.company}</p>
                  <p className="text-sm opacity-70">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center matrix-text">🎓 EDUCATION.EDU</h2>
            <div className="space-y-8">
              <div className="bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 rounded-lg hover:border-matrix-green transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold matrix-text mb-2">Power Learn Project (PLP)</h3>
                    <p className="text-lg opacity-90 mb-2">Software Engineering Track</p>
                    <p className="text-sm text-matrix-green mb-3">Specialization: MERN Stack Development</p>
                  </div>
                  <div className="text-4xl">🚀</div>
                </div>
                <div className="space-y-2 text-sm opacity-80">
                  <p>• Backend focus with hands-on API development and deployment</p>
                  <p>• Creative media integration and automation scripting</p>
                  <p>• Full-stack development with MongoDB, Express.js, React, Node.js</p>
                </div>
              </div>
              
              <div className="bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 rounded-lg hover:border-matrix-green transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold matrix-text mb-2">Simplilearn</h3>
                    <p className="text-lg opacity-90 mb-2">Cybersecurity for Beginners</p>
                    <p className="text-sm text-matrix-green mb-3">Security Fundamentals Certification</p>
                  </div>
                  <div className="text-4xl">🔒</div>
                </div>
                <div className="space-y-2 text-sm opacity-80">
                  <p>• Introduction to cybersecurity principles and threat types</p>
                  <p>• Basic protection strategies and security best practices</p>
                  <p>• Hands-on labs and foundational network security concepts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center matrix-text">🏆 ACHIEVEMENTS.DB</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { icon: '🎓', title: 'Software Engineering', desc: 'Currently pursuing degree' },
                { icon: '💻', title: 'Full-Stack Projects', desc: '10+ completed projects' },
                { icon: '🔧', title: 'API Development', desc: 'RESTful API specialist' },
                { icon: '📊', title: 'Database Design', desc: 'MongoDB & SQL expert' },
                { icon: '🎵', title: 'VirtualDJ Scripts', desc: 'Custom automation scripts' },
                { icon: '⚡', title: 'Performance Optimization', desc: 'System efficiency expert' }
              ].map((achievement, index) => (
                <div key={index} className="bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 rounded-lg hover:border-matrix-green hover:scale-105 transition-all duration-300 text-center">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-lg font-bold matrix-text mb-2">{achievement.title}</h3>
                  <p className="text-sm opacity-70">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center matrix-text">💬 TESTIMONIALS.JSON</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: 'Client A',
                  role: 'Project Manager',
                  text: 'Asford delivered exceptional backend solutions with clean, efficient code. His attention to detail is remarkable.'
                },
                {
                  name: 'Colleague B',
                  role: 'Frontend Developer',
                  text: 'Working with Asford was seamless. His APIs are well-documented and reliable. Highly recommended!'
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 rounded-lg hover:border-matrix-green transition-all duration-300">
                  <p className="text-sm opacity-80 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-matrix-green/20 rounded-full flex items-center justify-center">
                      <span className="text-matrix-green font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold text-matrix-green">{testimonial.name}</p>
                      <p className="text-xs opacity-70">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center matrix-text">🚀 FEATURED PROJECTS</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 hover:border-matrix-green transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-matrix-green/20 cursor-pointer group rounded-lg">
                <h3 className="text-xl font-bold mb-4 matrix-text group-hover:animate-pulse">📁 Smart File Manager</h3>
                <p className="opacity-80 mb-4 text-sm">
                  High-performance file management system built with C++. Features efficient file operations, memory management, and cross-platform compatibility.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs border border-matrix-green/50 px-2 py-1 bg-matrix-green/5 backdrop-blur-sm hover:bg-matrix-green/15 transition-colors rounded-full">C++</span>
                  <span className="text-xs border border-matrix-green/50 px-2 py-1 bg-matrix-green/5 backdrop-blur-sm hover:bg-matrix-green/15 transition-colors rounded-full">File System</span>
                  <span className="text-xs border border-matrix-green/50 px-2 py-1 bg-matrix-green/5 backdrop-blur-sm hover:bg-matrix-green/15 transition-colors rounded-full">Memory Management</span>
                </div>
                <div className="flex gap-2">
                  <a href="https://smart-file-manager-6tqp.onrender.com" target="_blank" rel="noopener noreferrer" className="text-xs bg-matrix-green/20 hover:bg-matrix-green/30 px-3 py-1 rounded-full transition-colors">Live Demo</a>
                  <a href="https://github.com/mwangiasford1/file_manager.git" target="_blank" rel="noopener noreferrer" className="text-xs bg-matrix-green/20 hover:bg-matrix-green/30 px-3 py-1 rounded-full transition-colors">GitHub</a>
                </div>
              </div>
              
              <div className="bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 hover:border-matrix-green transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-matrix-green/20 cursor-pointer group rounded-lg">
                <h3 className="text-xl font-bold mb-4 matrix-text group-hover:animate-pulse">🎛️ Wireless Streaming Workflow</h3>
                <p className="opacity-80 mb-4 text-sm">
                  Optimized LAN/WLAN connectivity for low-latency streaming. Custom VirtualDJ scripts for seamless transitions.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs border border-matrix-green/50 px-2 py-1 bg-matrix-green/5 backdrop-blur-sm hover:bg-matrix-green/15 transition-colors rounded-full">OBS</span>
                  <span className="text-xs border border-matrix-green/50 px-2 py-1 bg-matrix-green/5 backdrop-blur-sm hover:bg-matrix-green/15 transition-colors rounded-full">NDI</span>
                  <span className="text-xs border border-matrix-green/50 px-2 py-1 bg-matrix-green/5 backdrop-blur-sm hover:bg-matrix-green/15 transition-colors rounded-full">VirtualDJ</span>
                </div>
                <div className="flex gap-2">
                  <a href="#" className="text-xs bg-matrix-green/20 hover:bg-matrix-green/30 px-3 py-1 rounded-full transition-colors">Live Demo</a>
                  <a href="https://github.com/mwangiasford1" target="_blank" rel="noopener noreferrer" className="text-xs bg-matrix-green/20 hover:bg-matrix-green/30 px-3 py-1 rounded-full transition-colors">GitHub</a>
                </div>
              </div>
              
              <div className="bg-black/20 backdrop-blur-md border border-matrix-green/30 p-6 hover:border-matrix-green transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-matrix-green/20 cursor-pointer group rounded-lg">
                <h3 className="text-xl font-bold mb-4 matrix-text group-hover:animate-pulse">📄 Document Formatter</h3>
                <p className="opacity-80 mb-4 text-sm">
                  Automated formatting for educational assessments and church invitations. Error scanning and layout polishing.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs border border-matrix-green/50 px-2 py-1 bg-matrix-green/5 backdrop-blur-sm hover:bg-matrix-green/15 transition-colors rounded-full">PowerShell</span>
                  <span className="text-xs border border-matrix-green/50 px-2 py-1 bg-matrix-green/5 backdrop-blur-sm hover:bg-matrix-green/15 transition-colors rounded-full">Python</span>
                </div>
                <div className="flex gap-2">
                  <a href="#" className="text-xs bg-matrix-green/20 hover:bg-matrix-green/30 px-3 py-1 rounded-full transition-colors">Live Demo</a>
                  <a href="https://github.com/mwangiasford1" target="_blank" rel="noopener noreferrer" className="text-xs bg-matrix-green/20 hover:bg-matrix-green/30 px-3 py-1 rounded-full transition-colors">GitHub</a>
                </div>
              </div>
            </div>
            
            <div className="mt-12 sm:mt-16">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center matrix-text">📚 BLOG & INSIGHTS</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-black/10 backdrop-blur-sm border border-matrix-green/20 p-4 hover:border-matrix-green/50 transition-all duration-300 hover:scale-105 cursor-pointer rounded-lg hover:shadow-lg hover:shadow-matrix-green/10">
                  <h4 className="font-bold mb-2 text-matrix-green hover:animate-pulse">Debugging Thunder Client Requests Like a Pro</h4>
                  <p className="text-xs opacity-70">Step-by-step guide to resolving malformed JSON and refining POST/DELETE logic.</p>
                </div>
                <div className="bg-black/10 backdrop-blur-sm border border-matrix-green/20 p-4 hover:border-matrix-green/50 transition-all duration-300 hover:scale-105 cursor-pointer rounded-lg hover:shadow-lg hover:shadow-matrix-green/10">
                  <h4 className="font-bold mb-2 text-matrix-green hover:animate-pulse">MongoDB Atlas: From Setup to Secure Access</h4>
                  <p className="text-xs opacity-70">How I configured database users and roles for my portfolio backend.</p>
                </div>
                <div className="bg-black/10 backdrop-blur-sm border border-matrix-green/20 p-4 hover:border-matrix-green/50 transition-all duration-300 hover:scale-105 cursor-pointer rounded-lg hover:shadow-lg hover:shadow-matrix-green/10">
                  <h4 className="font-bold mb-2 text-matrix-green hover:animate-pulse">Streaming Between Worlds</h4>
                  <p className="text-xs opacity-70">Lessons from bridging LAN and WLAN setups for creative media performance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto w-full bg-black/10 backdrop-blur-md border border-matrix-green/20 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center matrix-text">📞 CONTACT ME</h2>
            <p className="text-center mb-6 sm:mb-8 opacity-80 text-sm sm:text-base px-2">
              Let's build something unforgettable. Whether you're looking for a backend wizard, a creative media integrator, or just someone who loves solving tough problems—I'm your guy.
            </p>
            
            {/* Contact Social Links */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 flex-wrap">
              <a href="https://github.com/mwangiasford1" target="_blank" rel="noopener noreferrer"
                 className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-black/20 backdrop-blur-md border border-matrix-green/30 rounded-full hover:border-matrix-green hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="hidden xs:inline">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/asford" target="_blank" rel="noopener noreferrer"
                 className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-black/20 backdrop-blur-md border border-matrix-green/30 rounded-full hover:border-matrix-green hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="hidden xs:inline">LinkedIn</span>
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"
                 className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-black/20 backdrop-blur-md border border-matrix-green/30 rounded-full hover:border-matrix-green hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="hidden xs:inline">Facebook</span>
              </a>
              <a href="https://discord.gg/NGpwKdYRPY" target="_blank" rel="noopener noreferrer"
                 className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-black/20 backdrop-blur-md border border-matrix-green/30 rounded-full hover:border-matrix-green hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.30zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                </svg>
                <span className="hidden xs:inline">Discord</span>
              </a>
              <a href="mailto:mwangiasford12@gmail.com"
                 className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-black/20 backdrop-blur-md border border-matrix-green/30 rounded-full hover:border-matrix-green hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden xs:inline">Email</span>
              </a>
            </div>
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 border border-matrix-green bg-matrix-green/10 backdrop-blur-sm text-center rounded-lg">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 border border-red-500 bg-red-500/10 backdrop-blur-sm text-red-400 text-center rounded-lg">
                ❌ Error sending message. Check console and ensure backend is running on port 5000.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="NAME"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black/20 backdrop-blur-sm border border-matrix-green/50 p-4 focus:border-matrix-green focus:shadow-lg focus:shadow-matrix-green/20 outline-none transition-all duration-300 rounded-lg"
                required
                disabled={isSubmitting}
                maxLength={100}
              />
              <input
                type="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-black/20 backdrop-blur-sm border border-matrix-green/50 p-4 focus:border-matrix-green focus:shadow-lg focus:shadow-matrix-green/20 outline-none transition-all duration-300 rounded-lg"
                required
                disabled={isSubmitting}
                maxLength={254}
              />
              <textarea
                placeholder="MESSAGE"
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-black/20 backdrop-blur-sm border border-matrix-green/50 p-4 focus:border-matrix-green focus:shadow-lg focus:shadow-matrix-green/20 outline-none resize-none transition-all duration-300 rounded-lg"
                required
                disabled={isSubmitting}
                maxLength={1000}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden border border-matrix-green py-4 font-bold tracking-wider transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-matrix-green/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black group-disabled:group-hover:text-matrix-green">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDING...
                    </span>
                  ) : 'SEND MESSAGE'}
                </span>
                <div className="absolute inset-0 bg-matrix-green transform -translate-y-full group-hover:translate-y-0 group-disabled:translate-y-full transition-transform duration-500 ease-out"></div>
              </button>
            </form>
          </div>
        </section>
      </main>
      
      {/* Scroll to Top Button */}
      <button
        onClick={() => scrollToSection('home')}
        className="group fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 overflow-hidden border border-matrix-green p-3 sm:p-4 bg-black/20 backdrop-blur-md transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-2xl hover:shadow-matrix-green/50 active:scale-110 active:rotate-6 rounded-full"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:text-black group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <div className="absolute inset-0 bg-matrix-green transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center"></div>
      </button>
      
      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-matrix-green/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold matrix-text mb-4">ASFORD.EXE</h3>
              <p className="text-sm opacity-70">Backend-focused software engineering student crafting robust systems and creative solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold matrix-text mb-4">QUICK LINKS</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('about')} className="block text-sm hover:text-matrix-green transition-colors">About</button>
                <button onClick={() => scrollToSection('skills')} className="block text-sm hover:text-matrix-green transition-colors">Skills</button>
                <button onClick={() => scrollToSection('education')} className="block text-sm hover:text-matrix-green transition-colors">Education</button>
                <button onClick={() => scrollToSection('projects')} className="block text-sm hover:text-matrix-green transition-colors">Projects</button>
                <button onClick={() => scrollToSection('contact')} className="block text-sm hover:text-matrix-green transition-colors">Contact</button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold matrix-text mb-4">CONNECT</h3>
              <div className="flex gap-3">
                <a href="https://github.com/mwangiasford1" target="_blank" rel="noopener noreferrer" className="p-2 bg-black/20 backdrop-blur-sm border border-matrix-green/30 rounded-full hover:border-matrix-green transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/asford" target="_blank" rel="noopener noreferrer" className="p-2 bg-black/20 backdrop-blur-sm border border-matrix-green/30 rounded-full hover:border-matrix-green transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:mwangiasford12@gmail.com" className="p-2 bg-black/20 backdrop-blur-sm border border-matrix-green/30 rounded-full hover:border-matrix-green transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-matrix-green/30 pt-6 text-center">
            <p className="text-sm opacity-70">© 2025 Asford Mwangi. All rights reserved. Built with React & Matrix vibes.</p>
            <p className="text-xs opacity-50 mt-2">Matrix Portfolio v2.0.0 - Security Enhanced</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App