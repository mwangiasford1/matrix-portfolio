import CertificateCard from './CertificateCard'

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: 'Full-Stack Development MERN Stack',
      issuer: 'Power Learn Project (PLP)',
      date: '2024',
      description: 'Comprehensive certification in MongoDB, Express.js, React, and Node.js development',
      pdfPath: '/documents/asford Full-Stack Development MERN Stack certificate.pdf'
    },
    {
      id: 2,
      title: 'AI Foundations & Ethics',
      issuer: 'Otermans Institute of Artificial Intelligence (OIAI)',
      date: '2024',
      description: 'Certificate of completion for foundational understanding of responsible AI and machine learning basics',
      pdfPath: '/documents/OIAI-Certificate-Asford-Mwangi.pdf'
    },
    {
      id: 3,
      title: 'Cybersecurity for Beginners',
      issuer: 'Simplilearn',
      date: '2024',
      description: 'Introduction to cybersecurity principles, threat types, protection strategies and security best practices',
      pdfPath: '/documents/simplilearn cyber security beginner certificate.pdf'
    }
  ]

  return (
    <section id="certificates" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center matrix-text">
          CERTIFICATES.DB
        </h2>
        <p className="text-center mb-8 sm:mb-12 opacity-80 max-w-2xl mx-auto">
          Professional certifications and achievements in software development, AI, and cybersecurity
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates