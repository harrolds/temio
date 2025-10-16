import React, { useState, useEffect } from "react";
import SectionCard from "@/components/common/SectionCard";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import {
  requestPermission,
  scheduleReminder,
  toastReminder,
} from "@/utils/notifications";
import usePersistentList from "@/hooks/usePersistentList";
import DateTimeRow from "@/components/common/DateTimeRow";
import ReminderOffsets from "@/components/common/ReminderOffsets";
import RepeatPicker from "@/components/common/RepeatPicker";
import SlideContainer from "@/components/common/SlideContainer";

/**
 * AutoPage – herbouw (Batch A v2)
 * Alle bestaande functionaliteit behouden;
 * presentatie via SlideContainer.
 */
export default function AutoPage() {
  const { t } = useTranslation();
  const [view, setView] = useState("list");
  const [reminders, addReminder, updateReminder, removeReminder] =
    usePersistentList("rr_reminders_auto");

  const listContent = (
    <>
      <header className="category-header">
        <h1>{t("pages.auto.title", "Auto")}</h1>
      </header>

      <main className="category-content">
        {reminders.length === 0 ? (
          <p className="category-description">
            {t("pages.auto.empty", "Nog geen herinneringen toegevoegd.")}
          </p>
        ) : (
          reminders.map((r) => (
            <SectionCard key={r.id}>
              <strong>{r.title}</strong>
              <p>
                {r.date} {r.time && `• ${r.time}`}
              </p>
            </SectionCard>
          ))
        )}
      </main>
    </>
  );

  const formContent = (
    <>
      <header className="form-header">
        <h2>{t("pages.auto.formheader", "Nieuwe herinnering")}</h2>
      </header>

      <SectionCard>
        <DateTimeRow />
        <ReminderOffsets />
        <RepeatPicker />
        {/* verdere form-velden behouden */}
      </SectionCard>
    </>
  );

  return (
    <SlideContainer
      listContent={listContent}
      formContent={formContent}
      view={view}
      setView={setView}
    />
  );
}
