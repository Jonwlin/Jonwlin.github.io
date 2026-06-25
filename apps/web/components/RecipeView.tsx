"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import type { Recipe } from "@/lib/recipes";
import { scaleQuantity, formatQuantity } from "@/lib/quantity";
import { playAlarm } from "@/lib/alarm";
import { CategoryTag } from "@/components/CategoryTag";
import { RECIPE_CATEGORY_COLORS } from "@/lib/recipe-categories";

/* ------------------------------ helpers -------------------------------- */

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    })
    .toLowerCase();
}

function mmss(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Load a boolean[] of length `len` from localStorage; falls back to all-false.
function loadFlags(key: string, len: number): boolean[] {
  if (typeof window === "undefined") return new Array(len).fill(false);
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return new Array(len).fill(false);
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return Array.from({ length: len }, (_, i) => parsed[i] === true);
    }
  } catch {
    /* ignore malformed storage */
  }
  return new Array(len).fill(false);
}

/* --------------------------- step timer -------------------------------- */

function requestNotify() {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission().catch(() => {});
  }
}

function notify(body: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission === "granted") {
    try {
      new Notification("Timer done", { body });
    } catch {
      /* some browsers throw if not from a SW; ignore */
    }
  }
}

function StepTimer({ seconds, label }: { seconds: number; label: string }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const endsAtRef = useRef<number | null>(null);
  const stopAlarmRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (endsAtRef.current == null) return;
      const left = Math.max(
        0,
        Math.round((endsAtRef.current - Date.now()) / 1000),
      );
      setRemaining(left);
      if (left <= 0) {
        setRunning(false);
        setDone(true);
        endsAtRef.current = null;
        stopAlarmRef.current = playAlarm();
        notify(label);
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [running, label]);

  // Stop any sounding alarm if the component unmounts.
  useEffect(() => () => stopAlarmRef.current?.(), []);

  const start = () => {
    if (remaining <= 0) return;
    requestNotify();
    endsAtRef.current = Date.now() + remaining * 1000;
    setDone(false);
    setRunning(true);
  };
  const pause = () => {
    setRunning(false);
    endsAtRef.current = null;
  };
  const reset = () => {
    stopAlarmRef.current?.();
    stopAlarmRef.current = null;
    setRunning(false);
    setDone(false);
    endsAtRef.current = null;
    setRemaining(seconds);
  };

  return (
    <div className="mt-2 inline-flex items-center gap-2 rounded-[3px] border border-line bg-surface px-2 py-1">
      <span
        className={
          "tabular-nums text-[0.8rem] font-semibold " +
          (done ? "text-focus" : "text-ink")
        }
        aria-live="polite"
      >
        {mmss(remaining)}
      </span>
      {!running ? (
        <button
          type="button"
          onClick={start}
          className="rounded-[3px] border border-divider px-2 py-0.5 text-[0.7rem] font-medium text-secondary hover:border-ink hover:text-ink"
        >
          {remaining === seconds ? "start" : "resume"}
        </button>
      ) : (
        <button
          type="button"
          onClick={pause}
          className="rounded-[3px] border border-divider px-2 py-0.5 text-[0.7rem] font-medium text-secondary hover:border-ink hover:text-ink"
        >
          pause
        </button>
      )}
      <button
        type="button"
        onClick={reset}
        className="rounded-[3px] px-1.5 py-0.5 text-[0.7rem] font-medium text-muted hover:text-ink"
      >
        reset
      </button>
      {done ? <span className="text-[0.7rem] text-focus">done!</span> : null}
    </div>
  );
}

/* ----------------------------- main view ------------------------------- */

