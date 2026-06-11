import { useEffect, useRef, useState } from "react";
import {
  locations,
  ZONE_LABELS,
  type LocationType,
  type LocationZone,
} from "../data/locations";

type ActiveZone = LocationZone | 'todas';

const filterZones: { key: ActiveZone; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  ...Array.from(new Set(locations.map((l) => l.zone))).map((z) => ({
    key: z,
    label: ZONE_LABELS[z],
  })),
];

// ─── Type icons ───────────────────────────────────────────────────────────────

function IconGym() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 9H4v6h2M6 9v6M6 9h2M6 15h2M8 9v6M18 9h2v6h-2M18 9v6M18 9h-2M18 15h-2M16 9v6M8 12h8" />
    </svg>
  );
}

function IconOffice() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M3 21h18" />
      <path d="M9 8h2M9 12h2M13 8h2M13 12h2M10 21v-5h4v5" />
    </svg>
  );
}

function IconUniversity() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3L2 9l10 6 10-6-10-6z" />
      <path d="M6 13v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 9v5" />
    </svg>
  );
}

function IconMall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function IconClinic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function TypeIcon({ type }: { type: LocationType }) {
  switch (type) {
    case 'gym':        return <IconGym />;
    case 'office':     return <IconOffice />;
    case 'university': return <IconUniversity />;
    case 'mall':       return <IconMall />;
    case 'clinic':     return <IconClinic />;
  }
}

function IconEmpty() {
  return (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M28 6C18 6 10 16 10 24c0 10 18 26 18 26s18-16 18-26C46 16 38 6 28 6z" />
      <path d="M22 24h12M28 18v12" strokeDasharray="3 2" opacity="0.5" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="loc-cta-arrow">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Locations() {
  const [activeZone, setActiveZone] = useState<ActiveZone>('todas');
  const headerRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeZone === 'todas'
      ? locations
      : locations.filter((loc) => loc.zone === activeZone);

  const activeLabel = filterZones.find((z) => z.key === activeZone)?.label ?? '';

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ubicaciones" className="locations-section">
      <div className="container locations-inner">

        {/* Header */}
        <div className="loc-header loc-animate-header" ref={headerRef}>
          <span className="loc-eyebrow">Encuéntranos</span>
          <h2 className="loc-title">Encuentra tu máquina Blendia</h2>
          <p className="loc-subtitle">
            Disponibles en Guatemala City. Sin fila, sin esperar.
          </p>
        </div>

        {/* Zone filter */}
        <div
          className="loc-filter-bar"
          role="group"
          aria-label="Filtrar ubicaciones por zona"
        >
          {filterZones.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`loc-chip${activeZone === key ? ' is-active' : ''}`}
              onClick={() => setActiveZone(key)}
              aria-pressed={activeZone === key}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="loc-count" aria-live="polite" aria-atomic="true">
          {filtered.length}{' '}
          {filtered.length === 1 ? 'ubicación' : 'ubicaciones'}
          {activeZone !== 'todas' ? ` en ${activeLabel}` : ' disponibles'}
        </p>

        {/* Cards / empty */}
        {filtered.length > 0 ? (
          <div className="loc-grid">
            {filtered.map((loc, i) => (
              <article
                key={loc.id}
                className="loc-card"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Top row: icon + zone */}
                <div className="loc-card-top">
                  <div className="loc-type-icon">
                    <TypeIcon type={loc.type} />
                  </div>
                  <span className="loc-zone-tag">{ZONE_LABELS[loc.zone]}</span>
                </div>

                <h3 className="loc-name">{loc.name}</h3>
                <p className="loc-address">{loc.address}</p>
                <p className="loc-hours">{loc.hours}</p>

                {/* Bottom row: CTA + status */}
                <div className="loc-card-bottom">
                  {loc.status === 'live' ? (
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="loc-cta"
                      aria-label={`Cómo llegar a ${loc.name}`}
                    >
                      Cómo llegar
                      <IconArrow />
                    </a>
                  ) : (
                    <span />
                  )}
                  <span className={`loc-status${loc.status === 'live' ? ' is-live' : ' is-soon'}`}>
                    {loc.status === 'live' ? 'Disponible' : 'Pronto'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="loc-empty" role="status" aria-live="polite">
            <div className="loc-empty-icon"><IconEmpty /></div>
            <p className="loc-empty-title">Aún no hay máquinas aquí</p>
            <p className="loc-empty-copy">
              Estamos expandiendo. ¿Conoces un lugar que sería perfecto para una máquina Blendia?
            </p>
            <button
              type="button"
              className="loc-reset-btn"
              onClick={() => setActiveZone('todas')}
            >
              Ver todas las ubicaciones
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="loc-footer-cta">
          <p className="loc-footer-text">
            ¿Quieres Blendia más cerca de ti?
          </p>
          <a href="mailto:ubicaciones@blendiashakes.com" className="loc-suggest-link">
            Sugerir una ubicación
          </a>
        </div>

      </div>
    </section>
  );
}
