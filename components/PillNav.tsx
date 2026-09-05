"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { CloseIcon, GolfFlagIcon, MenuIcon } from "./Icons";
import SocialLinks from "./SocialLinks";

/**
 * Floating red pill in the top-left corner (hamburger + golf flag), present on
 * every page. Opens a full-screen drawer with the site navigation.
 */
export default function PillNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  // Lock scroll + close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="fixed left-6 top-6 z-50 tablet:left-8 tablet:top-8 desktop:left-9 desktop:top-9">
        <div className="flex flex-col items-center gap-2 rounded-xl bg-cardinal-dark p-1.5 shadow-lg shadow-black/25 ring-1 ring-white/10">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-drawer"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/70 text-white transition hover:bg-white/10"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
          <Link
            href="/"
            onClick={close}
            aria-label={`${site.name} home`}
            className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-white/10"
          >
            <GolfFlagIcon />
          </Link>
        </div>
      </div>

      <div
        id="site-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-cream transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-3xl flex-col justify-between px-8 pb-10 pt-28 tablet:px-12">
          <nav>
            <ul className="flex flex-col gap-1">
              {site.nav.map((item, i) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li
                    key={item.href}
                    style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
                    className={`transition-all duration-400 ${
                      open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className={`group flex items-baseline gap-4 py-1 font-display text-[2.6rem] leading-none text-cardinal tablet:text-[3.6rem] ${
                        active ? "" : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      <span className="font-sans text-sm font-semibold text-cardinal/80 tabular-nums">
                        0{i + 1}
                      </span>
                      <span
                        className={`transition-transform group-hover:translate-x-1 ${
                          active ? "underline decoration-cardinal decoration-4 underline-offset-8" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-4 border-t border-cardinal/30 pt-6 tablet:flex-row tablet:items-center tablet:justify-between">
            <div className="text-sm text-ink-muted">
              <p className="font-heading text-base font-semibold text-cardinal">
                {site.name}
              </p>
              <a href={`mailto:${site.email}`} className="hover:text-cardinal">
                {site.email}
              </a>
            </div>
            <SocialLinks />
          </div>
        </div>
      </div>
    </>
  );
}
