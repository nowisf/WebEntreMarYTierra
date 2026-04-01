import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Utensils, Anchor, Mountain, Menu as MenuIcon, X, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        src="/hero-restaurant.jpg" 
        alt="Entre Mar y Tierra Interior" 
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
          Donde los secretos de la costa y los sabores del campo se reúnen en el corazón de Valdivia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium">
            Ver la Carta
          </a>
          <a href="#contacto" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-3 rounded-full border border-white/30 transition-all duration-300 font-medium">
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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Nuestra Carta</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          <p className="mt-4 text-stone-600">Sabores caseros preparados con ingredientes de productores locales.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
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
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="italic text-stone-500 mb-6 font-serif">* Menú sujeto a disponibilidad de temporada.</p>
          <button className="inline-flex items-center gap-2 border-2 border-stone-800 text-stone-800 px-8 py-3 rounded-full hover:bg-stone-800 hover:text-white transition-all">
            <Utensils size={20} />
            Descargar Menú Completo (PDF)
          </button>
        </div>
      </div>
    </section>
  );
};

const History = () => (
  <section id="historia" className="py-24 bg-stone-900 text-stone-100 overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-serif font-bold mb-6">Nuestra Esencia</h2>
          <p className="text-stone-400 leading-relaxed mb-6 italic text-lg">
            "No somos una sucursal, somos un rincón único nacido frente al río Calle-Calle."
          </p>
          <p className="text-stone-300 leading-relaxed mb-6">
            En Valdivia, la lluvia invita a compartir. <strong>Entre Mar y Tierra</strong> nació con la idea de rescatar las recetas de nuestras abuelas, utilizando lo que el mar nos entrega en Niebla y lo que el campo cultiva en los alrededores de la Región de los Ríos.
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
        </div>
        <div className="md:w-1/2 relative">
          <div className="aspect-square bg-stone-800 rounded-2xl overflow-hidden shadow-2xl rotate-3">
             <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80" alt="Plato Chileno" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-amber-600/20 backdrop-blur-xl rounded-2xl -z-10 -rotate-6 border border-amber-600/30"></div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contacto" className="bg-stone-50 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div>
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Entre Mar y Tierra</h3>
          <p className="text-stone-600 mb-6">El sabor de la cocina valdiviana en un ambiente cálido y familiar.</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/entremarytierra2025/" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-200 rounded-full hover:bg-amber-600 hover:text-white transition-all text-stone-600"><Instagram size={20} /></a>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold text-stone-900 mb-6">Ubícanos</h4>
          <div className="flex items-start gap-3 text-stone-600">
            <MapPin className="text-amber-700 mt-1 shrink-0" size={20} />
            <p>Costanera Arturo Prat 1234,<br />Valdivia, Región de Los Ríos, Chile</p>
          </div>
          <div className="flex items-center gap-3 text-stone-600">
            <Phone className="text-amber-700 shrink-0" size={20} />
            <p>+56 9 443673951</p>
          </div>
          <div className="flex items-start gap-3 text-stone-600">
            <Clock className="text-amber-700 mt-1 shrink-0" size={20} />
            <div>
              <p>Lun - Sáb: 12:30 a 23:00</p>
              <p>Dom: 12:30 a 18:00</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-stone-900 mb-6">Suscríbete a novedades</h4>
          <p className="text-stone-600 mb-4 text-sm">Recibe noticias de nuestros platos de temporada.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Tu correo" className="bg-white border border-stone-200 px-4 py-2 rounded-lg flex-grow outline-none focus:ring-2 focus:ring-amber-500" />
            <button className="bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">OK</button>
          </div>
        </div>
      </div>
      
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
      <MenuSection />
      <History />
      <Footer />
    </div>
  );
}

export default App;
