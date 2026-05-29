import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Fish, Beef, Coffee, Wine, Sparkles, Utensils, ChefHat, Flame, Beer, GlassWater, Cake, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { menuData, MenuItem } from '../data/menuData';

// Map 13 categories to beautiful icons
const categoryIcons: Record<string, React.ReactNode> = {
  "aperitivos-de-la-casa": <Wine size={18} />,
  "formato-sour": <GlassWater size={18} />,
  cervezas: <Beer size={18} />,
  "entradas-de-mar": <Fish size={18} />,
  "entradas-de-tierra": <Beef size={18} />,
  "platos-de-fondo-mar": <Fish size={18} />,
  "platos-de-fondo-tierra": <Beef size={18} />,
  "platos-tradicionales": <Utensils size={18} />,
  "guarnicion-del-plato": <ChefHat size={18} />,
  "salsas-y-salteados": <Flame size={18} />,
  postres: <Cake size={18} />,
  tragos: <Wine size={18} />,
  "formato-a-las-rocas": <GlassWater size={18} />
};

export default function MenuTabs() {
  const [activeTab, setActiveTab] = useState<string>(menuData[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeHeight, setActiveHeight] = useState<number | string>('auto');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollAnimationIdRef = useRef<number | null>(null);

  const activeTabRef = useRef(activeTab);
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  // Función matemática de atenuación: easeInOutCubic
  // Curva cúbica simétrica: acelera al inicio y desacelera suavemente al final
  const easeInOutCubic = (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };

  // Interpolación de scroll vertical personalizada usando easeInOutCubic (cancelable por el usuario)
  const animateScrollCubic = (targetY: number, duration: number = 650) => {
    if (scrollAnimationIdRef.current) {
      cancelAnimationFrame(scrollAnimationIdRef.current);
    }

    const startY = window.pageYOffset;
    const difference = targetY - startY;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startY + difference * easeProgress);

      if (progress < 1) {
        scrollAnimationIdRef.current = requestAnimationFrame(step);
      } else {
        scrollAnimationIdRef.current = null;
      }
    };

    scrollAnimationIdRef.current = requestAnimationFrame(step);
  };

  // Animar simultáneamente el scroll vertical de la ventana y el horizontal del contenedor
  // Admite una función de easing para personalizar la curva (p. ej. lineal o easeInOutCubic)
  const animateDoubleScroll = (
    targetY: number, 
    targetX: number, 
    duration: number = 600,
    easing: (x: number) => number = easeInOutCubic
  ) => {
    if (scrollAnimationIdRef.current) {
      cancelAnimationFrame(scrollAnimationIdRef.current);
    }

    const container = scrollContainerRef.current;
    if (!container) return;

    // Desactivar temporalmente el scroll-snap del contenedor para un deslizamiento horizontal fluido y continuo (evita saltos página por página)
    container.style.setProperty('scroll-snap-type', 'none');

    const startY = window.pageYOffset;
    const differenceY = targetY - startY;

    const startX = container.scrollLeft;
    const differenceX = targetX - startX;

    const startTime = performance.now();

    // Desactivar temporalmente scroll smooth de HTML para evitar conflictos de suavizado nativo
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    const handleUserInteraction = () => {
      if (scrollAnimationIdRef.current) {
        cancelAnimationFrame(scrollAnimationIdRef.current);
        scrollAnimationIdRef.current = null;
      }
      cleanupListeners();
      isProgrammaticScrollRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (container && container.contains(e.target as Node)) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX) * 2 && Math.abs(e.deltaY) > 5) {
          handleUserInteraction();
        }
        return;
      }
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 2) {
        handleUserInteraction();
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 5) {
          handleUserInteraction();
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (container && container.contains(e.target as Node)) {
        return;
      }
      handleUserInteraction();
    };

    const cleanupListeners = () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
      container.style.removeProperty('scroll-snap-type'); // Restaurar scroll-snap
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = easing(progress);
      
      window.scrollTo(0, startY + differenceY * easeProgress);
      container.scrollTo(startX + differenceX * easeProgress, 0);

      if (progress < 1) {
        scrollAnimationIdRef.current = requestAnimationFrame(step);
      } else {
        cleanupListeners();
        scrollAnimationIdRef.current = null;
        isProgrammaticScrollRef.current = false;
      }
    };

    scrollAnimationIdRef.current = requestAnimationFrame(step);
  };

  // 2. Alineación vertical cúbica (suave e interpolada para deslizamiento manual/swipe)
  const alignWindowVerticallyCubic = () => {
    const menuContent = document.getElementById('menu-content');
    if (menuContent) {
      const rect = menuContent.getBoundingClientRect();
      if (rect.top < 80 || rect.top > 100) {
        const yOffset = -90; // Espacio para el navbar sticky (90px)
        const targetY = rect.top + window.pageYOffset + yOffset;
        animateScrollCubic(targetY, 650); // 650ms de duración con la curva easeInOutCubic
      }
    }
  };

  // Sincronizar el scroll horizontal con las pestañas de categorías (scrollspy bidireccional)
  const handleContainerScroll = () => {
    if (isProgrammaticScrollRef.current) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollLeft = container.scrollLeft;
    
    // Buscar qué página de categoría está más cerca del borde izquierdo de scroll actual
    let closestCatId = menuData[0].id;
    let minDiff = Infinity;
    
    menuData.forEach((cat) => {
      const pageEl = document.getElementById(`category-page-${cat.id}`);
      if (pageEl) {
        const diff = Math.abs(pageEl.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestCatId = cat.id;
        }
      }
    });
    
    if (closestCatId && activeTabRef.current !== closestCatId) {
      setActiveTab(closestCatId);
      alignWindowVerticallyCubic(); // Iniciar alineación vertical cúbica inmediatamente al cruzar el punto medio
    }
  };

  // Ajustar dinámicamente la altura del contenedor principal basado en la página activa
  useEffect(() => {
    if (searchQuery) return;
    
    const updateHeight = () => {
      const activeEl = document.getElementById(`category-page-${activeTab}`);
      if (activeEl) {
        // Al estar la pestaña activa en height: 'auto', scrollHeight siempre devolverá
        // la altura natural de su contenido de forma fidedigna.
        setActiveHeight(activeEl.scrollHeight);
      }
    };

    updateHeight();
    
    // Esperas adicionales para asegurar estabilidad en la renderización y carga de fuentes
    const t1 = setTimeout(updateHeight, 100);
    const t2 = setTimeout(updateHeight, 300);
    
    window.addEventListener('resize', updateHeight);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateHeight);
    };
  }, [activeTab, searchQuery]);

  // Scroll active sidebar item into view inside the sticky container
  useEffect(() => {
    const activeEl = document.getElementById(`sidebar-btn-${activeTab}`);
    const container = document.getElementById('sidebar-container');
    if (activeEl && container) {
      const containerHeight = container.clientHeight;
      const elOffset = activeEl.offsetTop;
      const elHeight = activeEl.clientHeight;
      const currentScroll = container.scrollTop;

      // Scroll only if the active element is outside the visible viewport of the sidebar
      if (elOffset < currentScroll || (elOffset + elHeight) > (currentScroll + containerHeight)) {
        container.scrollTo({
          top: elOffset - (containerHeight / 2) + (elHeight / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);

  useEffect(() => {
    return () => {
      if (programmaticScrollTimeoutRef.current) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
      if (scrollAnimationIdRef.current) {
        cancelAnimationFrame(scrollAnimationIdRef.current);
      }
    };
  }, []);

  // Global search filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();

    const results: { categoryName: string; sectionName?: string; item: MenuItem }[] = [];
    menuData.forEach((cat) => {
      cat.sections.forEach((sec) => {
        sec.items.forEach((item) => {
          const matchName = item.name.toLowerCase().includes(query);
          const matchDesc = item.desc?.toLowerCase().includes(query) || false;
          const matchSection = sec.name?.toLowerCase().includes(query) || false;
          if (matchName || matchDesc || matchSection) {
            results.push({
              categoryName: cat.name,
              sectionName: sec.name,
              item
            });
          }
        });
      });
    });
    return results;
  }, [searchQuery]);

  const handleTabClick = (catId: string) => {
    setActiveTab(catId);
    
    // Activar bandera para omitir actualizaciones del scroll spy durante la transición
    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimeoutRef.current) {
      clearTimeout(programmaticScrollTimeoutRef.current);
    }
    // Timeout de respaldo por seguridad, la bandera se libera al terminar la animación
    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 1000);

    const menuContent = document.getElementById('menu-content');
    const container = scrollContainerRef.current;
    const pageEl = document.getElementById(`category-page-${catId}`);
    
    if (container && pageEl) {
      const targetX = pageEl.offsetLeft;
      let targetY = window.pageYOffset;
      
      if (menuContent) {
        const rect = menuContent.getBoundingClientRect();
        const yOffset = -90; // Espacio para el navbar sticky (90px)
        targetY = rect.top + window.pageYOffset + yOffset;
      }
      
      // Animar ambos scrolls al mismo tiempo y con la misma duración para que lleguen juntos
      // Usamos una función lineal (x => x) para que la curva sea LINEAR si o si al clickear una pestaña
      animateDoubleScroll(targetY, targetX, 600, (x) => x);
    }
  };

  const scrollPage = (direction: number) => {
    const currentIndex = menuData.findIndex(cat => cat.id === activeTab);
    if (currentIndex === -1) return;
    
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < menuData.length) {
      handleTabClick(menuData[nextIndex].id);
    }
  };

  const clearSearch = () => setSearchQuery('');

  return (
    <section id="menu" className="py-20 md:py-28 bg-bark text-cream scroll-mt-10 relative overflow-x-clip">
      
      {/* Header Container aligned to page margins */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-cream leading-tight">Nuestra Carta</h2>
            <p className="mt-3 text-cream/70 font-sans text-base max-w-xl">
              Sabores tradicionales de Valdivia, desde la abundancia del mar de nuestra costa hasta las ricas carnes de la tierra.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-cream/40">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Buscar un plato o ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-10 py-3 bg-cream-dark/10 border border-cream/15 focus:border-terra-light/40 focus:outline-none text-cream font-sans text-sm rounded-xl placeholder-cream/40 transition-all duration-300 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-cream/40 hover:text-cream transition-colors cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Content Area */}
      <div id="menu-content" className="min-h-[400px] relative z-10 w-full">
          <AnimatePresence mode="wait">
            {searchQuery ? (
              // Search Results View inside a styled cream card (aligned to page margins)
              <div className="max-w-6xl mx-auto px-6">
                <motion.div
                  key="search-results"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-4xl mx-auto bg-cream border border-earth/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-earth"
                >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-earth/10">
                  <h3 className="text-2xl font-serif font-bold text-earth">
                    Resultados para "{searchQuery}"
                  </h3>
                  <button 
                    onClick={clearSearch}
                    className="text-terra hover:underline font-sans text-sm font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    Ver toda la carta
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  <div className="max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                      {searchResults.map(({ categoryName, sectionName, item }, idx) => (
                        <motion.div
                          key={`${item.name}-${idx}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.02 }}
                          className="group flex flex-col justify-between py-4 border-b border-earth/10 hover:border-earth/20 transition-all duration-300"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 bg-earth/5 text-earth/50 rounded">
                                {categoryName}
                              </span>
                              {sectionName && (
                                <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 bg-earth/5 text-earth/40 rounded">
                                  {sectionName}
                                </span>
                              )}
                            </div>
                            <div className="flex justify-between items-start gap-4">
                              <h4 className="font-sans font-bold text-earth text-base group-hover:text-terra transition-colors duration-300">
                                {item.name}
                              </h4>
                              <span className="font-serif font-bold text-terra text-base shrink-0">
                                {item.price}
                              </span>
                            </div>
                            {item.desc && (
                              <p className="text-earth-light/70 text-xs mt-1 max-w-xl font-light italic">
                                {item.desc}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 bg-cream-dark/50 rounded-lg border border-dashed border-earth/10">
                    <p className="text-earth-light/60 font-serif text-lg">No encontramos platos que coincidan con tu búsqueda.</p>
                    <button
                      onClick={clearSearch}
                      className="mt-4 px-6 py-2.5 bg-terra hover:bg-terra-hover text-cream font-sans text-xs tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Mostrar todo el menú
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
            ) : (
              // Horizontal Book-Like Layout (Full-bleed on the right, left padding on desktop)
              <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start w-full px-6 lg:px-0 lg:pl-[max(1.5rem,calc((100vw-1152px)/2+1.5rem))]">
                
                {/* Left Column: Sticky Sidebar Categories (Desktop only) with subtle scroll cutoff indicators */}
                <aside className="hidden lg:flex flex-col lg:w-[22%] sticky top-28 self-start max-h-[calc(100vh-140px)]">
                  {/* Subtle top indicator line */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-cream/15 to-transparent w-full mb-2 shrink-0" />
                  
                  {/* Scrollable sidebar container */}
                  <div 
                    id="sidebar-container" 
                    className="flex-1 overflow-y-auto pr-2 scrollbar-none"
                  >
                    <div className="flex flex-col gap-1.5 py-1">
                      {menuData.map((cat) => (
                        <button
                          key={cat.id}
                          id={`sidebar-btn-${cat.id}`}
                          onClick={() => handleTabClick(cat.id)}
                          className={`relative flex items-center gap-3 px-4 py-3.5 font-sans font-bold text-xs text-left tracking-wider uppercase transition-all duration-300 rounded-xl cursor-pointer select-none ${
                            activeTab === cat.id
                              ? 'text-cream z-10 font-black'
                              : 'text-cream/70 hover:bg-cream/5 hover:text-cream'
                          }`}
                        >
                          <span className={activeTab === cat.id ? 'text-cream shrink-0' : 'text-terra-light shrink-0'}>
                            {categoryIcons[cat.id]}
                          </span>
                          <span className="truncate">{cat.name}</span>
                          {activeTab === cat.id && (
                            <motion.div
                              layoutId="activeSidebarIndicator"
                              className="absolute inset-0 bg-terra rounded-xl -z-10"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subtle bottom indicator line */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-cream/15 to-transparent w-full mt-2 shrink-0" />
                </aside>

                {/* Right Column: Horizontal Scroll Pages with dynamic height transition */}
                <motion.main 
                  animate={{ 
                    height: typeof activeHeight === 'number' 
                      ? activeHeight + 24 
                      : activeHeight 
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="w-full lg:w-[78%] overflow-hidden relative"
                >
                  
                  {/* Left Navigation Arrow (Desktop only) */}
                  <button 
                    onClick={() => scrollPage(-1)}
                    className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-cream/90 hover:bg-cream border border-earth/10 text-earth p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                    disabled={activeTab === menuData[0].id}
                    aria-label="Página anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {/* Right Navigation Arrow (Desktop only) */}
                  <button 
                    onClick={() => scrollPage(1)}
                    className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-cream/90 hover:bg-cream border border-earth/10 text-earth p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                    disabled={activeTab === menuData[menuData.length - 1].id}
                    aria-label="Siguiente página"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Horizontal Scroll Pages Container */}
                  <div 
                    ref={scrollContainerRef}
                    onScroll={handleContainerScroll}
                    className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory w-full items-start pb-6 scrollbar-none gap-6 px-2 md:px-4 h-full"
                  >
                    {menuData.map((cat) => (
                      <motion.div
                        key={cat.id}
                        id={`category-page-${cat.id}`}
                        animate={{ height: activeTab === cat.id ? 'auto' : activeHeight }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="w-[88vw] lg:w-[700px] xl:w-[840px] shrink-0 snap-center lg:snap-start bg-cream border border-earth/10 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden text-earth transition-[box-shadow] duration-300 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
                      >
                        {/* Subtle Background Watermark Icon */}
                        <div className="absolute right-0 top-0 translate-x-16 -translate-y-16 text-earth/[0.03] pointer-events-none select-none w-80 h-80 rotate-12 flex items-center justify-center">
                          {categoryIcons[cat.id] && (
                            <div className="scale-[9]">
                              {categoryIcons[cat.id]}
                            </div>
                          )}
                        </div>

                        <div className="relative z-10 flex-grow">
                          {/* Page Title */}
                          <div className="border-b border-earth/10 pb-4 mb-8">
                            <h3 className="text-2xl md:text-3xl font-serif font-black text-earth flex items-center gap-3">
                              <span className="text-terra shrink-0">{categoryIcons[cat.id]}</span>
                              {cat.name}
                            </h3>
                          </div>

                          {/* Subsections & Items */}
                          <div className="space-y-10">
                            {cat.sections.map((section, secIdx) => (
                              <div key={secIdx}>
                                {section.name && (
                                  <h4 className="text-base md:text-lg font-serif font-bold text-earth-mid mb-4 border-b border-earth/5 pb-1.5">
                                    {section.name}
                                  </h4>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                  {section.items.map((item, itemIdx) => (
                                    <div
                                      key={itemIdx}
                                      className="group flex flex-col justify-between py-2.5 border-b border-earth/10 hover:border-earth/20 transition-all duration-300 animate-fadeIn"
                                    >
                                      <div>
                                        <div className="flex justify-between items-start gap-4">
                                          <h4 className="font-sans font-bold text-earth text-base group-hover:text-terra transition-colors duration-300">
                                            {item.name}
                                          </h4>
                                          <span className="font-serif font-bold text-terra text-base shrink-0">
                                            {item.price}
                                          </span>
                                        </div>
                                        {item.desc && (
                                          <p className="text-earth-light/70 text-xs mt-1 max-w-xl font-light leading-relaxed">
                                            {item.desc}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Page Footer Inside the Sheet */}
                        <div className="mt-12 pt-4 border-t border-earth/10 flex justify-between items-center text-xs text-earth-light/60 font-serif relative z-10">
                          <span>Menú Entre Mar y Tierra</span>
                          <span className="font-sans font-bold bg-earth/5 px-2.5 py-1 rounded-md text-earth/70">
                            {menuData.indexOf(cat) + 1} / {menuData.length}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </motion.main>

                {/* Horizontal Scroll Helper Indicator (Mobile only) */}
                <div className="flex lg:hidden justify-center items-center gap-2 mt-4 text-xs text-cream/50 font-sans italic">
                  <span>Desliza para hojear</span>
                  <motion.span 
                    animate={{ x: [0, 5, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-terra-light font-bold"
                  >
                    &rarr;
                  </motion.span>
                </div>

              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Disclaimer */}
        <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-cream/10 text-center relative z-10">
          <p className="italic text-cream/45 font-serif text-sm">
            Menú sujeto a cambios de temporada.
          </p>
        </div>

        {/* Floating Categories Button (Mobile only) */}
        {!searchQuery && (
          <div className="lg:hidden">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="fixed bottom-6 right-6 bg-terra hover:bg-terra-hover text-cream p-4 rounded-full shadow-2xl z-40 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Abrir categorías"
            >
              <Menu size={24} />
            </button>

            {/* Mobile Categories Drawer */}
            <AnimatePresence>
              {isDrawerOpen && (
                <>
                  {/* Backdrop Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsDrawerOpen(false)}
                    className="fixed inset-0 bg-bark z-40 cursor-pointer"
                  />

                  {/* Drawer Panel */}
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 bg-cream rounded-t-3xl shadow-2xl z-50 max-h-[75vh] flex flex-col"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-earth/10">
                      <h3 className="font-serif font-black text-earth text-lg">Categorías</h3>
                      <button 
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-earth-light hover:text-earth p-1 cursor-pointer"
                        aria-label="Cerrar categorías"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Scrollable Categories List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-none">
                      {menuData.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            handleTabClick(cat.id);
                            setIsDrawerOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 font-sans font-bold text-xs tracking-wider uppercase text-left transition-all duration-300 rounded-xl cursor-pointer ${
                            activeTab === cat.id
                              ? 'bg-terra text-cream font-black'
                              : 'text-earth hover:bg-earth/5 hover:text-earth-mid'
                          }`}
                        >
                          <span className={activeTab === cat.id ? 'text-cream shrink-0' : 'text-terra shrink-0'}>
                            {categoryIcons[cat.id]}
                          </span>
                          <span className="truncate">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}

    </section>
  );
}
