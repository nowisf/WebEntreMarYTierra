import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Anchor, Mountain, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Gallery from './components/Gallery';

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nuestra Carta', href: '#menu' },
    { name: 'Historia', href: '#historia' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-stone-900/95 backdrop-blur-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/estesiqsi.png" alt="Logo" className="h-8 w-8" />
            <div className="text-amber-500 font-serif italic text-2xl font-bold">Entre Mar y Tierra</div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-stone-100 hover:text-amber-500 transition-colors font-medium">
                {link.name}
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-100 p-2">
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-stone-900 border-t border-stone-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-stone-100 hover:text-amber-500 text-base font-medium"
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
  <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_1920,h_1080,c_fill,g_auto,f_auto,q_auto/fachada_entre_mar_y_tierra_valdivia_1_iodei8`} 
        alt="Entre Mar y Tierra Fachada" 
        className="w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
    
    <div className="relative z-10 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-amber-400 font-serif italic text-xl md:text-2xl mb-4 block">Tradición Valdiviana</span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Entre Mar y Tierra</h1>
        <p className="text-stone-200 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
          Calidez, frescura, sabor y carácter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium">
            Ver la Carta
          </a>
          <a href="tel:+56443673951" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-3 rounded-full border border-white/30 transition-all duration-300 font-medium">
            Reservar Mesa
          </a>
        </div>
      </motion.div>
    </div>
    
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-1 h-12 rounded-full bg-gradient-to-b from-amber-500 to-transparent"></div>
    </div>
  </section>
);

const MenuSection = () => {
  const categories = [
    {
      title: "Desde el Mar",
      icon: <Anchor className="text-blue-400" />,
      items: [
        { name: "Chupe de Locos", desc: "Suave crema con locos picados y queso gratinado.", price: "$14.500" },
        { name: "Congrio a la Valdiviana", desc: "El clásico caldo con huevo escalfado y papas rústicas.", price: "$12.900" },
        { name: "Caldillo de Pailas", desc: "Surtido de mariscos frescos de la costa valdiviana.", price: "$11.200" }
      ]
    },
    {
      title: "De la Tierra",
      icon: <Mountain className="text-amber-700" />,
      items: [
        { name: "Costillar de Cerdo al Horno", desc: "Adobado en ají color y servido con puré picante.", price: "$13.800" },
        { name: "Plateada en su Jugo", desc: "Cocción lenta de 8 horas con guarnición de charquicán.", price: "$12.500" },
        { name: "Pastel de Choclo", desc: "En paila de greda con pino de carne y pollo.", price: "$10.900" }
      ]
    }
  ];

  return (
    <section id="menu" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Nuestra Carta</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
            <p className="mt-4 text-stone-600">Sabores caseros preparados con ingredientes de productores locales.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {categories.map((cat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                <div className="flex items-center gap-3 mb-8">
                  {cat.icon}
                  <h3 className="text-2xl font-serif font-bold text-stone-800">{cat.title}</h3>
                </div>
                <div className="space-y-8">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start group">
                      <div>
                        <h4 className="font-bold text-stone-900 group-hover:text-amber-700 transition-colors">{item.name}</h4>
                        <p className="text-stone-500 text-sm">{item.desc}</p>
                      </div>
                      <span className="font-serif font-bold text-amber-800">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={0.4}>
          <p className="mt-12 text-center italic text-stone-500 font-serif">* Menú sujeto a disponibilidad de temporada.</p>
        </ScrollReveal>
      </div>
    </section>
  );
};

const History = () => (
  <section id="historia" className="py-24 bg-stone-900 text-stone-100 overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <ScrollReveal className="md:w-1/2">
          <h2 className="text-4xl font-serif font-bold mb-6">Nuestra Esencia</h2>
          <p className="text-stone-400 leading-relaxed mb-6 italic text-lg">
            "Donde lo simpático conoce lo exquisito."
          </p>
          <p className="text-stone-300 leading-relaxed mb-6">
            En <strong>Entre Mar y Tierra</strong> aprovechamos los frutos del mar, del huerto y la parrilla para crear un amplio menú lleno de delicias para todo gusto. Los invitamos a probar nuestra experiencia y buen trato, ¡aquí lo memorable viene como garantía!
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="border-l-2 border-amber-600 pl-4">
              <h4 className="text-amber-500 font-bold text-2xl">15+</h4>
              <p className="text-sm text-stone-400 font-medium">Años de Tradición</p>
            </div>
            <div className="border-l-2 border-amber-600 pl-4">
              <h4 className="text-amber-500 font-bold text-2xl">100%</h4>
              <p className="text-sm text-stone-400 font-medium">Ingredientes Locales</p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal className="md:w-1/2 relative" delay={0.2}>
          <div className="aspect-square bg-stone-800 rounded-2xl overflow-hidden shadow-2xl rotate-3">
             <img src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_800,h_800,c_fill,g_auto,f_auto,q_auto/fachada_entre_mar_y_tierra_valdivia_1_iodei8`} alt="Entre Mar y Tierra Fachada" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-amber-600/20 backdrop-blur-xl rounded-2xl -z-10 -rotate-6 border border-amber-600/30"></div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contacto" className="bg-stone-50 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <ScrollReveal>
          <div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Entre Mar y Tierra</h3>
            <p className="text-stone-600 mb-6">El sabor de la cocina valdiviana en un ambiente cálido y familiar.</p>
            <div className="flex gap-4">
               <a href="https://www.instagram.com/entremarytierra2025/" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-200 rounded-full hover:bg-amber-600 hover:text-white transition-all text-stone-600"><InstagramIcon size={20} /></a>
               <a href="https://www.facebook.com/entre.mar.tierra" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-200 rounded-full hover:bg-amber-600 hover:text-white transition-all text-stone-600"><FacebookIcon size={20} /></a>
            </div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <div className="space-y-4">
            <h4 className="font-bold text-stone-900 mb-6">Ubícanos</h4>
            <div className="flex items-start gap-3 text-stone-600">
              <MapPin className="text-amber-700 mt-1 shrink-0" size={20} />
              <p>Carlos Anwandter 511,<br />Valdivia, Región de Los Ríos, Chile</p>
            </div>
            <div className="flex items-center gap-3 text-stone-600">
              <Phone className="text-amber-700 shrink-0" size={20} />
              <p>44 367 3951</p>
            </div>
            <div className="flex items-start gap-3 text-stone-600">
              <Clock className="text-amber-700 mt-1 shrink-0" size={20} />
              <div>
                <p>Lun - Sáb: 12:30 a 23:00</p>
                <p>Dom: 12:30 a 18:00</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="rounded-2xl overflow-hidden shadow-md mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.8!2d-73.2456!3d-39.8142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9615ed9b9b9b9b9b%3A0x0!2sCarlos+Anwandter+511%2C+Valdivia%2C+Los+R%C3%ADos%2C+Chile!5e0!3m2!1ses!2scl!4v1700000000000"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Entre Mar y Tierra - Valdivia"
          ></iframe>
        </div>
      </ScrollReveal>
      
      <div className="border-t border-stone-200 pt-8 text-center text-stone-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Entre Mar y Tierra - Valdivia, Chile. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-200 selection:text-amber-900">
      <Navbar />
      <Hero />
      <Gallery />
      <MenuSection />
      <History />
      <Footer />
    </div>
  );
}

export default App;
