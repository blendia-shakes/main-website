import { type CategoryKey, type FlavorKey } from "./products";

export type ProductFicha = {
  tagline: string;
  description: string;
  emotionalBenefit: string;
  functionalBenefit: string;
  price: string;
  cta: string;
};

const fichas: Record<string, ProductFicha> = {

  /* ── LATTES ─────────────────────────────────────────────────────────── */

  'latte-zen': {
    tagline: 'El matcha de cafetería que también te alimenta',
    description:
      'Matcha japonés, base cremosa y dulzor que no necesita justificarse. Diseñado para saber exactamente a lo que esperas — y sorprenderte con lo que no ves.',
    emotionalBenefit: 'La pausa que se siente como una buena decisión.',
    functionalBenefit: 'Proteína real en cada sorbo. Sin que lo notes.',
    price: 'Q 35',
    cta: 'Encuéntralo cerca de ti',
  },

  'latte-masala': {
    tagline: 'Canela, cardamomo y una razón más para el break',
    description:
      'Las especias que reconoces desde el primer olor, la cremosidad que esperas, y proteína que nadie pidió pero que de todas formas está ahí. El chai que no tienes que justificar.',
    emotionalBenefit: 'Calidez en un vaso. El break que esta vez sí valió la pena.',
    functionalBenefit: 'Más proteína que tu chai de cafetería. Menos azúcar, también.',
    price: 'Q 35',
    cta: 'Encuéntralo cerca de ti',
  },

  'latte-moon': {
    tagline: 'Vainilla cremosa. Sin complicaciones.',
    description:
      'Suave, familiar y exactamente tan rico como esperas. El latte de vainilla que te recuerda que los clásicos existen por algo.',
    emotionalBenefit: 'Como volver a casa en un sorbo.',
    functionalBenefit: 'Proteína real. El sabor, todo tuyo.',
    price: 'Q 35',
    cta: 'Encuéntralo cerca de ti',
  },

  'latte-midnight': {
    tagline: 'Café oscuro para los que no se conforman',
    description:
      'Intensidad de espresso, cremosidad de latte premium y el extra que no venía en el menú original. Para el día que pide algo más.',
    emotionalBenefit: 'El latte que dice que hoy sí te diste lo mejor.',
    functionalBenefit: 'Proteína en cada sorbo oscuro.',
    price: 'Q 35',
    cta: 'Encuéntralo cerca de ti',
  },

  /* ── SHAKES ─────────────────────────────────────────────────────────── */

  'shakes-midnight': {
    tagline: 'El chocolate que no necesita excusa',
    description:
      'Cacao intenso, textura shake que recuerdas desde siempre, y ningún momento incómodo después de tomarlo. El antojo que esta vez también es buena decisión.',
    emotionalBenefit: 'El antojo satisfecho sin el arrepentimiento de después.',
    functionalBenefit: 'Proteína que trabaja mientras tú disfrutas.',
    price: 'Q 35',
    cta: 'Encuéntralo cerca de ti',
  },

  'shakes-moon': {
    tagline: 'Vainilla que se toma en serio',
    description:
      'Cremoso, clásico y con una textura shake que lo dice todo. Para los que saben que la vainilla nunca es aburrida cuando está bien hecha.',
    emotionalBenefit: 'El placer de algo familiar, sin sorpresas malas.',
    functionalBenefit: 'Proteína que no interrumpe el sabor.',
    price: 'Q 35',
    cta: 'Encuéntralo cerca de ti',
  },

  'shakes-zen': {
    tagline: 'Matcha en versión shake — sin pretensiones',
    description:
      'El perfil del matcha que amas, en textura shake lista en segundos. Fresco, verde y directo. Sin capas que le quiten la esencia.',
    emotionalBenefit: 'La frescura del matcha cuando más la necesitas.',
    functionalBenefit: 'Proteína en cada sorbo verde.',
    price: 'Q 35',
    cta: 'Encuéntralo cerca de ti',
  },

  'shakes-masala': {
    tagline: 'Especias tibias, shake frío — el contraste que funciona',
    description:
      'Canela y cardamomo en un shake frío que funciona mejor de lo que suena. La bebida que descubres y no puedes dejar de pedir.',
    emotionalBenefit: 'El sabor que no esperabas y que ahora no puedes olvidar.',
    functionalBenefit: 'Proteína real con sabor que no se repite.',
    price: 'Q 35',
    cta: 'Encuéntralo cerca de ti',
  },

  /* ── ESSENTIALS ─────────────────────────────────────────────────────── */

  'essentials-moon': {
    tagline: 'El esencial que sabe a más de lo que promete',
    description:
      'Ligero, versátil y diseñado para acompañar sin robar protagonismo. La base funcional que se convierte en el favorito inesperado.',
    emotionalBenefit: 'Simple y consistente. Exactamente lo que necesitas.',
    functionalBenefit: 'Proteína pura con sabor limpio.',
    price: 'Q 30',
    cta: 'Encuéntralo cerca de ti',
  },

  'essentials-midnight': {
    tagline: 'Cacao cuando el día lo pide',
    description:
      'Lo esencial no tiene por qué ser aburrido. Cacao real, sabor intenso y la proteína que convierte un antojo en una decisión sin arrepentimientos.',
    emotionalBenefit: 'El cacao que saca de cualquier mal momento.',
    functionalBenefit: 'Proteína de verdad, con el sabor que importa.',
    price: 'Q 30',
    cta: 'Encuéntralo cerca de ti',
  },

  'essentials-zen': {
    tagline: 'Matcha esencial. Sin rodeos.',
    description:
      'El perfil limpio del matcha, sin aditivos que le quiten la esencia. Para los puristas y para los curiosos por igual. Directo y honesto.',
    emotionalBenefit: 'La claridad del matcha en su forma más genuina.',
    functionalBenefit: 'Proteína funcional con perfil verde y limpio.',
    price: 'Q 30',
    cta: 'Encuéntralo cerca de ti',
  },

  'essentials-masala': {
    tagline: 'Especias reales para el break que lo merece',
    description:
      'Las especias del masala en su versión más directa: sin capas, sin excesos. Justo lo que necesitas cuando el día pide algo con personalidad.',
    emotionalBenefit: 'El break que tiene carácter propio.',
    functionalBenefit: 'Proteína donde menos la esperas, donde más importa.',
    price: 'Q 30',
    cta: 'Encuéntralo cerca de ti',
  },
};

export function getFicha(category: CategoryKey, flavor: FlavorKey): ProductFicha | null {
  return fichas[`${category}-${flavor}`] ?? null;
}
