# Content scripts and catalog

**DS-01 Firefox content script busy on huge pages.** *Symptom:* Firefox reported that the content script could not be
found on very large pages (Wikipedia). *Evidence:* the script was alive but its DOM scan made about 430
`Element.matches` calls per element: 9.4 million calls and 17.9 s; the background gave up after 10 s. See
[the plan's real-browser section](../../migration/cross-browser-runtime-plan.md#real-browser-verification-2026-11-23).
*Cause (confirmed):* every registry selector was tested against every element. *Repair:* selectors are routed by the
conditions of their right-most compound (`src/lib/dom/route.ts`): 4,730 calls and 0.41 s on the same page, collection
19.0 s to 0.59 s; a busy-but-alive script is waited for up to 60 s; refused pages report `PERMISSION_DENIED`.
*Prevention:* `src/tests/dom/match.test.ts` proves the routed selector set equals DOM ground truth, with a property test
and an independent audit (0 lost matches). *Open:* later evidence passes still time out at 10 s on huge pages.

**DS-02 Page-controlled keys reached object prototypes.** *Symptom:* a page with `<meta name="constructor">` made the
content observer throw while merging metadata. *Cause (confirmed):* page-chosen names (meta, cookie, header, attribute,
global paths) were keys of ordinary objects, so `constructor` read `Object` and `__proto__` replaced the prototype.
*Repair:* string-keyed runtime maps come from `src/utils/dictionary.ts` (prototype-free records, own-property reads);
the MAIN-world collector builds its own null-prototype record. *Prevention:*
`src/tests/security/page-controlled-keys.test.ts` drives the dangerous names through collection and matching, and a
source guard rejects new `Object.fromEntries` and `{}` string-keyed records in runtime code.

**DS-03 Catastrophic backtracking in catalog regexes.** *Symptom:* a test hung for minutes. *Cause (confirmed):* catalog
patterns with nested unbounded quantifiers, for example `(?:[^"'\s]{0,200}\s*)*`. *Repair so far:* literal prefilters
shield most of them, and the worker pool's per-partition deadline terminates a stuck worker. *Prevention (open):* a
catalog lint for nested unbounded quantifiers (the compiler already reports 186 `unsafe_pattern` warnings) and rewrites
of the offending patterns. See the
[plan's matcher study](../../migration/cross-browser-runtime-plan.md#matcher-performance-study-2026-11-24).
