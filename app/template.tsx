/// <reference types="react/canary" />

import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Remounts on every route change so enter/exit view transitions fire.
 * PillNav lives in the layout (outside this template) and stays anchored.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className="flex min-h-full flex-1 flex-col">{children}</div>
    </ViewTransition>
  );
}
