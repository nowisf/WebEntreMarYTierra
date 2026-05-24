export interface MenuItem {
  name: string;
  price: string;
  desc?: string;
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
    id: "aperitivos",
    name: "Aperitivos",
    sections: [
      {
        items: [
          { name: "Ponche de Mariscos", price: "$9.900", desc: "Con erizos, picorocos, camarones y ostras." },
          { name: "Vaso Borgoña", price: "$4.500" },
          { name: "Borgoña (Jarra)", price: "$9.500" },
          { name: "Terremoto", price: "$3.800" },
          { name: "Malta con Huevo", price: "$4.500" },
          { name: "Chupilca", price: "$3.800" },
          { name: "Vaso de Cleary", price: "$3.800" },
          { name: "Cleary (Jarra)", price: "$8.900" },
          { name: "Pichunchos", price: "$5.500" }
        ]
      }
    ]
  },
  {
    id: "bebestibles-otros",
    name: "Otros Bebestibles",
    sections: [
      {
        items: [
          { name: "Bebidas", price: "$3.500" },
          { name: "Jugos Naturales", price: "$3.500" },
          { name: "Jarra de Jugo", price: "$12.500" },
          { name: "Limonada", price: "$3.500" },
          { name: "Aguas Minerales (con y sin gas)", price: "$3.500" }
        ]
      }
    ]
  },
  {
    id: "sours",
    name: "Formato Sour",
    sections: [
      {
        items: [
          { name: "Pisco Sour de la Casa", price: "$8.000" },
          { name: "Pisco Sour Peruano", price: "$8.000" },
          { name: "Pisco Sour Frutal", price: "$8.000" },
          { name: "Whisky Sour", price: "$8.900" },
          { name: "Murta Sour o Maqui Sour", price: "$8.000" },
          { name: "Vodka Sour", price: "$8.000" },
          { name: "Gin Sour", price: "$5.900" },
          { name: "Vaina", price: "$8.000" }
        ]
      }
    ]
  },
  {
    id: "cervezas",
    name: "Cervezas",
    sections: [
      {
        items: [
          { name: "Schop Los Torreones 500 cc", price: "$4.000", desc: "Lager, ámbar, bock." },
          { name: "Schop Bravo", price: "$5.500" },
          { name: "Schop Los Torreones (Perla Negra)", price: "$5.700" },
          { name: "Michelada Inglesa", price: "$4.400" },
          { name: "Michelada Artesanal Ámbar o Lager", price: "$4.400" },
          { name: "Chelada Artesanal Ámbar o Lager", price: "$4.200" },
          { name: "Pitcher Los Torreones", price: "$11.500" },
          { name: "Corona", price: "$4.500" },
          { name: "Heineken", price: "$4.500" },
          { name: "Kunstmann Gran Torobayo", price: "$6.400" },
          { name: "Kunstmann Torobayo", price: "$4.500" },
          { name: "Cerveza sin Alcohol", price: "$4.500" }
        ]
      }
    ]
  },
  {
    id: "entradas-mar",
    name: "Entradas de Mar",
    sections: [
      {
        items: [
          { name: "Ceviche de Merluza", price: "$15.500" },
          { name: "Ceviche Mar y Tierra", price: "$18.500", desc: "Pescado, camarón, champiñón, ostión." },
          { name: "Ceviche Especial", price: "$18.500", desc: "Pescado, camarón, palta, ostión." },
          { name: "Ceviche de Salmón", price: "$16.800" },
          { name: "Ceviche de Atún", price: "$18.500" },
          { name: "Ceviche Pulpo-Camarón", price: "$18.500" },
          { name: "Jaiva Salsa Gusto", price: "$17.500" },
          { name: "Centolla Salsa al Gusto", price: "$18.500" },
          { name: "Locos Salsa al Gusto", price: "$18.500" },
          { name: "Erizos en Salsa Verde", price: "$15.500" },
          { name: "Piures en Salsa Verde", price: "$14.900" },
          { name: "Ostras a la Parmesana", price: "$14.900" },
          { name: "Ostiones a la Parmesana", price: "$21.200" },
          { name: "Machas a la Parmesana", price: "$16.500" },
          { name: "Machas a la Parmesana Especial", price: "$17.500" },
          { name: "Calamar a la Romana", price: "$15.000" },
          { name: "Locos al Pil Pil o al Ajillo", price: "$18.900" },
          { name: "Surtido de Mariscos al Pil Pil o al Ajillo", price: "$18.500" },
          { name: "Camarones al Pil Pil o al Ajillo", price: "$17.500" },
          { name: "Pulpo al Pil Pil o al Ajillo", price: "$15.900" },
          { name: "Pulles al Pil Pil o al Ajillo", price: "$24.500" },
          { name: "Brochetas de Camarones", price: "$15.800" },
          { name: "Carpaccio de Salmón", price: "$16.500" },
          { name: "Palta Cardenal", price: "$13.800", desc: "Palta con camarones." }
        ]
      }
    ]
  },
  {
    id: "entradas-tierra",
    name: "Entradas de Tierra",
    sections: [
      {
        items: [
          { name: "Palta Reina", price: "$13.800" },
          { name: "Carpaccio Filete", price: "$16.000" },
          { name: "Arrollado de Huazo al Plato", price: "$4.500", desc: "2 porciones con pebre." },
          { name: "Consomés de Ave o Vacuno", price: "$3.500" },
          { name: "Fumet", price: "$4.500", desc: "Caldo de pescado con verduras." },
          { name: "Empanadas Fritas (Docena)", price: "$9.000", desc: "A elección: Mariscos, Carne, Queso, Queso-camarón, Queso-jaiba." },
          { name: "Empanadas Fritas de Locos (Docena)", price: "$16.000" },
          { name: "Empanadas de Prieta Queso (Unidad)", price: "$3.800" },
          { name: "Empanada de Pulpo Navajuela (Unidad)", price: "$4.500" },
          { name: "Mollejas a la Parrilla", price: "$12.500" }
        ]
      }
    ]
  },
  {
    id: "fondos-mar-frios",
    name: "Platos Fríos (Mar)",
    sections: [
      {
        items: [
          { name: "Primavera de Mariscos (Cocidos)", price: "$25.500" },
          { name: "Mariscal Frío", price: "$17.000" },
          { name: "Pinzas de Jaibas en Salsa Verde", price: "$16.800" }
        ]
      }
    ]
  },
  {
    id: "fondos-mar-calientes",
    name: "Platos Calientes (Mar)",
    sections: [
      {
        items: [
          { name: "Embrujo Mar y Tierra", price: "$23.500" },
          { name: "Pulpo a la Parrilla con Papas Doradas", price: "$18.500" },
          { name: "Locos con Camarones al Pil-Pil/Ajillo", price: "$21.500" },
          { name: "Picorocos al Vapor", price: "$14.900" },
          { name: "Paila Marina", price: "$14.500" },
          { name: "Trilogía de Camarones", price: "$22.500" }
        ]
      }
    ]
  },
  {
    id: "pescados-plancha",
    name: "Pescados a la Plancha",
    sections: [
      {
        items: [
          { name: "Salmón Papellón a la Parrilla", price: "$19.500", desc: "Con tomate y queso." },
          { name: "Lenguado a la Plancha", price: "$19.500" },
          { name: "Albacora", price: "$16.900" },
          { name: "Atún", price: "$17.500" },
          { name: "Congrio", price: "$16.000" },
          { name: "Corvina", price: "$16.000" },
          { name: "Salmón", price: "$17.500" },
          { name: "Reineta", price: "$15.000" },
          { name: "Merluza", price: "$15.000" },
          { name: "Trucha (o a la parrilla)", price: "$15.000" }
        ]
      }
    ]
  },
  {
    id: "pescados-fritos",
    name: "Pescados Fritos",
    sections: [
      {
        items: [
          { name: "Congrio Frito", price: "$16.500" },
          { name: "Corvina Frita", price: "$16.500" },
          { name: "Reineta Frita", price: "$15.000" },
          { name: "Merluza Frita", price: "$16.000" }
        ]
      }
    ]
  },
  {
    id: "caldos-chupes",
    name: "Caldos y Chupes",
    sections: [
      {
        items: [
          { name: "Caldillo de Congrio", price: "$16.500" },
          { name: "Caldillo de Congrio Nerudiano (camarones)", price: "$18.500" },
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
    id: "platos-caza",
    name: "Platos de Caza",
    sections: [
      {
        items: [
          { name: "Codornices (2 unidades)", price: "$18.900" },
          { name: "Liebre o Conejo (porción)", price: "$18.900" },
          { name: "Jabalí", price: "$22.900" },
          { name: "Pato (al coñac o a la naranja)", price: "$23.500" }
        ]
      }
    ]
  },
  {
    id: "carnes-parrilla",
    name: "Carnes a la Parrilla / Plancha",
    sections: [
      {
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
          { name: "Matahambre (Malaya)", price: "$15.800" }
        ]
      }
    ]
  },
  {
    id: "carnes-olla",
    name: "Carnes a la Olla / Horno",
    sections: [
      {
        items: [
          { name: "Plateada", price: "$16.000" },
          { name: "Asado de Estomaguillo", price: "$18.900" },
          { name: "Carne Mechada", price: "$15.500" }
        ]
      }
    ]
  },
  {
    id: "platos-tradicionales",
    name: "Platos Tradicionales",
    sections: [
      {
        items: [
          { name: "Crudo de la Casa", price: "$12.500" },
          { name: "Pernil de Cerdo al Horno (papas cocidas y pebre)", price: "$16.500" },
          { name: "Lengua de Vacuno (con salsa de champiñones o salsa verde)", price: "$15.500" },
          { name: "Guatitas a la Chilena o a la Primavera", price: "$12.500" },
          { name: "Pastel de Choclo Pequeño", price: "$5.000" },
          { name: "Pastel de Choclo", price: "$12.500" },
          { name: "Chancho Borracho", price: "$15.000" },
          { name: "Chunchules a la Parrilla con Papas Cocidas", price: "$15.000" },
          { name: "Fetuccini o Raviolis con Salsa Alfredo y/o Bolognesa", price: "$14.800" }
        ]
      }
    ]
  },
  {
    id: "cazuelas-caldos",
    name: "Cazuelas, Caldos y Ajiacos",
    sections: [
      {
        items: [
          { name: "Ajiaco con Sopaipillas", price: "$13.000" },
          { name: "Valdiviano con Sopaipillas", price: "$15.800" },
          { name: "Cazuela de Vacuno", price: "$8.000" },
          { name: "Cazuela de Ave", price: "$8.000" },
          { name: "Cazuela de Cordero", price: "$9.000" }
        ]
      }
    ]
  },
  {
    id: "ninos",
    name: "Platos de Niños",
    sections: [
      {
        items: [
          { name: "Bistec a la Plancha con Arroz / Puré", price: "$12.800" },
          { name: "Salchipapas (Formato Pulpito)", price: "$8.000" },
          { name: "Nugget con Papas Fritas (4 unidades)", price: "$10.000" }
        ]
      }
    ]
  },
  {
    id: "compartir",
    name: "Para Compartir",
    sections: [
      {
        items: [
          { name: "Brasero Entre Mar y Tierra", price: "$61.000", desc: "Carnes con porciones de pescados y mariscos salteados." },
          { name: "Brasero para 2 Personas", price: "$49.000", desc: "Vacuno, pollo, cerdo, chunchules, interiores, ensalada y sopaipillas." },
          { name: "Parrillada para 2 Personas", price: "$45.900", desc: "Vacuno, pollo, cerdo, longaniza, ensalada y sopaipillas." },
          { name: "Tabla Mar y Tierra", price: "$25.500" },
          { name: "Tabla Pico-Pato", price: "$19.500", desc: "Matambre, queso, aceitunas, sopaipillas, etc." }
        ]
      }
    ]
  },
  {
    id: "guarniciones",
    name: "Guarnición del Plato",
    sections: [
      {
        items: [
          { name: "A lo Pobre", price: "$5.500" },
          { name: "Papas Pre Fritas", price: "$3.000" },
          { name: "Papas Fritas Naturales", price: "$5.000" },
          { name: "Papas Duquesas", price: "$3.000" },
          { name: "Papas al Romero, al Ciboulet o al Perejil", price: "$3.500" },
          { name: "Papas Rústicas", price: "$3.500" },
          { name: "Papas Bravas", price: "$5.800" },
          { name: "Papas Hilo", price: "$5.900" },
          { name: "Papas Gratinadas", price: "$5.800" },
          { name: "Papas Mayo", price: "$4.500" },
          { name: "Puré de Castañas (papas y castaña)", price: "$5.500" },
          { name: "Puré Picante", price: "$3.800" },
          { name: "Puré de Palta", price: "$4.000" },
          { name: "Risotto de Camarones", price: "$4.900" },
          { name: "Risotto de Champiñones", price: "$4.500" },
          { name: "Risotto Marino", price: "$4.500" },
          { name: "Arroz Primavera", price: "$3.500" },
          { name: "Arroz a la Mexicana", price: "$3.500" }
        ]
      }
    ]
  },
  {
    id: "salsas-salteados",
    name: "Salsas y Salteados",
    sections: [
      {
        items: [
          { name: "Salsa Gran Duque", price: "$9.500" },
          { name: "Salsa Margarita", price: "$5.800" },
          { name: "Salsa de Locos", price: "$5.800" },
          { name: "Salsa de Centolla", price: "$6.000" },
          { name: "Salsa de Jaiba", price: "$6.000" },
          { name: "Salsa Cardenal (camarones)", price: "$5.500" },
          { name: "Salsa de Piñones", price: "$5.500" },
          { name: "Salsa de Champiñones", price: "$3.500" },
          { name: "Salsa de Murta", price: "$4.500" },
          { name: "Verduras Salteadas", price: "$4.500" },
          { name: "Salteado Mar y Tierra", price: "$5.500" },
          { name: "Salteado Real", price: "$5.500" },
          { name: "A la Mantequilla Rubia o Negra", price: "$2.000" },
          { name: "A la Mantequilla con Alcaparras y Camarones", price: "$5.500" }
        ]
      }
    ]
  },
  {
    id: "ensaladas",
    name: "Ensaladas",
    sections: [
      {
        items: [
          { name: "Surtida", price: "$4.200" },
          { name: "Mar y Tierra", price: "$8.900", desc: "Lechuga, tomate, palmitos, camarones, ostiones, aceitunas." },
          { name: "Apio, Palta", price: "$4.800" },
          { name: "Apio, Lechuga, Palta y Nueces", price: "$5.500" },
          { name: "Rusa", price: "$4.900" },
          { name: "Griega", price: "$6.500" },
          { name: "Lechuga, Apio, Palta", price: "$4.800" },
          { name: "Palta, Palmito, Espárrago", price: "$4.900" },
          { name: "Tomate, Palta", price: "$4.200" },
          { name: "Lechuga, Cebolla Morada", price: "$4.000" },
          { name: "Chilena", price: "$4.000" },
          { name: "Ensalada César (pollo)", price: "$5.000" },
          { name: "Ensalada César (camarón)", price: "$6.000" }
        ]
      }
    ]
  },
  {
    id: "postres",
    name: "Postres",
    sections: [
      {
        items: [
          { name: "Murta con Membrillo", price: "$5.500" },
          { name: "Puré de Castañas", price: "$6.500" },
          { name: "Castañas Mar y Tierra", price: "$9.900" },
          { name: "Picarones Pasados", price: "$3.800" },
          { name: "Mote con Huesillo", price: "$3.800" },
          { name: "Celestino", price: "$3.000", desc: "Panqueque, manjar, azúcar flor." },
          { name: "Alaska", price: "$3.900", desc: "Panqueque, manjar, helados, azúcar flor." },
          { name: "Sinfonía de Papayas", price: "$7.900" },
          { name: "Copa de Helado", price: "$6.900" },
          { name: "Ensalada de Frutas", price: "$6.500" },
          { name: "Café Helado", price: "$5.000" },
          { name: "Tiramisú", price: "$4.500" },
          { name: "Torta del Día", price: "$4.500" }
        ]
      }
    ]
  },
  {
    id: "bebidas-calientes",
    name: "Bebidas Calientes",
    sections: [
      {
        items: [
          { name: "Té Normal", price: "$1.500" },
          { name: "Té de Sabor", price: "$1.800" },
          { name: "Café Taza o Tazón", price: "$2.700" },
          { name: "Café Express Simple", price: "$2.600" },
          { name: "Café Express Doble", price: "$4.500" },
          { name: "Americano", price: "$3.000" },
          { name: "Café Irlandés", price: "$5.500" },
          { name: "Café con Leche", price: "$3.000" }
        ]
      }
    ]
  },
  {
    id: "tragos-preparados",
    name: "Tragos Preparados",
    sections: [
      {
        items: [
          { name: "Mojito Cubano", price: "$6.500" },
          { name: "Mojito Frutal", price: "$6.800" },
          { name: "Mojito Jagermeister", price: "$7.800" },
          { name: "Ron Cola (Pampero)", price: "$6.800" },
          { name: "Ron Cola (Habana)", price: "$6.800" },
          { name: "Ron Barceló", price: "$5.500" },
          { name: "Piscola Horcón Quemado", price: "$6.500" },
          { name: "Piscola Mistral 35°", price: "$6.500" },
          { name: "Piscola Mistral 40°", price: "$7.500" },
          { name: "Piscola Alto del Carmen 40°", price: "$7.500" },
          { name: "Pisco Mistral Manzana Tónica", price: "$7.500" },
          { name: "Whiscola J.W. Rojo", price: "$8.000" },
          { name: "Whiscola J. W. Negro", price: "$9.500" },
          { name: "Whiscola Ballantines", price: "$8.000" },
          { name: "Whiscola Jack Daniel", price: "$10.500" },
          { name: "Caipiriña", price: "$5.500" },
          { name: "Caipirosca", price: "$6.500" },
          { name: "Clavo Oxidado", price: "$9.500" },
          { name: "Sexo en las Rocas", price: "$6.500" }
        ]
      }
    ]
  },
  {
    id: "cocteles-tragos",
    name: "Cócteles y Tragos",
    sections: [
      {
        items: [
          { name: "Tequila Margarita o Blue", price: "$6.500" },
          { name: "Tom Collins", price: "$6.500" },
          { name: "Ramazzotti", price: "$6.500" },
          { name: "Aperol", price: "$6.500" },
          { name: "Bitter a la Francesa", price: "$5.000" },
          { name: "Bitter Araucano", price: "$5.000" },
          { name: "Bitter Batido", price: "$5.000" },
          { name: "Fernet con Coca-Cola", price: "$5.000" }
        ]
      }
    ]
  },
  {
    id: "rocas",
    name: "Formato a las Rocas",
    sections: [
      {
        items: [
          { name: "Johnnie Walker Negro", price: "$7.000" },
          { name: "Whisky Jack Daniels", price: "$7.500" },
          { name: "Chivas Regal 12 Años", price: "$12.000" },
          { name: "Jagermeister", price: "$7.500" },
          { name: "Vodka Stolichnaya", price: "$5.900" },
          { name: "Vodka Smirnoff", price: "$5.900" },
          { name: "Gin Beefeater", price: "$5.900" },
          { name: "Gin Tanqueray", price: "$6.500" },
          { name: "Drambuie (licor de almendras)", price: "$6.000" },
          { name: "Martini Dry Seco", price: "$5.000" },
          { name: "Martini Seco", price: "$5.000" },
          { name: "RedBull Jagger", price: "$9.000" }
        ]
      }
    ]
  }
];
