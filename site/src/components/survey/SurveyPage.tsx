import { useEffect, useRef, useState } from "react";
import {
  SURVEY_ENDPOINT,
  SURVEY_QUESTIONS,
  type SurveyQuestion,
} from "../../data/survey";
import ChoiceGroup from "./ChoiceGroup";

type Status = "idle" | "sending" | "sent" | "error" | "busy";

// Set after a successful submit so the same device sees "ya respondiste"
// instead of the form. Data-quality nicety, not a security control —
// private browsing or a direct POST bypasses it.
const SUBMITTED_KEY = "blendia-encuesta-enviada";

const alreadySubmitted = () => {
  try {
    return localStorage.getItem(SUBMITTED_KEY) === "1";
  } catch (_) {
    return false;
  }
};

// Unlisted page at /encuesta — main.tsx renders this instead of <App/>,
// so there's no navbar/footer and nothing on the landing page links here.
export default function SurveyPage() {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [repeat] = useState(alreadySubmitted);
  const startedAt = useRef(Date.now());

  // Keep it out of search results, and drop the landing page's
  // fixed-navbar body padding while this page is mounted.
  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    document.title = "Encuesta · Blendia";
    document.body.classList.add("is-survey");
    return () => {
      robots.remove();
      document.body.classList.remove("is-survey");
    };
  }, []);

  const theme = document.documentElement.getAttribute("data-theme");
  const brandLogo =
    theme === "dark"
      ? "/img-core/logos/text-white.webp"
      : "/img-core/logos/text.webp";

  const toggle = (q: SurveyQuestion, option: string) => {
    setSelected((prev) => {
      const current = prev[q.id] ?? [];
      const next =
        q.type === "multi"
          ? current.includes(option)
            ? current.filter((o) => o !== option)
            : [...current, option]
          : [option];
      return { ...prev, [q.id]: next };
    });
    setErrors((prev) => prev.filter((id) => id !== q.id));
  };

  const validate = () =>
    SURVEY_QUESTIONS.filter((q) => {
      if (!q.required) return false;
      const picked = selected[q.id] ?? [];
      if (picked.length === 0) return true;
      return (
        !!q.otherOption &&
        picked.includes(q.otherOption) &&
        !(otherText[q.id] ?? "").trim()
      );
    }).map((q) => q.id);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const missing = validate();
    setErrors(missing);
    if (missing.length) {
      document
        .getElementById(`q-${missing[0]}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Choice answers go as-is (the script whitelists them); free text is
    // trimmed here and sanitized again server-side.
    const payload: Record<string, unknown> = {
      website: honeypot,
      t: Date.now() - startedAt.current,
    };
    for (const q of SURVEY_QUESTIONS) {
      if (q.type === "text") {
        payload[q.id] = (comments[q.id] ?? "").trim();
        continue;
      }
      const picked = selected[q.id] ?? [];
      payload[q.id] = q.type === "multi" ? picked : picked[0] ?? "";
      if (q.otherOption) {
        payload[`${q.id}_otro`] = picked.includes(q.otherOption)
          ? (otherText[q.id] ?? "").trim()
          : "";
      }
    }

    setStatus("sending");
    try {
      if (!SURVEY_ENDPOINT) throw new Error("SURVEY_ENDPOINT not set");
      // text/plain keeps this a CORS "simple request" — Apps Script
      // can't answer a preflight.
      const res = await fetch(SURVEY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) {
        // "busy" = the script's global rate limit; worth a different message.
        setStatus(data.error === "busy" ? "busy" : "error");
        return;
      }
      try { localStorage.setItem(SUBMITTED_KEY, "1"); } catch (_) {}
      setStatus("sent");
      window.scrollTo({ top: 0 });
    } catch (_) {
      setStatus("error");
    }
  };

  if (status === "sent" || repeat) {
    return (
      <main className="survey-page">
        <div className="survey-shell survey-done">
          <img className="survey-logo" src={brandLogo} alt="Blendia" />
          <h1 className="survey-title">
            {status === "sent" ? "¡Gracias!" : "Ya respondiste, ¡gracias!"}
          </h1>
          <p className="survey-lead">
            {status === "sent"
              ? "Recibimos tus respuestas. Las leemos todas y nos ayudan a mejorar cada Blendia."
              : "Ya recibimos tus respuestas desde este dispositivo. Las leemos todas y nos ayudan a mejorar cada Blendia."}
          </p>
          <p className="survey-tagline">Blendia. Tu bienestar sabe bien.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="survey-page">
      <form className="survey-shell" onSubmit={submit} noValidate>
        <header className="survey-header">
          <img className="survey-logo" src={brandLogo} alt="Blendia" />
          <h1 className="survey-title">¿Qué tal tu Blendia?</h1>
          <p className="survey-lead">
            Son 6 preguntas rápidas y tus respuestas son anónimas.
          </p>
        </header>

        {errors.length > 0 && (
          <p className="survey-alert" role="alert">
            Te falta responder {errors.length === 1 ? "1 pregunta" : `${errors.length} preguntas`}.
          </p>
        )}

        {SURVEY_QUESTIONS.map((q, i) => {
          const invalid = errors.includes(q.id);
          return (
            <fieldset
              key={q.id}
              id={`q-${q.id}`}
              className={`survey-question${invalid ? " is-invalid" : ""}`}
            >
              <legend className="survey-question-label">
                <span className="survey-question-num">{i + 1}</span>
                <span>
                  {q.label}
                  {q.hint && (
                    <span className="survey-question-hint">{q.hint}</span>
                  )}
                </span>
              </legend>

              {q.type === "text" ? (
                <textarea
                  className="survey-input survey-textarea"
                  aria-label={q.label}
                  rows={4}
                  maxLength={q.maxLength}
                  value={comments[q.id] ?? ""}
                  onChange={(e) =>
                    setComments((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                />
              ) : (
                <ChoiceGroup
                  question={q}
                  selected={selected[q.id] ?? []}
                  otherText={otherText[q.id] ?? ""}
                  invalid={invalid}
                  onToggle={(option) => toggle(q, option)}
                  onOtherText={(text) => {
                    setOtherText((prev) => ({ ...prev, [q.id]: text }));
                    setErrors((prev) => prev.filter((id) => id !== q.id));
                  }}
                />
              )}

              {invalid && (
                <p className="survey-question-error">
                  {(selected[q.id] ?? []).length
                    ? "Cuéntanos un poco más en el campo de texto."
                    : "Elige una opción."}
                </p>
              )}
            </fieldset>
          );
        })}

        {/* Honeypot — hidden from people, filled by naive bots. The
            name/autocomplete/data-* opt-outs keep browser and password-
            manager autofill out of it: a filled honeypot makes the script
            silently drop the response while the person sees "¡Gracias!". */}
        <div className="survey-hp" aria-hidden="true">
          <label>
            Sitio web
            <input
              type="text"
              name="hp_x"
              tabIndex={-1}
              autoComplete="new-password"
              data-1p-ignore=""
              data-lpignore="true"
              data-bwignore=""
              data-form-type="other"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>
        </div>

        {status === "busy" && (
          <p className="survey-alert" role="alert">
            Estamos recibiendo muchas respuestas en este momento. Inténtalo de
            nuevo en unos minutos.
          </p>
        )}

        {status === "error" && (
          <p className="survey-alert" role="alert">
            No pudimos enviar tus respuestas. Revisa tu conexión e inténtalo
            de nuevo.
          </p>
        )}

        <button
          type="submit"
          className="hero-cta-primary survey-submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Enviando…" : "Enviar respuestas"}
        </button>
      </form>
    </main>
  );
}
