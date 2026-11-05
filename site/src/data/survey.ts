// Post-purchase survey served at /encuesta (see main.tsx) — not linked
// from anywhere on the landing page. Answers are POSTed to a Google Apps
// Script web app that appends them to a private Google Sheet.
//
// IMPORTANT: option strings are mirrored verbatim in the Apps Script
// backend (kept out of this repo), which rejects any value it doesn't
// recognize. Change both together (and redeploy the script).

export type SurveyQuestion = {
  id: string;
  label: string;
  hint?: string;
  type: "single" | "multi" | "text";
  options?: string[];
  // Label of the free-text "other" choice, if the question has one.
  otherOption?: string;
  required: boolean;
  maxLength?: number;
};

// Apps Script deployment URL (…/exec). Public by design — the script only
// appends validated rows; the Sheet itself stays private.
export const SURVEY_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyzsTwKzEsl8jX8kBK0sQz2CUuic3jJwQhICgV2aiqYiYvnsSYSdZHG7I_kFQgJWcEb/exec";

export const OTHER_MAX_LENGTH = 300;

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: "sabor",
    label: "¿Qué te pareció el sabor de tu Blendia?",
    type: "single",
    options: ["Me encantó", "Estaba bueno", "Normal", "No me gustó"],
    required: true,
  },
  {
    id: "bebida",
    label: "¿Cómo estaba tu bebida?",
    hint: "Puedes marcar varias.",
    type: "multi",
    options: [
      "Excelente, bien mezclada",
      "Muy espesa",
      "Con grumos o polvo sin disolver",
      "La temperatura no era la que esperaba",
    ],
    otherOption: "Otra",
    required: true,
  },
  {
    id: "precio",
    label: "Por lo que pagaste, sientes que…",
    type: "single",
    options: [
      "Vale más de lo que cuesta",
      "Es un precio justo",
      "Está un poco caro",
      "Está muy caro",
    ],
    required: true,
  },
  {
    id: "compra",
    label: "¿Cómo fue comprar en la máquina?",
    hint: "Puedes marcar varias.",
    type: "multi",
    options: [
      "Fácil y rápido",
      "Me costó elegir qué tomar",
      "Tuve problemas para pagar",
      "Tuve problemas al usar la app",
      "Tardó mucho en prepararse",
      "La máquina falló o no entregó la bebida",
    ],
    otherOption: "Otra",
    required: true,
  },
  {
    id: "frecuencia",
    label: "¿Qué haría que compres Blendia más seguido?",
    type: "single",
    options: [
      "Ya lo compro seguido, así está bien",
      "Más sabores",
      "Un precio más bajo",
      "Tener la máquina en más lugares",
    ],
    otherOption: "Otro",
    required: true,
  },
  {
    id: "comentario",
    label: "¿Hay algo más que quieras contarnos?",
    hint: "Una sugerencia, una idea o lo que se te ocurra. Opcional.",
    type: "text",
    required: false,
    maxLength: 1000,
  },
];
