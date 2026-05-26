import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Fish, Beef, Coffee, Wine, Sparkles, Utensils, ChefHat, Flame, ChevronLeft, ChevronRight, Beer, GlassWater, Cake, ChevronDown } from 'lucide-react';
import { menuData, MenuCategory, MenuItem } from '../data/menuData';

// Map 13 categories to beautiful icons
const categoryIcons: Record<string, React.ReactNode> = {
  "aperitivos-de-la-casa": <Wine size={18} />,
  "formato-sour": <GlassWater size={18} />,
  cervezas: <Beer size={18} />,
  "entradas-de-mar": <Fish size={18} />,
  "entradas-de-tierra": <Sparkles size={18} />,
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
  const [showArrows, setShowArrows] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  // Active category object
  const currentCategory = useMemo(() => {
    return menuData.find((cat) => cat.id === activeTab) || menuData[0];
  }, [activeTab]);

  const handleTabClick = (catId: string) => {
    setActiveTab(catId);
    setTimeout(() => {
      const el = document.getElementById('menu-content');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const goToPrev = () => {
    const activeIdx = menuData.findIndex((cat) => cat.id === activeTab);
    const prevIdx = (activeIdx - 1 + menuData.length) % menuData.length;
    handleTabClick(menuData[prevIdx].id);
  };

  const goToNext = () => {
    const activeIdx = menuData.findIndex((cat) => cat.id === activeTab);
    const nextIdx = (activeIdx + 1) % menuData.length;
    handleTabClick(menuData[nextIdx].id);
  };

  // Detect if menu-content is visible to show/hide side arrows
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('menu-content');
      if (el) {
        const rect = el.getBoundingClientRect();
        // Show arrows when the menu content block is visible in the viewport
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        setShowArrows(inViewport);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSearchFocused) return;
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        goToPrev();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isSearchFocused]);

  const clearSearch = () => setSearchQuery('');

  return (
    <section id="menu" className="py-20 md:py-28 bg-cream scroll-mt-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-earth leading-tight">Nuestra Carta</h2>
            <p className="mt-3 text-earth-light font-sans text-base max-w-xl">
              Sabores tradicionales de Valdivia, desde la abundancia del mar de nuestra costa hasta las ricas carnes de la tierra.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-earth-light/50">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Buscar un plato o ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-10 py-3 bg-cream-dark border border-earth/10 focus:border-terra/40 focus:outline-none text-earth font-sans text-sm rounded-md placeholder-earth-light/50 transition-all duration-300 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-earth-light/50 hover:text-earth transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Dropdown Select Tab Navigation */}
        {!searchQuery && (
          <div className="mb-12 relative flex justify-center">
            <div ref={dropdownRef} className="relative w-full max-w-md z-30">
              <label htmlFor="category-select" className="sr-only">Seleccionar Categoría</label>
              <button
                id="category-select"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-cream-dark/60 hover:bg-cream-dark/90 border border-earth/10 focus:border-terra/40 focus:outline-none rounded-xl text-earth font-sans font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-sm cursor-pointer select-none"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-terra">
                    {categoryIcons[activeTab]}
                  </span>
                  <span className="truncate">{currentCategory.name}</span>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="text-earth-light/60 shrink-0"
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 right-0 max-h-[380px] overflow-y-auto bg-cream-dark/98 backdrop-blur-md border border-earth/15 rounded-xl shadow-xl z-50 scrollbar-none snap-y"
                  >
                    <div className="py-2 px-2 flex flex-col gap-1">
                      {menuData.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            handleTabClick(cat.id);
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 font-sans font-bold text-xs tracking-wider uppercase text-left transition-all duration-300 rounded-lg cursor-pointer select-none snap-start ${
                            activeTab === cat.id
                              ? 'bg-terra text-cream'
                              : 'text-earth hover:bg-earth/5'
                          }`}
                        >
                          <span className={activeTab === cat.id ? 'text-cream' : 'text-terra shrink-0'}>
                            {categoryIcons[cat.id]}
                          </span>
                          <span className="truncate">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Menu Content Area */}
        <div id="menu-content" className="min-h-[400px] scroll-mt-28">
          <AnimatePresence mode="wait">
            {searchQuery ? (
              // Search Results View
              <motion.div
                key="search-results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-earth/10">
                  <h3 className="text-2xl font-serif font-bold text-earth">
                    Resultados para "{searchQuery}"
                  </h3>
                  <button 
                    onClick={clearSearch}
                    className="text-terra hover:underline font-sans text-sm font-semibold flex items-center gap-1"
                  >
                    Ver toda la carta
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    {searchResults.map(({ categoryName, sectionName, item }, idx) => (
                      <motion.div
                        key={`${item.name}-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.02 }}
                        className="group flex flex-col justify-between py-5 border-b border-earth/10 hover:border-earth/20 transition-all duration-300"
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
                            <h4 className="font-sans font-bold text-earth text-lg group-hover:text-terra transition-colors duration-300">
                              {item.name}
                            </h4>
                            <span className="font-serif font-bold text-terra text-lg shrink-0">
                              {item.price}
                            </span>
                          </div>
                          {item.desc && (
                            <p className="text-earth-light/70 text-sm mt-1 max-w-xl font-light italic">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-cream-dark/50 rounded-lg border border-dashed border-earth/10">
                    <p className="text-earth-light/60 font-serif text-lg">No encontramos platos que coincidan con tu búsqueda.</p>
                    <button
                      onClick={clearSearch}
                      className="mt-4 px-6 py-2.5 bg-terra hover:bg-terra-hover text-cream font-sans text-xs tracking-wider uppercase transition-colors"
                    >
                      Mostrar todo el menú
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              // Category tabbed view
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12 md:space-y-16"
              >
                <div className="relative pb-4 mb-4">
                  {/* Main Category Header */}
                  <h3 className="text-3xl md:text-4xl font-serif font-black text-earth">
                    {currentCategory.name}
                  </h3>
                  {/* Subtle background border track */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-earth/10" />
                  {/* Animated Underline */}
                  <motion.div
                    key={`${activeTab}-underline`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, ease: [0.1, 0.9, 0.2, 1], delay: 0.05 }}
                    className="absolute bottom-0 left-0 h-[3px] bg-terra"
                  />
                </div>

                {currentCategory.sections.map((section, secIdx) => (
                  <div key={secIdx}>
                    {/* Section Header (Sub-sección) */}
                    {section.name && (
                      <h4 className="text-xl md:text-2xl font-serif font-bold text-earth-mid mb-8 border-b border-earth/5 pb-2">
                        {section.name}
                      </h4>
                    )}

                    {/* Section Items Grid */}
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
                      {section.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="group flex flex-col justify-between py-5 border-b border-earth/10 hover:border-earth/20 transition-all duration-300"
                        >
                          <div>
                            <div className="flex justify-between items-start gap-4">
                              <h4 className="font-sans font-bold text-earth text-lg group-hover:text-terra transition-colors duration-300">
                                {item.name}
                              </h4>
                              <span className="font-serif font-bold text-terra text-lg shrink-0">
                                {item.price}
                              </span>
                            </div>
                            {item.desc && (
                              <p className="text-earth-light/70 text-sm mt-1 max-w-xl font-light leading-relaxed">
                                {item.desc}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-16 pt-8 border-t border-earth/10 text-center">
          <p className="italic text-earth-light/60 font-serif text-sm">
            Menú sujeto a cambios de temporada.
          </p>
        </div>
        
        {/* Floating Side Arrows */}
        <AnimatePresence>
          {showArrows && !searchQuery && (
            <>
              {/* Left Arrow Button */}
              <motion.button
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 0.8, x: 0 }}
                whileHover={{ opacity: 1, scale: 1.1, backgroundColor: "var(--color-terra)", color: "var(--color-cream)" }}
                exit={{ opacity: 0, x: -15 }}
                onClick={goToPrev}
                className="fixed left-1.5 md:left-6 top-1/2 -translate-y-1/2 z-40 bg-cream/90 backdrop-blur-sm border border-earth/15 text-earth p-2.5 md:p-3.5 rounded-full shadow-lg transition-all duration-300 select-none cursor-pointer"
                aria-label="Categoría anterior"
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Right Arrow Button */}
              <motion.button
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 0.8, x: 0 }}
                whileHover={{ opacity: 1, scale: 1.1, backgroundColor: "var(--color-terra)", color: "var(--color-cream)" }}
                exit={{ opacity: 0, x: 15 }}
                onClick={goToNext}
                className="fixed right-1.5 md:right-6 top-1/2 -translate-y-1/2 z-40 bg-cream/90 backdrop-blur-sm border border-earth/15 text-earth p-2.5 md:p-3.5 rounded-full shadow-lg transition-all duration-300 select-none cursor-pointer"
                aria-label="Siguiente categoría"
              >
                <ChevronRight size={20} />
              </motion.button>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
