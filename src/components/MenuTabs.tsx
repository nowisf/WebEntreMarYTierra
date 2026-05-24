import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Fish, Beef, Coffee, Wine, Sparkles, Utensils, Users, ChefHat } from 'lucide-react';
import { menuData, MenuCategory, MenuItem } from '../data/menuData';

// Map categories to beautiful and descriptive icons
const categoryIcons: Record<string, React.ReactNode> = {
  entradas: <Sparkles size={18} />,
  "platos-mar": <Fish size={18} />,
  "platos-tierra": <Beef size={18} />,
  tradicionales: <Utensils size={18} />,
  "compartir-ninos": <Users size={18} />,
  "acompanamientos-ensaladas": <ChefHat size={18} />,
  "postres-cafeteria": <Coffee size={18} />,
  "bebidas-tragos": <Wine size={18} />
};

// Helper to assign colors to badges
const getTagStyles = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'recomendado':
    case 'especialidad':
    case 'destacado':
      return 'bg-terra/10 text-terra border-terra/20';
    case 'local':
    case 'clásico valdiviano':
      return 'bg-sage/10 text-sage border-sage/20';
    case 'típico':
    case 'hecho en casa':
      return 'bg-earth-light/10 text-earth border-earth-light/20';
    case 'para compartir':
      return 'bg-amber-700/10 text-amber-800 border-amber-700/20';
    default:
      return 'bg-earth/5 text-earth/60 border-earth/10';
  }
};

export default function MenuTabs() {
  const [activeTab, setActiveTab] = useState<string>(menuData[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into view in the horizontal bar on mobile
  useEffect(() => {
    const activeBtn = tabRefs.current[activeTab];
    const container = tabsContainerRef.current;
    if (activeBtn && container) {
      const containerScrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const btnLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.clientWidth;

      if (btnLeft < containerScrollLeft || (btnLeft + btnWidth) > (containerScrollLeft + containerWidth)) {
        container.scrollTo({
          left: btnLeft - containerWidth / 2 + btnWidth / 2,
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

  // Active category object
  const currentCategory = useMemo(() => {
    return menuData.find((cat) => cat.id === activeTab) || menuData[0];
  }, [activeTab]);

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

        {/* Tab Navigation (only visible when not searching) */}
        {!searchQuery && (
          <div className="relative border-b border-earth/10 mb-12">
            <div
              ref={tabsContainerRef}
              className="flex gap-2 overflow-x-auto no-scrollbar pb-3 scrollbar-thin scrollbar-thumb-earth/10 scrollbar-track-transparent"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {menuData.map((cat) => (
                <button
                  key={cat.id}
                  ref={(el) => { tabRefs.current[cat.id] = el; }}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center gap-2 px-5 py-3.5 font-sans font-bold text-sm tracking-wide uppercase whitespace-nowrap transition-colors duration-300 rounded-t-lg ${
                    activeTab === cat.id ? 'text-terra' : 'text-earth-light hover:text-earth'
                  }`}
                >
                  {categoryIcons[cat.id]}
                  {cat.name}
                  {activeTab === cat.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-[-3px] left-0 right-0 h-[3px] bg-terra rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menu Content Area */}
        <div className="min-h-[400px]">
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
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-[10px] px-2.5 py-0.5 rounded-full border font-sans font-semibold tracking-wider uppercase ${getTagStyles(tag)}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
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
                {currentCategory.sections.map((section, secIdx) => (
                  <div key={secIdx}>
                    {/* Section Header */}
                    {section.name && (
                      <h3 className="text-2xl md:text-3xl font-serif font-black text-earth-mid mb-8 border-b border-earth/5 pb-2">
                        {section.name}
                      </h3>
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

                          {/* Item Badges */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-[10px] px-2.5 py-0.5 rounded-full border font-sans font-semibold tracking-wider uppercase ${getTagStyles(tag)}`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
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
            Nuestros mariscos provienen de la pesca sustentable de la costa valdiviana. Menú sujeto a cambios de temporada.
          </p>
        </div>
        
      </div>
    </section>
  );
}
