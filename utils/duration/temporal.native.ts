/**
 * Native Temporal in place of `temporal-polyfill/full/implementation`.
 *
 * `temporal.ts` (vendored) imports the polyfill statically and then prefers
 * `globalThis.Temporal` when the host has one, so on Chrome 144+ and Firefox
 * 139+ the polyfill is bundled but never used. `wxt.config.ts` aliases the
 * polyfill specifier to this file for those browsers, which removes it from
 * their bundles. Safari ships Temporal only from 27.3, so its build keeps the
 * polyfill (its background is a page, where a static import is acceptable).
 *
 * DeepScope's own file, not vendored.
 *
 * @module
 */
import type { Temporal as Implementation } from 'temporal-polyfill/full/implementation';

const native = (globalThis as { readonly Temporal?: typeof Implementation }).Temporal;
if (native === undefined) {
	throw new Error('This DeepScope build expects native Temporal (Chrome 144+, Firefox 139+). Build for Safari to bundle the polyfill.');
}

/** The host's Temporal, typed as the polyfill so `temporal.ts` type-checks unchanged. */
export const Temporal: typeof Implementation = native;
