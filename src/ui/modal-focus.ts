
/**
 * Releases focus from content that is about to become inert to assistive technology.
 *
 * Kobalte applies `aria-hidden` to the document background when a modal opens. Newer
 * Chromium builds warn if the trigger is still focused during that same update. The
 * modal immediately takes focus afterwards, but blurring the background trigger first
 * removes the transient invalid state without changing the dialog's focus trap or
 * close-time focus restoration.
 */
export function releaseBackgroundFocus(open: boolean): void {
  if (!open || typeof document === "undefined") return;

  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLElement && activeElement.closest("main")) {
    activeElement.blur();
  }
}