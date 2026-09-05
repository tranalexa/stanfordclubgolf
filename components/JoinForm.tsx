"use client";

import { useState, type FormEvent } from "react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const currentYear = new Date().getFullYear();
const classYears = Array.from({ length: 6 }, (_, i) => String(currentYear + i));

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full rounded-md border border-cardinal/15 bg-cream-2 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/20";
const label = "mb-1.5 block text-sm font-medium text-cardinal";

export default function JoinForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!FORMSPREE_ID) {
      setError(
        "The form isn't connected yet. Set NEXT_PUBLIC_FORMSPREE_ID in your environment.",
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { errors?: { message: string }[] }
          | null;
        throw new Error(
          data?.errors?.map((x) => x.message).join(", ") ||
            "Something went wrong. Please try again.",
        );
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-fairway/30 bg-fairway/10 p-6 text-center">
        <p className="font-heading text-xl font-semibold text-fairway">
          You&apos;re on the list.
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          We&apos;ll email you with practice details and how to get on the team
          mailing list.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-cardinal underline underline-offset-4"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="flex flex-col gap-5">
      {/* Honeypot for spam bots (Formspree ignores _gotcha if filled) */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_subject" value="New Stanford Club Golf interest form" />

      <div className="grid gap-5 tablet:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name<span aria-hidden>*</span>
          </label>
          <input id="name" name="name" required placeholder="Jane Smith" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Stanford Email<span aria-hidden>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@stanford.edu"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 650 555 0123"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="year" className={label}>
            Class Year<span aria-hidden>*</span>
          </label>
          <select id="year" name="class_year" required defaultValue="" className={field}>
            <option value="" disabled>
              Select...
            </option>
            {classYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
            <option value="grad">Graduate student</option>
          </select>
        </div>
        <div>
          <label htmlFor="handicap" className={label}>
            Handicap / Skill Level
          </label>
          <select id="handicap" name="skill_level" defaultValue="" className={field}>
            <option value="">Select...</option>
            <option value="beginner">Beginner (new to golf)</option>
            <option value="casual">Casual (break 100 sometimes)</option>
            <option value="intermediate">Intermediate (handicap 10-20)</option>
            <option value="advanced">Advanced (handicap under 10)</option>
            <option value="competitive">Competitive junior / high school player</option>
          </select>
        </div>
        <div>
          <label htmlFor="interest" className={label}>
            Interested in<span aria-hidden>*</span>
          </label>
          <select id="interest" name="interest" required defaultValue="" className={field}>
            <option value="" disabled>
              Select...
            </option>
            <option value="social">Social membership</option>
            <option value="competitive">Competitive team tryouts</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Anything else?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Questions, availability, how you heard about us..."
          className={`${field} resize-y`}
        />
      </div>

      {status === "error" && error && (
        <p role="alert" className="rounded-md bg-cardinal/10 px-3 py-2 text-sm text-cardinal">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-cardinal px-6 py-3 font-heading text-base font-semibold text-white shadow-sm transition hover:bg-cardinal-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Join the Club"}
      </button>

      <p className="text-center text-xs text-ink-muted">
        No dues to submit this form. We&apos;ll follow up with membership details.
      </p>
    </form>
  );
}
