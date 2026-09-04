export type FaqCategory =
  | 'maquina'
  | 'sabor'
  | 'nutricion'
  | 'catalogo'
  | 'acceso';

export const FAQ_CATEGORY_LABELS: Record<FaqCategory, string> = {
  maquina:   'La máquina',
  sabor:     'Sabor y producto',
  nutricion: 'Nutrición y salud',
  catalogo:  'El catálogo',
  acceso:    'Dónde encontrarnos',
};

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  short: string;
  order: number;
};

export const faqItems: FaqItem[] = [
  {
    id: 'azucar-vs-cafeteria',
    category: 'nutricion',
    question: '¿Cuánta azúcar tiene comparado con una bebida de cafetería?',
    short: 'Todas nuestras bebidas son preparadas sin azúcares añadidos. El dulzor proviene de los ingredientes utilizados que pueden contener sucralosa o acesulfame-k.',
    order: 1,
  },
  {
    id: 'tipo-leche',
    category: 'catalogo',
    question: '¿Qué tipos de leche están disponibles?',
    short: 'Blendia tiene a tu elección leche descremada y deslactosada.',
    order: 2,
  },
  {
    id: 'lactosa',
    category: 'nutricion',
    question: '¿Es apta para intolerantes a la lactosa?',
    short: 'Cada Blendia es a base de proteína de suero de leche, pero procesada para la extracción de proteína. Además que ofrecemos una alternativa con leche deslactosada.',
    order: 3,
  },
  {
    id: 'cafeina',
    category: 'nutricion',
    question: '¿Contiene cafeína?',
    short: 'Los lattes sí contienen cafeína. El matcha contiene teína, de liberación más lenta. El chai tiene niveles mínimos y tanto vanilla como chocolate son libres de cafeína.',
    order: 4,
  },
  {
    id: 'sabe-a-proteina',
    category: 'sabor',
    question: '¿Se nota la proteína en el sabor?',
    short: 'Está ahí, pero no lo parece. El sabor es el punto, la proteína es el bonus.',
    order: 5,
  },
  {
    id: 'diabeticos',
    category: 'nutricion',
    question: '¿Es apta para diabéticos?',
    short: 'Las pruebas realizadas por el equipo de Blendia no mostraron picos significativos de glucosa en personas con esta condición. La bebida Chai es equivalente a un aproximado de dos porciones de carbohidratos, por si necesitas tomarlo en cuenta. Recomendamos consultar con tu médico antes de consumir cualquier producto.',
    order: 6,
  },
  {
    id: 'embarazo',
    category: 'nutricion',
    question: '¿Puedo tomarlo durante el embarazo o lactancia?',
    short: 'Blendia utiliza proteína concentrada. Recomendamos consultar con tu médico antes de consumir el producto, no toda proteína de suero podría ser adecuada en esa etapa.',
    order: 7,
  },
  {
    id: 'bebida-o-suplemento',
    category: 'sabor',
    question: '¿Es una bebida o un suplemento?',
    short: 'Es una bebida funcional que además de sabor, tiene proteína.',
    order: 8,
  },
  {
    id: 'sin-gym',
    category: 'sabor',
    question: '¿Puedo tomarlo si no hago ejercicio?',
    short: 'Sí. Blendia no es una bebida exclusiva, es para todo aquel que quiera mejorar sus hábitos alimenticios.',
    order: 9,
  },
  {
    id: 'como-funciona-maquina',
    category: 'maquina',
    question: '¿Cómo funciona la máquina? ¿Es complicado?',
    short: 'Selecciona tu bebida en la pantalla táctil, pagas, observas su preparación y en dos minutos tienes tu Blendia listo. Sin app ni registro.',
    order: 10,
  },
  {
    id: 'como-pagar',
    category: 'maquina',
    question: '¿Con qué puedo pagar?',
    short: 'Tarjeta de débito o crédito. Contactless está disponible. La máquina no acepta efectivo.',
    order: 11,
  },
  {
    id: 'sin-tienda-online',
    category: 'acceso',
    question: '¿Por qué no puedo comprarlo en línea?',
    short: 'Blendia se prepara al momento. El modelo de vending garantiza esa frescura ya que no es una bebida embotellada.',
    order: 12,
  },
];

export const faqByCategory = (cat: FaqCategory) =>
  faqItems.filter((q) => q.category === cat);

export const FAQ_CATEGORY_ORDER: FaqCategory[] = [
  'maquina',
  'sabor',
  'nutricion',
  'catalogo',
  'acceso',
];
