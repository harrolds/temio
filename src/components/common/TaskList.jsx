import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * TaskList (Home)
 * - Leest alle categorie-reminders uit localStorage
 * - Sorteert op datum (toekomst eerst), toont de eerstvolgende items
 * - Toont link naar bijbehorende categorie pagina
 * - Volledig client-side, geen network calls
 */
const CATEGORIES = [
  { key: "auto", path: "/auto" },
  { key: "huur", path: "/huur" },
  { key: "gezondheid", path: "/gezondheid" },
  { key: "contracten", path: "/contracten" },
  { key: "overheid", path: "/overheid" },
  { key: "diversen", path: "/diversen" },
];

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function TaskList({ limit = 6 }) {
  const { t, i18n } = useTranslation();

  const items = useMemo(() => {
    const all = [];
    for (const { key, path } of CATEGORIES) {
      const list = readStorage(`rr_reminders_${key}`);
      for (const it of list) {
        const name = it.naam || it.name || "";
        const dateStr = it.datum || it.date || "";
        let when = null;
        if (dateStr) {
          const parsed = new Date(dateStr);
          when = isNaN(parsed.getTime()) ? null : parsed;
        }
        all.push({
          id: it.id || `${key}-${name}-${dateStr}`,
          name,
          when,
          rawDate: dateStr || "",
          category: key,
          path,
          beschrijving: it.beschrijving || it.description || "",
        });
      }
    }
    // sort: null dates last, then by date asc
    all.sort((a, b) => {
      if (!a.when && !b.when) return 0;
      if (!a.when) return 1;
      if (!b.when) return -1;
      return a.when - b.when;
    });
    return all;
  }, []);

  const lang = i18n?.language || "nl";
  const fmtDate = (d) =>
    d
      ? new Intl.DateTimeFormat(lang, { day: "2-digit", month: "2-digit", year: "numeric" }).format(d)
      : "—";

  return (
    <div className="tasklist fade-in">
      {/* Header zonder aantalteller */}
      <div className="tasklist__header">
        <h3 className="tasklist__title">
          {t("home.tasks.title", "Aankomende herinneringen")}
        </h3>
      </div>

      {items.length === 0 ? (
        <p className="tasklist__empty microtype-subtle">
          {t("home.tasks.empty", "Nog geen herinneringen toegevoegd.")}
        </p>
      ) : (
        <ul className="tasklist__list" role="list">
          {items.slice(0, limit).map((it) => (
            <li key={it.id} className="tasklist__item hover-raise">
              <Link to={it.path} className="tasklist__link">
                {/* Nieuwe layout (CSS grid): datum links, categorie rechts, titel bovenaan */}
                <span className="tasklist__name">
                {it.name || t("home.tasks.unnamed", "Naamloos")}
                </span>
                <span className="tasklist__date">{fmtDate(it.when)}</span>
                <span className="tasklist__category">
                  {t(`pages.${it.category}.title`, it.category)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
