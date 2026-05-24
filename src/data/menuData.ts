export interface MenuItem {
  name: string;
  price: string;
  desc?: string;
  tags?: string[];
}

export interface MenuSection {
  name?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  name: string;
  sections: MenuSection[];
}

export const menuData: MenuCategory[] = [
  {
    id: "entradas",
    name: "Entradas",
    sections: [
      {
        name: "Entradas del Mar",
        items: [
          { name: "Ceviche de Merluza", price: "$15.500" },
          { name: "Ceviche Mar y Tierra", price: "$18.500", desc: "Pescado, camarón, champiñón, ostión.", tags: ["Recomendado"] },
          { name: "Ceviche Especial", price: "$18.500", desc: "Pescado, camarón, palta, ostión." },
          { name: "Ceviche de Salmón", price: "$16.800" },
          { name: "Ceviche de Atún", price: "$18.500" },
          { name: "Ceviche Pulpo-Camarón", price: "$18.500" },
          { name: "Jaiva Salsa al Gusto", price: "$17.500" },
          { name: "Centolla Salsa al Gusto", price: "$18.500" },
          { name: "Locos Salsa al Gusto", price: "$18.500", tags: ["Destacado"] },
          { name: "Erizos en Salsa Verde", price: "$15.500" },
          { name: "Piures en Salsa Verde", price: "$14.900" },
          { name: "Ostras a la Parmesana", price: "$14.900" },
          { name: "Ostiones a la Parmesana", price: "$21.200" },
          { name: "Machas a la Parmesana", price: "$16.500" },
          { name: "Machas a la Parmesana Especial", price: "$17.500" },
          { name: "Calamar a la Romana", price: "$15.000", desc: "Anillos de calamar crujientes al estilo romano." },
          { name: "Locos al Pil Pil o al Ajillo", price: "$18.900" },
          { name: "Surtido de Mariscos al Pil Pil o al Ajillo", price: "$18.500" },
          { name: "Camarones al Pil Pil o al Ajillo", price: "$17.500" },
          { name: "Pulpo al Pil Pil o al Ajillo", price: "$15.900" },
          { name: "Pulles al Pil Pil o al Ajillo", price: "$24.500" },
          { name: "Brochetas de Camarones", price: "$15.800" },
          { name: "Carpaccio de Salmón", price: "$16.500" },
          { name: "Palta Cardenal", price: "$13.800", desc: "Palta rellena con camarones seleccionados." }
        ]
      },
      {
        name: "Entradas de Tierra",
        items: [
          { name: "Palta Reina", price: "$13.800", desc: "Palta rellena con pasta de ave." },
          { name: "Carpaccio de Filete", price: "$16.000" },
          { name: "Arrollado de Huaso al Plato", price: "$4.500", desc: "2 porciones acompañadas con pebre artesanal.", tags: ["Típico"] },
          { name: "Consomés de Ave o Vacuno", price: "$3.500" },
          { name: "Fumet", price: "$4.500", desc: "Caldo concentrado de pescado con verduras frescas." },
          { name: "Empanadas Fritas (Docena)", price: "$9.000", desc: "A elección: Mariscos, Carne, Queso, Queso-camarón, Queso-jaiva." },
          { name: "Empanadas Fritas de Locos (Docena)", price: "$16.000" },
          { name: "Empanada de Prieta Queso (Unidad)", price: "$3.800" },
          { name: "Empanada de Pulpo Navajuela (Unidad)", price: "$4.500" },
          { name: "Mollejas a la Parrilla", price: "$12.500" }
        ]
      }
    ]
  },
  {
    id: "platos-mar",
    name: "Del Mar",
    sections: [
      {
        name: "Platos Fríos",
        items: [
          { name: "Primavera de Mariscos", price: "$25.500", desc: "Surtido de mariscos cocidos servidos fríos." },
          { name: "Mariscal Frío", price: "$17.000" },
          { name: "Pinzas de Jaiba en Salsa Verde", price: "$16.800" }
        ]
      },
      {
        name: "Platos Calientes",
        items: [
          { name: "Embrujo Mar y Tierra", price: "$23.500", tags: ["Especialidad"] },
          { name: "Pulpo a la Parrilla", price: "$18.500", desc: "Servido con papas doradas rústicas." },
          { name: "Locos con Camarones al Pil Pil o Ajillo", price: "$21.500" },
          { name: "Picorocos al Vapor", price: "$14.900" },
          { name: "Paila Marina", price: "$14.500", desc: "Surtido de mariscos en caldo caliente.", tags: ["Clásico Valdiviano"] },
          { name: "Trilogía de Camarones", price: "$22.500" }
        ]
      },
      {
        name: "Pescados a la Plancha",
        items: [
          { name: "Salmón Papellón a la Parrilla", price: "$19.500", desc: "Con tomate y queso fundido." },
          { name: "Lenguado a la Plancha", price: "$19.500" },
          { name: "Albacora a la Plancha", price: "$16.900" },
          { name: "Atún a la Plancha", price: "$17.500" },
          { name: "Congrio a la Plancha", price: "$16.000" },
          { name: "Corvina a la Plancha", price: "$16.000" },
          { name: "Salmón a la Plancha", price: "$17.500" },
          { name: "Reineta a la Plancha", price: "$15.000" },
          { name: "Merluza a la Plancha", price: "$15.000" },
          { name: "Trucha a la Plancha / Parrilla", price: "$15.000" }
        ]
      },
      {
        name: "Pescados Fritos",
        items: [
          { name: "Congrio Frito", price: "$16.500", tags: ["Favorito"] },
          { name: "Corvina Frita", price: "$16.500" },
          { name: "Reineta Frita", price: "$15.000" },
          { name: "Merluza Frita", price: "$16.000" }
        ]
      },
      {
        name: "Caldos y Chupes",
        items: [
          { name: "Caldillo de Congrio", price: "$16.500" },
          { name: "Caldillo de Congrio Nerudiano", price: "$18.500", desc: "Caldo de congrio enriquecido con camarones.", tags: ["Recomendado"] },
          { name: "Chupe de Jaiba", price: "$16.000" },
          { name: "Chupe de Jaiba con Camarones", price: "$18.000" },
          { name: "Chupe de Centolla", price: "$18.900" },
          { name: "Chupe de Locos", price: "$18.900" },
          { name: "Chupe de Guatitas", price: "$10.500" },
          { name: "Chupe de Cochayuyo", price: "$10.500" }
        ]
      }
    ]
  },
  {
    id: "platos-tierra",
    name: "De la Tierra",
    sections: [
      {
        name: "Platos de Caza",
        items: [
          { name: "Codornices", price: "$18.900", desc: "Porción de 2 unidades.", tags: ["Exótico"] },
          { name: "Liebre o Conejo", price: "$18.900", desc: "Porción al estilo de la casa." },
          { name: "Jabalí", price: "$22.900", desc: "Carne silvestre con carácter." },
          { name: "Pato al Coñac o a la Naranja", price: "$23.500" }
        ]
      },
      {
        name: "Carnes a la Parrilla / Plancha",
        items: [
          { name: "Bife Chorizo", price: "$25.500" },
          { name: "Entrecot", price: "$21.500" },
          { name: "Lomo Vetado", price: "$18.900" },
          { name: "Lomo Liso", price: "$18.900" },
          { name: "Entraña", price: "$18.800" },
          { name: "Asado de Tira", price: "$17.800" },
          { name: "Asado de Cordero", price: "$18.900" },
          { name: "Chuleta de Cerdo con Salsa a la Pimienta", price: "$13.500" },
          { name: "Chuleta de Cerdo", price: "$12.900" },
          { name: "Pollo a la Parrilla / Plancha", price: "$12.500" },
          { name: "Matambre (Malaya)", price: "$15.800" }
        ]
      },
      {
        name: "Carnes a la Olla / Horno",
        items: [
          { name: "Plateada", price: "$16.000" },
          { name: "Asado de Estomaguillo", price: "$18.900" },
          { name: "Carne Mechada", price: "$15.500" }
        ]
      }
    ]
  },
  {
    id: "tradicionales",
    name: "Cazuelas & Tradicionales",
    sections: [
      {
        name: "Cazuelas, Caldos y Ajiacos",
        items: [
          { name: "Ajiaco con Sopaipillas", price: "$13.000", desc: "Tradicional caldo de carne con papas e ingredientes de la zona." },
          { name: "Valdiviano con Sopaipillas", price: "$15.800", desc: "El histórico caldo valdiviano con charqui.", tags: ["Clásico Valdiviano"] },
          { name: "Cazuela de Vacuno", price: "$8.000" },
          { name: "Cazuela de Ave", price: "$8.000" },
          { name: "Cazuela de Cordero", price: "$9.000" }
        ]
      },
      {
        name: "Recetas Tradicionales al Horno y Paila",
        items: [
          { name: "Crudo de la Casa", price: "$12.500", desc: "Carne cruda aliñada con limón, cebolla y aderezos tradicionales." },
          { name: "Pernil de Cerdo al Horno", price: "$16.500", desc: "Servido con papas cocidas y pebre artesanal." },
          { name: "Lengua de Vacuno", price: "$15.500", desc: "A la plancha con salsa de champiñones o salsa verde." },
          { name: "Guatitas a la Chilena o a la Primavera", price: "$12.500" },
          { name: "Pastel de Choclo Pequeño", price: "$5.000", desc: "Paila de greda de tamaño entrada." },
          { name: "Pastel de Choclo", price: "$12.500", desc: "Paila de greda grande, con pino tradicional y pollo.", tags: ["Típico"] },
          { name: "Chancho Borracho", price: "$15.000", desc: "Cerdo cocinado lentamente en vino blanco y condimentos." },
          { name: "Chunchules a la Parrilla", price: "$15.000", desc: "Acompañados con papas cocidas." },
          { name: "Fetuccini o Raviolis", price: "$14.800", desc: "Con salsa Alfredo y/o Bolognesa." }
        ]
      }
    ]
  },
  {
    id: "compartir-ninos",
    name: "Compartir & Niños",
    sections: [
      {
        name: "Tablas y Parrilladas para Compartir",
        items: [
          { name: "Brasero Entre Mar y Tierra", price: "$61.000", desc: "Exquisita selección de carnes con porciones de pescados y mariscos salteados.", tags: ["Para Compartir", "Destacado"] },
          { name: "Brasero para 2 Personas", price: "$49.000", desc: "Vacuno, pollo, cerdo, chunchules, interiores, ensalada y sopaipillas.", tags: ["Para Compartir"] },
          { name: "Parrillada para 2 Personas", price: "$45.900", desc: "Vacuno, pollo, cerdo, longaniza, ensalada y sopaipillas.", tags: ["Para Compartir"] },
          { name: "Tabla Mar y Tierra", price: "$25.500", desc: "Mix caliente con bocados de mar y carnes." },
          { name: "Tabla Pico-Pato", price: "$19.500", desc: "Matambre, queso, aceitunas, sopaipillas y más acompañamientos." }
        ]
      },
      {
        name: "Platos para Niños",
        items: [
          { name: "Bistec a la Plancha con Arroz / Puré", price: "$12.800" },
          { name: "Salchipapas (Formato Pulpito)", price: "$8.000", desc: "Papas fritas con salchichas cortadas de forma divertida." },
          { name: "Nuggets con Papas Fritas", price: "$10.000", desc: "4 unidades de nuggets de pollo con papas crujientes." }
        ]
      }
    ]
  },
  {
    id: "acompanamientos-ensaladas",
    name: "Guarnición & Ensaladas",
    sections: [
      {
        name: "Guarnición del Plato",
        items: [
          { name: "A lo Pobre", price: "$5.500", desc: "Papas fritas, huevo frito y cebolla frita caramelizada." },
          { name: "Papas Pre Fritas", price: "$3.000" },
          { name: "Papas Fritas Naturales", price: "$5.000", tags: ["Hecho en Casa"] },
          { name: "Papas Duquesas", price: "$3.000" },
          { name: "Papas al Romero, Ciboulette o Perejil", price: "$3.500" },
          { name: "Papas Rústicas", price: "$3.500" },
          { name: "Papas Bravas", price: "$5.800" },
          { name: "Papas Hilo", price: "$5.900" },
          { name: "Papas Gratinadas", price: "$5.800" },
          { name: "Papas Mayo", price: "$4.500" },
          { name: "Puré de Castañas", price: "$5.500", desc: "Mezcla tradicional de puré de papas y castañas." },
          { name: "Puré Picante", price: "$3.800" },
          { name: "Puré de Palta", price: "$4.000" },
          { name: "Risotto de Camarones", price: "$4.900" },
          { name: "Risotto de Champiñones", price: "$4.500" },
          { name: "Risotto Marino", price: "$4.500" },
          { name: "Arroz Primavera", price: "$3.500" },
          { name: "Arroz a la Mexicana", price: "$3.500" }
        ]
      },
      {
        name: "Salsas y Salteados Extras",
        items: [
          { name: "Salsa Gran Duque", price: "$9.500" },
          { name: "Salsa Margarita", price: "$5.800" },
          { name: "Salsa de Locos", price: "$5.800" },
          { name: "Salsa de Centolla", price: "$6.000" },
          { name: "Salsa de Jaiba", price: "$6.000" },
          { name: "Salsa Cardenal", price: "$5.500", desc: "Crema suave con camarones." },
          { name: "Salsa de Piñones", price: "$5.500" },
          { name: "Salsa de Champiñones", price: "$3.500" },
          { name: "Salsa de Murta", price: "$4.500" },
          { name: "Verduras Salteadas", price: "$4.500" },
          { name: "Salteado Mar y Tierra", price: "$5.500" },
          { name: "Salteado Real", price: "$5.500" },
          { name: "Mantequilla Rubia o Negra al Plato", price: "$2.000" },
          { name: "Mantequilla con Alcaparras y Camarones", price: "$5.500" }
        ]
      },
      {
        name: "Ensaladas Frescas",
        items: [
          { name: "Ensalada Surtida", price: "$4.200" },
          { name: "Ensalada Mar y Tierra", price: "$8.900", desc: "Lechuga, tomate, palmitos, camarones, ostiones y aceitunas.", tags: ["Recomendado"] },
          { name: "Apio Palta", price: "$4.800" },
          { name: "Apio, Lechuga, Palta y Nueces", price: "$5.500" },
          { name: "Ensalada Rusa", price: "$4.900" },
          { name: "Ensalada Griega", price: "$6.500" },
          { name: "Lechuga Apio Palta", price: "$4.800" },
          { name: "Palta, Palmito, Espárrago", price: "$4.900" },
          { name: "Tomate Palta", price: "$4.200" },
          { name: "Lechuga y Cebolla Morada", price: "$4.000" },
          { name: "Ensalada Chilena", price: "$4.000", desc: "Tomate con cebolla en pluma y cilantro fresco." },
          { name: "Ensalada César con Pollo", price: "$5.000" },
          { name: "Ensalada César con Camarón", price: "$6.000" }
        ]
      }
    ]
  },
  {
    id: "postres-cafeteria",
    name: "Postres & Café",
    sections: [
      {
        name: "Postres de la Casa",
        items: [
          { name: "Murta con Membrillo", price: "$5.500", desc: "Típico dulce sureño de murtilla silvestre y membrillo.", tags: ["Típico"] },
          { name: "Puré de Castañas", price: "$6.500", desc: "Dulce de castañas de la zona." },
          { name: "Castañas Mar y Tierra", price: "$9.900", tags: ["Especialidad"] },
          { name: "Picarones Pasados", price: "$3.800", desc: "Masitas fritas de zapallo bañadas en salsa de chancaca." },
          { name: "Mote con Huesillo", price: "$3.800", desc: "Refrescante postre nacional chileno." },
          { name: "Celestino", price: "$3.000", desc: "Panqueque artesanal relleno con manjar y espolvoreado con azúcar flor." },
          { name: "Alaska", price: "$3.900", desc: "Panqueque con manjar, helado y azúcar flor." },
          { name: "Sinfonía de Papayas", price: "$7.900" },
          { name: "Copa de Helado", price: "$6.900" },
          { name: "Ensalada de Frutas", price: "$6.500" },
          { name: "Café Helado", price: "$5.000" },
          { name: "Tiramisú", price: "$4.500" },
          { name: "Torta del Día", price: "$4.500", desc: "Consulte a su garzón por la variedad de hoy." }
        ]
      },
      {
        name: "Bebidas Calientes",
        items: [
          { name: "Té Normal", price: "$1.500" },
          { name: "Té de Sabor / Infusiones", price: "$1.800" },
          { name: "Café Taza o Tazón", price: "$2.700" },
          { name: "Café Express Simple", price: "$2.600" },
          { name: "Café Express Doble", price: "$4.500" },
          { name: "Café Americano", price: "$3.000" },
          { name: "Café Irlandés", price: "$5.500", desc: "Café express con whisky, azúcar y crema batida." },
          { name: "Café con Leche", price: "$3.000" }
        ]
      }
    ]
  },
  {
    id: "bebidas-tragos",
    name: "Licores & Bebidas",
    sections: [
      {
        name: "Aperitivos de la Casa",
        items: [
          { name: "Ponche de Mariscos", price: "$9.900", desc: "Exótico ponche de erizos, picorocos, camarones y ostras.", tags: ["Especialidad"] },
          { name: "Vaso de Borgoña", price: "$4.500", desc: "Vino tinto macerado con frutillas." },
          { name: "Borgoña (Jarra)", price: "$9.500", desc: "Jarra ideal para compartir.", tags: ["Para Compartir"] },
          { name: "Terremoto", price: "$3.800", desc: "Pipeño, helado de piña y un toque de granadina o fernet." },
          { name: "Malta con Huevo", price: "$4.500", desc: "Bebida tradicional de malta batida con huevo y azúcar." },
          { name: "Chupilca", price: "$3.800", desc: "Chicha de manzana o vino tinto con harina tostada." },
          { name: "Vaso de Clery", price: "$3.800", desc: "Vino blanco macerado con frutillas." },
          { name: "Clery (Jarra)", price: "$8.900", tags: ["Para Compartir"] },
          { name: "Pichunchos", price: "$5.500", desc: "Tradicional mezcla de pisco y vermouth rosso." }
        ]
      },
      {
        name: "Sour Formatos",
        items: [
          { name: "Pisco Sour de la Casa", price: "$8.000", tags: ["Favorito"] },
          { name: "Pisco Sour Peruano", price: "$8.000" },
          { name: "Pisco Sour Frutal", price: "$8.000" },
          { name: "Whisky Sour", price: "$8.900" },
          { name: "Murta Sour / Maqui Sour", price: "$8.000", desc: "Sours preparados con frutos nativos del sur.", tags: ["Típico"] },
          { name: "Vodka Sour", price: "$8.000" },
          { name: "Gin Sour", price: "$5.900" },
          { name: "Vaina", price: "$8.000", desc: "Oporto, crema de cacao, huevo y canela." }
        ]
      },
      {
        name: "Cervezas & Schops",
        items: [
          { name: "Schop Los Torreones 500cc", price: "$4.000", desc: "Variedades: Lager, Ámbar o Bock. Producción local.", tags: ["Local"] },
          { name: "Schop Bravo", price: "$5.500" },
          { name: "Schop Los Torreones (Perla Negra)", price: "$5.700", tags: ["Local"] },
          { name: "Michelada Inglesa", price: "$4.400" },
          { name: "Michelada Artesanal Ámbar o Lager", price: "$4.400" },
          { name: "Chelada Artesanal Ámbar o Lager", price: "$4.200" },
          { name: "Pitcher Los Torreones", price: "$11.500", tags: ["Para Compartir"] },
          { name: "Cerveza Corona", price: "$4.500" },
          { name: "Cerveza Heineken", price: "$4.500" },
          { name: "Kunstmann Gran Torobayo", price: "$6.400", desc: "Cerveza valdiviana premium emblemática.", tags: ["Local"] },
          { name: "Kunstmann Torobayo", price: "$4.500", tags: ["Local"] },
          { name: "Cerveza Sin Alcohol", price: "$4.500" }
        ]
      },
      {
        name: "Tragos Preparados y Coctelería",
        items: [
          { name: "Mojito Cubano", price: "$6.500" },
          { name: "Mojito Frutal", price: "$6.800" },
          { name: "Mojito Jägermeister", price: "$7.800" },
          { name: "Ron Cola (Pampero)", price: "$6.800" },
          { name: "Ron Cola (Habana Club)", price: "$6.800" },
          { name: "Ron Barceló", price: "$5.500" },
          { name: "Piscola Horcón Quemado", price: "$6.500", desc: "Pisco premium chileno con bebida cola." },
          { name: "Piscola Mistral 35°", price: "$6.500" },
          { name: "Piscola Mistral 40°", price: "$7.500" },
          { name: "Piscola Alto del Carmen 40°", price: "$7.500" },
          { name: "Pisco Mistral Manzana Tónica", price: "$7.500" },
          { name: "Whiscola Johnnie Walker Rojo", price: "$8.000" },
          { name: "Whiscola Johnnie Walker Negro", price: "$9.500" },
          { name: "Whiscola Ballantine's", price: "$8.000" },
          { name: "Whiscola Jack Daniel's", price: "$10.500" },
          { name: "Caipiriña", price: "$5.500" },
          { name: "Caipirosca", price: "$6.500" },
          { name: "Clavo Oxidado", price: "$9.500", desc: "Drambuie y whisky escocés." },
          { name: "Sexo en las Rocas", price: "$6.500" },
          { name: "Tequila Margarita o Blue", price: "$6.500" },
          { name: "Tom Collins", price: "$6.500" },
          { name: "Ramazzotti Rosato", price: "$6.500" },
          { name: "Aperol Spritz", price: "$6.500" },
          { name: "Bitter a la Francesa", price: "$5.000" },
          { name: "Bitter Araucano", price: "$5.000" },
          { name: "Bitter Batido", price: "$5.000" },
          { name: "Fernet con Coca-Cola", price: "$5.000" }
        ]
      },
      {
        name: "Destilados & Licores a las Rocas",
        items: [
          { name: "Johnnie Walker Negro a las Rocas", price: "$7.000" },
          { name: "Whisky Jack Daniel's a las Rocas", price: "$7.500" },
          { name: "Chivas Regal 12 Años a las Rocas", price: "$12.000" },
          { name: "Jägermeister a las Rocas", price: "$7.500" },
          { name: "Vodka Stolichnaya a las Rocas", price: "$5.900" },
          { name: "Vodka Smirnoff a las Rocas", price: "$5.900" },
          { name: "Gin Beefeater a las Rocas", price: "$5.900" },
          { name: "Gin Tanqueray a las Rocas", price: "$6.500" },
          { name: "Drambuie a las Rocas", price: "$6.000" },
          { name: "Martini Dry Seco", price: "$5.000" },
          { name: "Martini Seco", price: "$5.000" },
          { name: "RedBull Jäger", price: "$9.000" }
        ]
      },
      {
        name: "Otros Bebestibles",
        items: [
          { name: "Bebidas Gaseosas", price: "$3.500" },
          { name: "Jugos Naturales", price: "$3.500", desc: "Variedades de temporada." },
          { name: "Jarra de Jugo Natural", price: "$12.500" },
          { name: "Limonada Natural", price: "$3.500" },
          { name: "Aguas Minerales", price: "$3.500", desc: "Con o sin gas." }
        ]
      }
    ]
  }
];
