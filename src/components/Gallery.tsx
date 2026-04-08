import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DishImage {
  publicId: string;
  caption: string;
}

const Gallery = () => {
  const [dishes, setDishes] = useState<DishImage[]>([]);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [expandedImage, setExpandedImage] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    fetch(`https://res.cloudinary.com/${cloudName}/image/list/web_entre_mar_y_tierra_plato.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data.resources) {
          const images: DishImage[] = data.resources.map(
            (r: { public_id: string; context?: { custom?: { caption?: string; alt?: string } } }) => ({
              publicId: r.public_id,
              caption: r.context?.custom?.caption || r.context?.custom?.alt || r.public_id.replace(/_/g, ' '),
            })
          );
          setDishes(images);
        }
      })
      .catch(console.error);
  }, [cloudName]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % dishes.length);
    }, 5000);
  }, [dishes.length]);

  useEffect(() => {
    if (dishes.length === 0) return;
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer, dishes.length]);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
      }
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const paginate = useCallback((newDirection: number) => {
    setCurrent((prev) => (prev + newDirection + dishes.length) % dishes.length);
    resetTimer();
  }, [dishes.length, resetTimer]);

  const closeLightbox = () => {
    setLightbox(false);
    setExpandedImage(null);
  };

  if (dishes.length === 0) {
    return (
      <section className="relative w-screen h-screen bg-stone-900 flex items-center justify-center">
        <p className="text-stone-400 font-serif text-xl">Cargando galería...</p>
      </section>
    );
  }

  return (
    <>
      <section ref={sectionRef} className="relative w-screen h-screen overflow-hidden bg-stone-900">
        <AnimatePresence mode="wait">
          <motion.img
            key={`bg-${current}`}
            src={`https://res.cloudinary.com/${cloudName}/image/upload/w_800,h_600,c_fill,g_auto,e_blur:800,f_auto,q_30/${dishes[current].publicId}`}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-stone-900/60" />

        <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12 lg:p-20">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={`https://res.cloudinary.com/${cloudName}/image/upload/w_1920,h_1080,c_limit,f_auto,q_auto/${dishes[current].publicId}`}
              alt={dishes[current].caption}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => { setExpandedImage(current); setLightbox(true); }}
            />
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white text-xl md:text-2xl font-serif font-bold drop-shadow-lg"
            >
              {dishes[current].caption}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronRight size={28} />
        </button>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
            onClick={closeLightbox}
          >
            <div className="flex justify-between items-center p-4">
              <h3 className="text-white font-serif text-xl font-bold">Galería</h3>
              <button className="text-white p-2 hover:text-amber-400 transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dishes.map((dish, idx) => (
                  <div key={idx} className="relative group cursor-pointer rounded-xl overflow-hidden" onClick={(e) => { e.stopPropagation(); setExpandedImage(idx); }}>
                    <img
                      src={`https://res.cloudinary.com/${cloudName}/image/upload/w_600,h_600,c_limit,f_auto,q_auto/${dish.publicId}`}
                      alt={dish.caption}
                      className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-serif font-bold">{dish.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {expandedImage !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center"
                  onClick={(e) => { e.stopPropagation(); setExpandedImage(null); }}
                >
                  <img
                    src={`https://res.cloudinary.com/${cloudName}/image/upload/w_1920,h_1080,c_limit,f_auto,q_auto/${dishes[expandedImage].publicId}`}
                    alt={dishes[expandedImage].caption}
                    className="w-full max-w-[95vw] h-auto max-h-[90vh] object-contain"
                  />
                  <p className="absolute bottom-6 text-white font-serif text-xl font-bold">{dishes[expandedImage].caption}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
