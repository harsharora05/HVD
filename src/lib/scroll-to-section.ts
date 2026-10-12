/**
 * Scrolls so a section's top edge sits exactly at the top of the viewport (under the
 * fixed header — every section's own top padding clears it).
 *
 * The position is computed in JS rather than relying on CSS scroll-padding / scrollIntoView,
 * which browsers apply inconsistently with zoom, smooth scrolling and late layout changes.
 * After the scroll settles we re-measure and snap to the exact pixel, so no sliver of the
 * previous section is ever left visible.
 */
/**
 * Returns the *visible* element with this id. Next.js keeps recently visited routes mounted
 * but hidden (React <Activity>), so the same id can exist more than once in the document.
 */
export function findSection(id: string) {
  for (const el of document.querySelectorAll<HTMLElement>(`[id="${CSS.escape(id)}"]`)) {
    if (el.getClientRects().length > 0) return el;
  }
  return null;
}

export function scrollToSection(id: string, { smooth = true }: { smooth?: boolean } = {}) {
  const getTarget = () => {
    if (id === "top") return 0;
    const el = findSection(id);
    return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null;
  };

  const target = getTarget();
  if (target === null) return false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = smooth && !reduceMotion ? "smooth" : "instant";
  window.scrollTo({ top: target, behavior });

  let settled = false;
  const settle = () => {
    if (settled) return;
    settled = true;
    window.removeEventListener("scrollend", settle);
    const exact = getTarget();
    if (exact !== null && Math.abs(window.scrollY - exact) > 0.5) {
      window.scrollTo({ top: exact, behavior: "instant" });
    }
  };
  if (behavior === "instant") {
    requestAnimationFrame(settle);
  } else {
    window.addEventListener("scrollend", settle);
    window.setTimeout(settle, 1500); // fallback for browsers without `scrollend`
  }
  return true;
}
