import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Gallery from './components/Gallery';
import MenuTabs from './components/MenuTabs';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const ScrollReveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Carta', href: '#menu' },
    { name: 'Nosotros', href: '#historia' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-bark/95 backdrop-blur-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_128,h_128,f_auto,q_auto/logo_ylk3nu`}
              alt="Logo"
              className="h-12 w-12 rounded-full"
            />
            <div className="font-serif italic text-xl font-bold text-cream">Entre Mar y Tierra</div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-cream/80 hover:text-terra-light transition-colors duration-300 font-sans text-sm tracking-wide uppercase">
                {link.name}
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-cream p-2" aria-label="Menú">
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-bark/98 backdrop-blur-md"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-cream/90 hover:text-terra-light font-sans text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="inicio" className="relative h-screen flex items-end overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_1920,h_1080,c_fill,g_auto,f_auto,q_auto/fachada_entre_mar_y_tierra_valdivia_1_iodei8`}
        alt="Fachada de Entre Mar y Tierra en Valdivia"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bark via-bark/40 to-bark/20" />
    </div>

    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-terra-light font-serif italic text-lg md:text-xl mb-3">Tradición Valdiviana</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-cream leading-[0.95] mb-6">
          Entre Mar<br />y Tierra
        </h1>
        <p className="text-cream/70 text-lg md:text-xl max-w-lg mb-10 font-light leading-relaxed">
          Calidez, frescura, sabor y carácter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#menu" className="inline-block bg-terra hover:bg-terra-hover text-cream px-8 py-3.5 transition-colors duration-300 font-sans text-sm tracking-wide uppercase">
            Ver la Carta
          </a>
          <a href="tel:+56443673951" className="inline-block bg-cream/10 hover:bg-cream/20 text-cream px-8 py-3.5 transition-colors duration-300 font-sans text-sm tracking-wide uppercase">
            Reservar Mesa
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);



const History = () => (
  <section id="historia" className="py-20 md:py-28 bg-earth text-cream overflow-hidden">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-16 md:gap-20">
        <div className="md:w-3/5">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight mb-8">Nuestra Esencia</h2>
            <p className="text-cream/50 font-serif italic text-xl md:text-2xl leading-relaxed mb-8">
              "Donde lo simpático conoce lo exquisito."
            </p>
            <p className="text-cream/70 leading-relaxed text-base md:text-lg mb-10 max-w-xl">
              En <strong className="text-cream">Entre Mar y Tierra</strong> aprovechamos los frutos del mar, del huerto y la parrilla para crear un amplio menú lleno de delicias para todo gusto. Los invitamos a probar nuestra experiencia y buen trato, aquí lo memorable viene como garantía.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-serif font-black text-terra-light text-3xl">15+</p>
                <p className="text-cream/40 text-sm mt-1 font-sans">Años de Tradición</p>
              </div>
              <div>
                <p className="font-serif font-black text-sage-light text-3xl">100%</p>
                <p className="text-cream/40 text-sm mt-1 font-sans">Ingredientes Locales</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="md:w-2/5" delay={0.15}>
          <div className="aspect-[3/4] bg-earth-mid rounded-lg overflow-hidden">
            <img
              src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_800,h_1000,c_fill,g_auto,f_auto,q_auto/fachada_entre_mar_y_tierra_valdivia_1_iodei8`}
              alt="Fachada del restaurante Entre Mar y Tierra en Valdivia"
              className="w-full h-full object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contacto" className="bg-sand pt-20 pb-10">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 mb-16">
        <ScrollReveal>
          <div>
            <h3 className="text-2xl font-serif font-black text-earth mb-4">Entre Mar y Tierra</h3>
            <p className="text-earth-light/60 mb-8 text-sm leading-relaxed max-w-sm">El sabor de la cocina valdiviana en un ambiente cálido y familiar.</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/entremarytierra2025/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-earth/5 rounded-full hover:bg-terra hover:text-white transition-all duration-300 text-earth-light">
                <InstagramIcon size={18} />
              </a>
              <a href="https://www.facebook.com/entre.mar.tierra" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-earth/5 rounded-full hover:bg-terra hover:text-white transition-all duration-300 text-earth-light">
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-5">
            <h4 className="font-sans font-bold text-earth text-sm tracking-wide uppercase mb-6">Ubícanos</h4>
            <div className="flex items-start gap-3 text-earth-light/70">
              <MapPin className="text-terra mt-0.5 shrink-0" size={18} />
              <p className="text-sm leading-relaxed">Carlos Anwandter 511,<br />Valdivia, Región de Los Ríos, Chile</p>
            </div>
            <div className="flex items-center gap-3 text-earth-light/70">
              <Phone className="text-terra shrink-0" size={18} />
              <a href="tel:+56443673951" className="text-sm hover:text-earth transition-colors">44 367 3951</a>
            </div>
            <div className="flex items-start gap-3 text-earth-light/70">
              <Clock className="text-terra mt-0.5 shrink-0" size={18} />
              <div className="text-sm leading-relaxed">
                <p>Lun a Sáb: 12:30 a 23:00</p>
                <p>Dom: 12:30 a 18:00</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="rounded-lg overflow-hidden mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.8!2d-73.2456!3d-39.8142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9615ed9b9b9b9b9b%3A0x0!2sCarlos+Anwandter+511%2C+Valdivia%2C+Los+R%C3%ADos%2C+Chile!5e0!3m2!1ses!2scl!4v1700000000000"
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Entre Mar y Tierra, Valdivia"
          />
        </div>
      </ScrollReveal>

      <div className="border-t border-earth/10 pt-8 text-center text-earth-light/40 text-xs">
        <p>&copy; {new Date().getFullYear()} Entre Mar y Tierra, Valdivia. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-terra/20 selection:text-earth">
      <Navbar />
      <Hero />
      <Gallery />
      <MenuTabs />
      <History />
      <Footer />
    </div>
  );
}

export default App;
