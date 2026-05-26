import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Fish, Beef, Coffee, Wine, Sparkles, Utensils, ChefHat, Flame, Beer, GlassWater, Cake, Menu } from 'lucide-react';
import { menuData, MenuItem } from '../data/menuData';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Intersection Observer for Scrollspy (desktop & mobile)
  useEffect(() => {
    if (searchQuery) return; // Disable scrollspy during search

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -75% 0px', // Trigger when the top of the category section enters the upper-middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id.replace('category-section-', ''));
        }
      });
    }, observerOptions);

    menuData.forEach((cat) => {
      const el = document.getElementById(`category-section-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [searchQuery]);

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
    const el = document.getElementById(`category-section-${catId}`);
    if (el) {
      // Offset scroll so it doesn't get covered by sticky navbar
      const yOffset = -90; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const clearSearch = () => setSearchQuery('');

  return (
    <section id="menu" className="py-20 md:py-28 bg-cream scroll-mt-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
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
              className="w-full pl-10 pr-10 py-3 bg-cream-dark/50 border border-earth/10 focus:border-terra/40 focus:outline-none text-earth font-sans text-sm rounded-xl placeholder-earth-light/50 transition-all duration-300 shadow-sm"
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

        {/* Menu Content Area */}
        <div id="menu-content" className="min-h-[400px]">
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
              // Two-Column Layout (Desktop sticky sidebar + continuous list of categories)
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                
                {/* Left Column: Sticky Sidebar Categories (Desktop only) */}
                <aside id="sidebar-container" className="hidden lg:block w-1/4 sticky top-28 self-start max-h-[calc(100vh-140px)] overflow-y-auto pr-4 scrollbar-none relative">
                  <div className="flex flex-col gap-1.5 py-2">
                    {menuData.map((cat) => (
                      <button
                        key={cat.id}
                        id={`sidebar-btn-${cat.id}`}
                        onClick={() => handleTabClick(cat.id)}
                        className={`relative flex items-center gap-3 px-4 py-3 font-sans font-bold text-xs text-left tracking-wider uppercase transition-all duration-300 rounded-xl cursor-pointer select-none ${
                          activeTab === cat.id
                            ? 'text-cream z-10 font-black'
                            : 'text-earth hover:bg-earth/5 hover:text-earth-mid'
                        }`}
                      >
                        <span className={activeTab === cat.id ? 'text-cream shrink-0' : 'text-terra shrink-0'}>
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
                </aside>

                {/* Right Column: Continuous categories listing */}
                <main className="w-full lg:w-3/4 space-y-20">
                  {menuData.map((cat) => (
                    <section 
                      key={cat.id} 
                      id={`category-section-${cat.id}`}
                      className="scroll-mt-28"
                    >
                      <div className="relative pb-4 mb-8">
                        <h3 className="text-2xl md:text-3xl font-serif font-black text-earth flex items-center gap-3">
                          <span className="text-terra shrink-0">{categoryIcons[cat.id]}</span>
                          {cat.name}
                        </h3>
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-earth/10" />
                        <div className="absolute bottom-0 left-0 w-20 h-[3px] bg-terra" />
                      </div>

                      <div className="space-y-12">
                        {cat.sections.map((section, secIdx) => (
                          <div key={secIdx}>
                            {/* Section Header (Sub-sección) */}
                            {section.name && (
                              <h4 className="text-lg md:text-xl font-serif font-bold text-earth-mid mb-6 border-b border-earth/5 pb-2">
                                {section.name}
                              </h4>
                            )}

                            {/* Section Items Grid */}
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
                              {section.items.map((item, itemIdx) => (
                                <div
                                  key={itemIdx}
                                  className="group flex flex-col justify-between py-4 border-b border-earth/10 hover:border-earth/20 transition-all duration-300"
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
                      </div>
                    </section>
                  ))}
                </main>

              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-20 pt-8 border-t border-earth/10 text-center">
          <p className="italic text-earth-light/60 font-serif text-sm">
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

      </div>
    </section>
  );
}
