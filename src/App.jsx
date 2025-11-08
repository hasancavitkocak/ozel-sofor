import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)
      
      // Active section detection
      const sections = ['home', 'services', 'fleet', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = `Merhaba, web sitesinden ulaşıyorum.%0A%0AAdım: ${formData.name}%0ATelefon: ${formData.phone}%0AEmail: ${formData.email}%0AHizmet: ${formData.service}%0AMesaj: ${formData.message}`
    window.open(`https://wa.me/905536305004?text=${message}`, '_blank')
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollProgress = isScrolled ? Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100) : 0

  return (
    <div className="app">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      
      {/* Custom Cursor Effect */}
      <div 
        className="cursor-glow" 
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      ></div>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-brand" title="İstanbul Özel Şoför - Profesyonel Şoförlük Hizmeti">
            <span className="brand-icon">🚗</span>
            <span className="brand-text">İstanbul Özel Şoför</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>Ana Sayfa</a></li>
            <li><a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Hizmetler</a></li>
            <li><a href="#fleet" className={activeSection === 'fleet' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('fleet') }}>Hakkımda</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>İletişim</a></li>
          </ul>
          <a href="tel:05536305004" className="nav-cta">
            <span className="phone-icon">📞</span> 0553 630 50 04
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Güvenilir & Profesyonel</span>
            <span className="title-main">Özel Şoför</span>
          </h1>
          <p className="hero-subtitle">Aracınızı ben kullanayım, siz yolculuğun tadını çıkarın</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
              Hemen İletişime Geç
            </button>
            <a href="https://wa.me/905536305004" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <svg className="whatsapp-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Deneyimli Şoför</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Güvenli Yolculuk</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>7/24 Hizmet</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection('services')}>
          <span>Aşağı Kaydır</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">Hizmetlerim</h2>
          <p className="section-subtitle">Profesyonel ve güvenilir özel şoförlük</p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">✈️</div>
              <h3>Havalimanı Transfer</h3>
              <p>İstanbul Havalimanı ve Sabiha Gökçen'e/den kendi aracınızla güvenli ve zamanında ulaşım</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🏙️</div>
              <h3>Şehir İçi Şoförlük</h3>
              <p>İstanbul'un her noktasına aracınızı ben kullanarak profesyonel şoförlük hizmeti</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🛣️</div>
              <h3>Şehirlerarası Sürüş</h3>
              <p>Uzun yolculuklarınızda aracınızı güvenle kullanarak yorulmadan hedefinize ulaşın</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>İş Toplantıları</h3>
              <p>Toplantılarınıza odaklanın, aracınızı ben kullanayım. Zamanında ve güvenli ulaşım</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎉</div>
              <h3>Özel Günler</h3>
              <p>Düğün, nişan gibi özel günlerinizde aracınızı ben kullanarak keyifli anlar yaşayın</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">⏰</div>
              <h3>7/24 Hizmet</h3>
              <p>Gece-gündüz her saatte aracınızı kullanarak güvenilir şoförlük desteği</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="fleet" className="why-choose">
        <div className="container">
          <h2 className="section-title">Neden Ben?</h2>
          <p className="section-subtitle">Profesyonel ve güvenilir hizmet garantisi</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <div className="feature-content">
                <h3>Deneyimli & Yetenekli</h3>
                <p>Yıllarca edindiğim tecrübe ile her marka ve model araca hakim, İstanbul'un tüm rotalarını biliyorum.</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-number">02</div>
              <div className="feature-content">
                <h3>Güvenilir & Dakik</h3>
                <p>Zamanınıza değer veriyor, aracınıza özen gösteriyor ve randevularınıza zamanında yetişmenizi sağlıyorum.</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-number">03</div>
              <div className="feature-content">
                <h3>Güvenli Sürüş</h3>
                <p>Savunma sürüşü teknikleri ile trafik kurallarına uygun, güvenli ve rahat bir yolculuk sağlıyorum.</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-number">04</div>
              <div className="feature-content">
                <h3>Aracınıza Özen</h3>
                <p>Aracınıza kendi aracımmış gibi özen gösteriyor, temiz ve düzenli kullanıyorum.</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-number">05</div>
              <div className="feature-content">
                <h3>Uygun & Şeffaf Fiyat</h3>
                <p>Kaliteli şoförlük hizmetini uygun fiyatlarla sunuyor, gizli ücret yok, şeffaf fiyatlandırma yapıyorum.</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-number">06</div>
              <div className="feature-content">
                <h3>7/24 Ulaşılabilir</h3>
                <p>Gece-gündüz her saatte arayabilir, acil durumlarınızda yanınızda olabilirim.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h2>İletişime Geçin</h2>
              <p>Aracınızı güvenle teslim edebileceğiniz profesyonel şoförlük hizmeti. 7/24 ulaşabilirsiniz.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>Telefon</h4>
                    <a href="tel:05536305004">0553 630 50 04</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" width="40" height="40" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <div>
                    <h4>WhatsApp</h4>
                    <a href="https://wa.me/905536305004" target="_blank" rel="noopener noreferrer">Mesaj Gönder</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>Hizmet Bölgesi</h4>
                    <p>İstanbul & Türkiye</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">⏰</div>
                  <div>
                    <h4>Çalışma Saatleri</h4>
                    <p>7/24 Hizmetinizdeyiz</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Rezervasyon Formu</h3>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  placeholder="E-posta Adresiniz"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <select
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Hizmet Seçiniz</option>
                  <option value="Havalimanı Transfer">Havalimanı Transfer</option>
                  <option value="Şehir İçi Transfer">Şehir İçi Transfer</option>
                  <option value="Şehirlerarası">Şehirlerarası</option>
                  <option value="Kurumsal Hizmet">Kurumsal Hizmet</option>
                  <option value="Özel Etkinlik">Özel Etkinlik</option>
                  <option value="Şehir Turu">Şehir Turu</option>
                </select>
              </div>
              
              <div className="form-group">
                <textarea
                  placeholder="Mesajınız (Tarih, saat, adres vb.)"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary btn-block">
                WhatsApp ile Gönder
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>🚗 İstanbul Özel Şoför</h3>
              <p>Aracınızı güvenle teslim edebileceğiniz deneyimli ve profesyonel şoförlük hizmeti</p>
            </div>
            <div className="footer-links">
              <h4>Hızlı Linkler</h4>
              <ul>
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>Ana Sayfa</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Hizmetler</a></li>
                <li><a href="#fleet" onClick={(e) => { e.preventDefault(); scrollToSection('fleet') }}>Hakkımda</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>İletişim</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>İletişim</h4>
              <p>📞 <a href="tel:05536305004">0553 630 50 04</a></p>
              <p>💬 <a href="https://wa.me/905536305004" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 İstanbul Özel Şoför. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/905536305004" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile iletişime geç">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Yukarı çık"
      >
        ↑
      </button>
    </div>
  )
}

export default App
