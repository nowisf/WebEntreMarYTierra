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
  const preloadedRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

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

  useEffect(() => {
    if (dishes.length === 0 || preloadedRef.current) return;
    preloadedRef.current = true;
    dishes.forEach((dish) => {
      const img = new Image();
      img.src = `https://res.cloudinary.com/${cloudName}/image/upload/w_800,h_600,c_fill,g_auto,f_auto,q_auto/${dish.publicId}`;
    });
  }, [dishes, cloudName]);

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

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current = null;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < -40) paginate(1);
      else if (dx > 40) paginate(-1);
    }
  };

  if (dishes.length === 0) {
    return (
      <section className="relative bg-earth py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-cream/40 font-serif text-lg text-center">Cargando galería...</p>
        </div>
      </section>
    );
  }

  const getVisibleIndices = () => {
    const indices: number[] = [];
    for (let i = 0; i < 3; i++) {
      indices.push((current + i) % dishes.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <>
      <section ref={sectionRef} className="relative bg-earth py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-black text-cream text-center mb-10">Galería</h2>

          <div className="relative flex items-center">
            <button
              onClick={() => paginate(-1)}
              className="absolute -left-3 md:-left-10 z-20 text-cream/50 hover:text-cream p-2 transition-colors duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft size={32} />
            </button>

            <div
              className="w-full select-none touch-pan-y"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              <div className="flex gap-3 md:gap-5">
                {visibleIndices.map((idx, offset) => (
                  <div key={`${current}-${offset}`} className="flex-1 min-w-0 flex flex-col">
                    <div
                      className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => {
                        if (!dragStartRef.current) {
                          setExpandedImage(idx);
                          setLightbox(true);
                        }
                      }}
                    >
                      <img
                        src={`https://res.cloudinary.com/${cloudName}/image/upload/w_800,h_600,c_fill,g_auto,f_auto,q_auto/${dishes[idx].publicId}`}
                        alt={dishes[idx].caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                        draggable={false}
                      />
                    </div>
                    <p className="text-cream/50 text-xs md:text-sm font-serif text-center mt-3 truncate pointer-events-none">
                      {dishes[idx].caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => paginate(1)}
              className="absolute -right-3 md:-right-10 z-20 text-cream/50 hover:text-cream p-2 transition-colors duration-300"
              aria-label="Siguiente"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          <div className="flex justify-center gap-1.5 mt-8">
            {dishes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrent(idx); resetTimer(); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current ? 'bg-terra w-6' : 'bg-cream/20 hover:bg-cream/40'}`}
                aria-label={`Ir a imagen ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-bark/98 flex flex-col"
            onClick={closeLightbox}
          >
            <div className="flex justify-between items-center px-6 py-4">
              <h3 className="text-cream font-serif font-bold text-lg">Galería</h3>
              <button className="text-cream/60 hover:text-cream p-2 transition-colors" aria-label="Cerrar">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {dishes.map((dish, idx) => (
                  <button
                    key={idx}
                    className="relative group rounded-lg overflow-hidden text-left"
                    onClick={(e) => { e.stopPropagation(); setExpandedImage(idx); }}
                  >
                    <img
                      src={`https://res.cloudinary.com/${cloudName}/image/upload/w_600,h_600,c_fill,g_auto,f_auto,q_auto/${dish.publicId}`}
                      alt={dish.caption}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-cream font-serif font-bold text-sm">{dish.caption}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {expandedImage !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[110] bg-bark flex items-center justify-center p-6"
                  onClick={(e) => { e.stopPropagation(); setExpandedImage(null); }}
                >
                  <img
                    src={`https://res.cloudinary.com/${cloudName}/image/upload/w_1920,h_1080,c_limit,f_auto,q_auto/${dishes[expandedImage].publicId}`}
                    alt={dishes[expandedImage].caption}
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                  <p className="absolute bottom-6 left-0 right-0 text-center text-cream/70 font-serif text-base">{dishes[expandedImage].caption}</p>
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
