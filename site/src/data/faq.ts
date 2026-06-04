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
  long: string;
};

export const faqItems: FaqItem[] = [

  /* ── TIER 1 — Bloquean la visita ───────────────────────────────────── */

  {
    id: 'donde-maquina',
    category: 'acceso',
    question: '¿Dónde encuentro una máquina Blendia?',
    short: 'En centros comerciales, universidades y plazas de Guatemala. Encuentra la más cercana en la sección Ubicaciones de este sitio.',
    long: 'Las máquinas Blendia están en lugares de alto tráfico donde la gente naturalmente busca un break de calidad: edificios de oficinas, universidades y centros comerciales en Guatemala. El mapa de ubicaciones tiene dirección exacta y horario de cada máquina. Si no encuentras una cerca de ti, puedes sugerir una — estamos expandiendo activamente.',
  },
  {
    id: 'como-funciona-maquina',
    category: 'maquina',
    question: '¿Cómo funciona la máquina? ¿Es complicado?',
    short: 'Selecciona tu bebida en la pantalla táctil, pagas, observas su preparación y en segundos tienes tu Blendia listo. Sin app, sin registro.',
    long: 'La máquina funciona como cualquier vending machine moderna: pantalla táctil para elegir categoría y sabor, pago integrado (tarjeta de crédito o débito), entrega en segundos. No necesitas descargar ninguna app ni crear una cuenta. Cada máquina tiene instrucciones visuales paso a paso. El proceso completo toma menos de dos minutos.',
  },
  {
    id: 'como-pagar',
    category: 'maquina',
    question: '¿Con qué puedo pagar?',
    short: 'Tarjeta de débito o crédito . Contactless donde esté disponible. La máquina da cambio.',
    long: 'Las máquinas Blendia aceptan tarjeta de débito y crédito (Visa, Mastercard) contactless. Si tu método de pago no funciona, hay un QR de soporte visible en cada máquina.',
  },
  {
    id: 'sabe-a-proteina',
    category: 'sabor',
    question: '¿Se nota la proteína en el sabor?',
    short: 'No. Está ahí, pero no lo parece. El sabor es el punto — la proteína es el bonus.',
    long: 'Esta es la pregunta más frecuente, y la respuesta más honesta: no se nota. Blendia fue formulada para que la proteína sea invisible en el perfil de sabor. Lo que notas es el matcha, el chai, el café — no el suplemento. Si esperabas el sabor artificial de un shake de proteína, te va a sorprender. Si esperabas algo rico, vas a encontrar exactamente eso.',
  },
  {
    id: 'cuanto-cuesta',
    category: 'acceso',
    question: '¿Cuánto cuesta?',
    short: 'Lattes y Shakes entre Q 30–35. Essentials desde Q 25. El precio exacto aparece en la pantalla de la máquina.',
    long: 'El precio de Blendia es comparable al de una bebida de cafetería premium — pero todo cambia cuando incluye proteína real y menos azúcar. No pagas solo la bebida; pagas no tener que elegir entre lo que quieres y lo que te hace bien.',
  },
  {
    id: 'disponible-horario',
    category: 'maquina',
    question: '¿Están disponibles todo el día?',
    short: 'Depende del horario del establecimiento. La mayoría operan entre 6am y 10pm. Consulta el horario específico en Ubicaciones.',
    long: 'Las máquinas funcionan dentro del horario de cada establecimiento. Los centros comerciales ofrecen acceso más amplio. Oficinas y universidades siguen horario laboral. En la sección de Ubicaciones puedes ver el horario específico de cada máquina antes de ir.',
  },

  /* ── TIER 2 — Bloquean la confianza ─────────────────────────────────── */

  {
    id: 'bebida-o-suplemento',
    category: 'sabor',
    question: '¿Es una bebida o un suplemento?',
    short: 'Es una bebida. Una muy buena, que además tiene proteína.',
    long: 'Blendia se diseñó como bebida funcional — no como suplemento con sabor. El punto de partida fue el sabor, no la proteína. No necesitas estar en dieta, hacer ejercicio ni tener ninguna meta nutricional para disfrutarla. Solo necesitas querer algo rico.',
  },
  {
    id: 'ingredientes',
    category: 'sabor',
    question: '¿Qué ingredientes usa Blendia?',
    short: 'Proteína de suero, saborizantes naturales y los ingredientes de cada variedad: matcha real, especias masala, cacao. Sin colorantes artificiales.',
    long: 'La formulación prioriza ingredientes reconocibles: proteína de suero de alta calidad, leche, y los perfiles reales de cada variedad — matcha japonés en el Zen, especias auténticas en el Masala, cacao de proceso natural en el Midnight. La lista completa está en la tabla nutricional de cada producto, disponible en el catálogo de este sitio.',
  },
  {
    id: 'conservantes',
    category: 'sabor',
    question: '¿Tiene conservantes o colorantes artificiales?',
    short: 'No usa colorantes artificiales. Los conservantes son mínimos — lo necesario para garantizar estabilidad en la máquina.',
    long: 'Los colores de cada bebida vienen de sus ingredientes naturales: el verde del matcha, el tono del cacao. Como toda bebida formulada para dispensarse en vending, incluye estabilizadores que garantizan consistencia. Si tienes restricciones específicas, la tabla nutricional completa está en el catálogo.',
  },
  {
    id: 'azucar-vs-cafeteria',
    category: 'nutricion',
    question: '¿Cuánta azúcar tiene comparado con un café de cafetería?',
    short: 'Menos azúcar que un chai latte estándar de cafetería, y menos que un frappé. El dulzor está ahí, pero controlado.',
    long: 'Un chai latte mediano de cafetería puede tener entre 30g y 45g de azúcar. Un frappé, más. Blendia tiene el dulzor suficiente para saber a antojo, sin el exceso que deja esa sensación pesada de después. No es una bebida sin azúcar — es una bebida con el azúcar en su lugar correcto. Los valores exactos están en la tabla nutricional de cada producto.',
  },
  {
    id: 'cuanta-proteina',
    category: 'nutricion',
    question: '¿Cuánta proteína tiene cada bebida?',
    short: 'Entre 15g y 25g por porción según la categoría. Los Shakes tienen la mayor concentración.',
    long: 'Los Shakes tienen la mayor concentración de proteína. Los Lattes tienen un balance entre sabor y proteína. Los Essentials son la versión más pura y directa. La tabla nutricional de cada producto está en el catálogo — gira la card para verla.',
  },
  {
    id: 'calorias',
    category: 'nutricion',
    question: '¿Cuántas calorías tiene?',
    short: 'Entre 150 y 280 kcal por porción. Los valores exactos están en la tabla nutricional de cada producto.',
    long: 'Blendia tiene menos calorías que un frappé de cafetería del mismo tamaño, con más proteína — mejor relación calorías/saciedad. Para quienes cuentan calorías: los detalles completos están en la tabla nutricional de cada producto en el catálogo.',
  },
  {
    id: 'sin-gym',
    category: 'sabor',
    question: '¿Puedo tomarlo si no hago ejercicio?',
    short: 'Sí. Blendia no es una bebida de gym. Es una bebida que sabe rico y además tiene proteína.',
    long: 'La proteína no es solo para personas que hacen ejercicio — es un macronutriente que el cuerpo necesita todo el día. Pero más allá de eso: Blendia no se diseñó para el mercado fitness. Se diseñó para cualquier persona que quiera algo delicioso que también valga la pena. Si nunca pisas un gimnasio y amas el matcha, el Zen Latte es para ti exactamente igual.',
  },

  /* ── TIER 3 — Restricciones personales ──────────────────────────────── */

  {
    id: 'cafeina',
    category: 'nutricion',
    question: '¿Tiene cafeína?',
    short: 'Midnight (café) tiene cafeína. Zen (matcha) tiene teína, de liberación más lenta. Moon y Masala tienen niveles mínimos o ninguno.',
    long: 'Midnight tiene cafeína comparable a un americano pequeño. Zen tiene teína — la cafeína del té verde, que genera alerta sin el pico y caída del café. Si eres sensible a la cafeína o quieres tomar Blendia por la noche, Moon o Masala son los más seguros. Los valores exactos están en la tabla nutricional de cada variedad.',
  },
  {
    id: 'lactosa',
    category: 'nutricion',
    question: '¿Es apta para intolerantes a la lactosa?',
    short: 'Las versiones estándar contienen proteína de suero (lácteo). Consulta la etiqueta antes de consumir si eres intolerante.',
    long: 'La base estándar usa proteína de suero (whey), derivada de la leche. Si eres intolerante severo o tienes alergia a la proteína de la leche, revisa la etiqueta nutricional de la variante específica. Estamos desarrollando versiones con alternativas vegetales para ampliar el acceso.',
  },
  {
    id: 'vegana',
    category: 'nutricion',
    question: '¿Es vegana o vegetariana?',
    short: 'Es vegetariana. No es vegana en versión estándar — usa proteína de suero (lácteo).',
    long: 'La proteína de suero (whey) deriva de la leche, por lo que las versiones estándar no son veganas. Son aptas para vegetarianos. Si eres vegano, estamos desarrollando versiones con proteína vegetal — no disponibles todavía.',
  },
  {
    id: 'gluten',
    category: 'nutricion',
    question: '¿Tiene gluten?',
    short: 'Los ingredientes principales no contienen gluten, pero se procesan en entornos que pueden tener trazas. No apta para celíacos.',
    long: 'Si tienes celiaquía o sensibilidad severa, revisa la etiqueta específica de cada variedad. Aunque los ingredientes principales no contienen gluten, la producción compartida puede generar trazas. Para intolerancia leve, la mayoría de usuarios no reportan reacción — pero siempre consulta con tu médico.',
  },
  {
    id: 'diabeticos',
    category: 'nutricion',
    question: '¿Es apta para diabéticos?',
    short: 'Tiene menos azúcar que la mayoría de bebidas de cafetería, pero no es sin azúcar. Consulta con tu médico.',
    long: 'Blendia reduce el azúcar respecto a bebidas equivalentes de cafetería — no la elimina. Tiene dulzor real, sin edulcorantes artificiales en la mayoría de variedades. Si eres diabético, los valores de carbohidratos y azúcares están en la tabla nutricional para que los evalúes con tu médico.',
  },
  {
    id: 'embarazo',
    category: 'nutricion',
    question: '¿Puedo tomarlo durante el embarazo o lactancia?',
    short: 'Consulta con tu médico antes. Blendia tiene proteína concentrada — no toda suplementación es adecuada en esa etapa.',
    long: 'Durante el embarazo y la lactancia, cualquier aporte adicional de proteína debe evaluarse con tu médico o nutricionista. Blendia no es un suplemento médico, pero tiene concentraciones que pueden interactuar con los requerimientos específicos de esa etapa. La tabla nutricional completa está disponible para que la consultes con tu profesional de salud.',
  },

  /* ── TIER 4 — Confusión de catálogo ─────────────────────────────────── */

  {
    id: 'diferencia-categorias',
    category: 'catalogo',
    question: '¿Cuál es la diferencia entre Essentials, Shakes y Lattes?',
    short: 'Essentials = funcional y directo. Shakes = cremoso y denso. Lattes = balance entre café/té y proteína.',
    long: 'Las tres categorías comparten sabor y proteína, pero tienen perfiles distintos. Essentials: versión más pura, enfocada en el ingrediente principal. Shakes: textura más densa y cremosa, llenan más. Lattes: experiencia de cafetería (servidos fríos) con beneficio funcional — los más cercanos al chai o matcha que ya conoces.',
  },
  {
    id: 'similar-matcha',
    category: 'catalogo',
    question: '¿Cuál es el más parecido a un matcha latte de cafetería?',
    short: 'El Zen Latte. Matcha japonés con base cremosa, diseñado específicamente para ese perfil.',
    long: 'El Zen Latte usa matcha japonés real, tiene la cremosidad del latte, y está formulado para que el perfil de sabor sea reconocible para quien ya ama el matcha. La diferencia: proteína real que no afecta el sabor, listo en segundos sin hacer fila. El Zen Shake es la versión para quien prefiere textura más densa y fría.',
  },
  {
    id: 'similar-chai',
    category: 'catalogo',
    question: '¿Cuál es el más parecido a un chai latte?',
    short: 'El Masala Latte. Canela, cardamomo y las especias del chai en versión Blendia.',
    long: 'El Masala Latte tiene el perfil de especias del chai: canela, cardamomo y jengibre en el balance que esperas. Diseñado para el consumidor de chai que quiere el mismo ritual de sabor con menos azúcar y proteína incluida. Es el producto que más sorprende en primera prueba — el contraste entre las especias y la bebida fría es lo que más comentarios genera.',
  },
  {
    id: 'vs-proteina-normal',
    category: 'catalogo',
    question: '¿Qué tan diferente es de un batido de proteína normal?',
    short: 'Muy diferente. Los batidos convencionales diseñan el sabor alrededor de la proteína. Blendia diseñó la proteína alrededor del sabor.',
    long: 'Un shake de proteína convencional parte de la proteína y agrega saborizantes para hacerlo tolerable. Blendia partió de "¿cómo debería saber un matcha perfecto?" e incorporó la proteína sin que se note. El resultado: un fanático del gym lo considera suave, y un amante del café de especialidad lo encuentra delicioso. Exactamente el punto.',
  },
  {
    id: 'personalizar',
    category: 'maquina',
    question: '¿Puedo personalizar mi bebida en la máquina?',
    short: 'Sí. Puedes elegir categoría, sabor y opciones adicionales donde estén disponibles.',
    long: 'La pantalla guía la personalización paso a paso: categoría, sabor, y en máquinas seleccionadas, opciones como proteína extra o leche vegetal. El nivel de personalización depende de la máquina específica. La pantalla muestra en el momento qué opciones están activas.',
  },

  /* ── TIER 5 — Fricción post-descubrimiento ───────────────────────────── */

  {
    id: 'sin-tienda-online',
    category: 'acceso',
    question: '¿Por qué no puedo comprarlo en línea?',
    short: 'Blendia se prepara al momento. El modelo de vending garantiza esa frescura — no es una bebida embotellada.',
    long: 'La decisión de no vender online es parte del diseño del producto. Blendia se prepara al momento de dispensarse, lo que garantiza frescura y consistencia. No es un jugo envasado que viaja días antes de llegar. El canal de vending machine es lo que hace que el producto sea lo que es. Si no hay una máquina cerca todavía, la lista crece constantemente — y puedes sugerir la tuya.',
  },
  {
    id: 'solo-guatemala',
    category: 'acceso',
    question: '¿Solo está disponible en Guatemala?',
    short: 'Por ahora, sí. Guatemala City es donde empezamos. La expansión está en camino.',
    long: 'Blendia opera actualmente en Guatemala City. El modelo de expansión es progresivo — primero consolidamos la red y la calidad de operación en la ciudad, antes de escalar. Si estás fuera de Guatemala, síguenos para enterarte de la expansión. Si estás en una zona sin cobertura, la opción "Sugerir una ubicación" nos ayuda a priorizar.',
  },
  {
    id: 'cuantas-ubicaciones',
    category: 'acceso',
    question: '¿Cuántas ubicaciones hay actualmente?',
    short: 'Las ubicaciones activas están en el mapa de este sitio, siempre actualizado.',
    long: 'La red de máquinas crece constantemente. El mapa de ubicaciones en este sitio refleja las máquinas activas en tiempo real. Si tu lugar favorito no tiene una todavía, usa el botón "Sugerir una ubicación" — cada sugerencia se evalúa para la próxima ronda de instalaciones.',
  },
  {
    id: 'sugerir-ubicacion',
    category: 'acceso',
    question: '¿Cómo pido que instalen una máquina en mi lugar?',
    short: 'Usa el botón "Sugerir una ubicación" en la sección Ubicaciones. Solo necesitas el nombre del lugar.',
    long: 'Comparte el nombre y dirección del establecimiento donde te gustaría encontrar una máquina, y el equipo de Blendia lo evalúa para la siguiente ronda de instalaciones. Los lugares con más sugerencias tienen prioridad. Si eres dueño o encargado del establecimiento, hay una opción de contacto directo para instalación.',
  },
  {
    id: 'si-falla-maquina',
    category: 'maquina',
    question: '¿Qué pasa si la máquina falla o mi bebida sale mal?',
    short: 'Cada máquina tiene un QR de soporte visible. Reembolso o reposición sin preguntas.',
    long: 'Si la máquina tiene un error, el QR en la parte frontal te conecta directo con soporte. Si recibiste una bebida con algún problema de calidad, reportándolo obtienes reembolso o reposición sin preguntas. Nos importa más que vuelvas que ganar el argumento por una bebida.',
  },
  {
    id: 'todos-los-dias',
    category: 'sabor',
    question: '¿Puedo tomarlo todos los días?',
    short: 'Sí. Está formulada para el consumo diario como parte de una dieta variada.',
    long: 'Blendia no es un suplemento que se toma con prescripción — es una bebida. Puedes tomarla todos los días de la misma manera en que tomarías un café de especialidad. La proteína que aporta complementa, no reemplaza, una dieta equilibrada. Si tienes condiciones médicas que requieren control de proteína, consulta con tu médico. Para el resto: es tu bebida del día a día.',
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