export default function RecipeView({
  recipe,
  children,
}: {
  recipe: Recipe;
  children?: ReactNode;
}) {
  const [servings, setServings] = useState(recipe.servings);
  const [ingChecked, setIngChecked] = useState<boolean[]>(() =>
    new Array(recipe.ingredients.length).fill(false),
  );
  const [stepChecked, setStepChecked] = useState<boolean[]>(() =>
    new Array(recipe.instructions.length).fill(false),
  );
  const [hydrated, setHydrated] = useState(false);

  const ingKey = `recipe:${recipe.slug}:ingredients`;
  const stepKey = `recipe:${recipe.slug}:steps`;

  // Load persisted check state once on mount.
  useEffect(() => {
    setIngChecked(loadFlags(ingKey, recipe.ingredients.length));
    setStepChecked(loadFlags(stepKey, recipe.instructions.length));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on change (only after the initial load, to avoid clobbering).
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(ingKey, JSON.stringify(ingChecked));
  }, [ingChecked, hydrated, ingKey]);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(stepKey, JSON.stringify(stepChecked));
  }, [stepChecked, hydrated, stepKey]);

  const toggleIng = (i: number) =>
    setIngChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const toggleStep = (i: number) =>
    setStepChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const resetIng = () =>
    setIngChecked(new Array(recipe.ingredients.length).fill(false));

  const lastUpdated = recipe.revisions[0]?.date || recipe.date;

  return (
    <div className="mt-8">
      {/* Header */}
      <header>
        <div className="flex items-center gap-3">
          <CategoryTag
            category={recipe.category}
            colors={RECIPE_CATEGORY_COLORS}
          />
          <time className="text-[0.7rem] text-muted" dateTime={lastUpdated}>
            updated {formatDate(lastUpdated)}
          </time>
        </div>

        <h1 className="mt-3 text-[1.4rem] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">
          {recipe.title}
        </h1>

        {recipe.description ? (
          <p className="mt-2 text-[0.85rem] leading-[1.5] text-secondary">
            {recipe.description}
          </p>
        ) : null}

        {/* Meta line */}
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.72rem] text-muted">
          {recipe.prepTime ? <span>prep: {recipe.prepTime}</span> : null}
          {recipe.cookTime ? <span>cook: {recipe.cookTime}</span> : null}
          <span>base recipe: {recipe.servings} servings</span>
        </div>

        {recipe.tags.length > 0 ? (
          <div className="mt-3 text-[0.7rem] font-medium text-muted">
            {recipe.tags.map((tag) => (
              <span key={tag} className="mr-3">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {recipe.heroImage ? (
        // Plain <img>: static export, no next/image. basePath is "" so the
        // /public path resolves directly.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={recipe.heroImage}
          alt={recipe.title}
          className="mt-6 w-full rounded-[4px] border border-line object-cover"
        />
      ) : null}

      {/* Intro / notes (MDX) */}
      {children ? <div className="mt-8">{children}</div> : null}

      {/* Ingredients */}
      {recipe.ingredients.length > 0 ? (
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <h2 className="text-[0.95rem] font-semibold text-ink">ingredients</h2>

            {/* Serving-size adjuster */}
            <div className="flex items-center gap-2">
              <span className="text-[0.7rem] text-muted">servings</span>
              <div className="flex items-center rounded-[3px] border border-line bg-surface">
                <button
                  type="button"
                  aria-label="decrease servings"
                  onClick={() => setServings((s) => Math.max(1, s - 1))}
                  className="px-2.5 py-1 text-[0.85rem] text-secondary hover:text-ink"
                >
                  −
                </button>
                <span className="min-w-[2ch] px-1 text-center text-[0.8rem] font-semibold tabular-nums text-ink">
                  {servings}
                </span>
                <button
                  type="button"
                  aria-label="increase servings"
                  onClick={() => setServings((s) => s + 1)}
                  className="px-2.5 py-1 text-[0.85rem] text-secondary hover:text-ink"
                >
                  +
                </button>
              </div>
              {servings !== recipe.servings ? (
                <button
                  type="button"
                  onClick={() => setServings(recipe.servings)}
                  className="text-[0.7rem] text-muted hover:text-ink"
                >
                  reset
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            {recipe.ingredients.map((ing, i) => {
              const prev = recipe.ingredients[i - 1];
              const showGroup = ing.group && ing.group !== prev?.group;
              const scaled =
                ing.quantity !== undefined
                  ? formatQuantity(
                      scaleQuantity(ing.quantity, recipe.servings, servings),
                    )
                  : "";
              return (
                <Fragment key={i}>
                  {showGroup ? (
                    <p className="pt-3 text-[0.72rem] font-semibold uppercase tracking-[0.04em] text-muted">
                      {ing.group}
                    </p>
                  ) : null}
                  <label className="flex cursor-pointer items-baseline gap-2.5 text-[0.8rem]">
                    <input
                      type="checkbox"
                      checked={ingChecked[i] ?? false}
                      onChange={() => toggleIng(i)}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-focus"
                    />
                    <span
                      className={
                        ingChecked[i]
                          ? "text-muted line-through"
                          : "text-body"
                      }
                    >
                      {scaled ? (
                        <span className="font-semibold text-ink">
                          {scaled}
                          {ing.unit ? ` ${ing.unit}` : ""}{" "}
                        </span>
                      ) : null}
                      {ing.name}
                      {ing.note ? (
                        <span className="text-muted"> — {ing.note}</span>
                      ) : null}
                    </span>
                  </label>
                </Fragment>
              );
            })}
          </div>

          {ingChecked.some(Boolean) ? (
            <button
              type="button"
              onClick={resetIng}
              className="mt-3 text-[0.7rem] text-muted hover:text-ink"
            >
              uncheck all
            </button>
          ) : null}
        </section>
      ) : null}

      {/* Instructions */}
      {recipe.instructions.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-[0.95rem] font-semibold text-ink">instructions</h2>
          <ol className="mt-4 space-y-5">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-3">
                <input
                  type="checkbox"
                  aria-label={`mark step ${i + 1} done`}
                  checked={stepChecked[i] ?? false}
                  onChange={() => toggleStep(i)}
                  className="mt-1 h-3.5 w-3.5 shrink-0 accent-focus"
                />
                <div className="flex-1">
                  <div className="flex gap-2 text-[0.82rem] leading-[1.6]">
                    <span className="font-semibold text-muted">{i + 1}.</span>
                    <span
                      className={
                        stepChecked[i] ? "text-muted line-through" : "text-body"
                      }
                    >
                      {step.text}
                    </span>
                  </div>
                  {step.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={step.image}
                      alt={`step ${i + 1}`}
                      className="mt-2 w-full max-w-[360px] rounded-[4px] border border-line object-cover"
                    />
                  ) : null}
                  {step.durationSeconds && step.durationSeconds > 0 ? (
                    <StepTimer
                      seconds={step.durationSeconds}
                      label={`Step ${i + 1}: ${step.text}`}
                    />
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* Revision history */}
      {recipe.revisions.length > 0 ? (
        <section className="mt-12 border-t border-line pt-6">
          <h2 className="text-[0.85rem] font-semibold text-ink">
            revision history
          </h2>
          <ul className="mt-3 space-y-3">
            {recipe.revisions.map((rev, i) => (
              <li key={i} className="text-[0.75rem] leading-[1.55]">
                <time className="font-semibold text-secondary" dateTime={rev.date}>
                  {formatDate(rev.date)}
                </time>
                <span className="text-body"> — {rev.summary}</span>
                {rev.why ? (
                  <span className="text-muted"> ({rev.why})</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
