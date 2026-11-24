# Browser runtimes

DeepScope supports Chrome 144, Firefox 140 and Safari 18.4 or newer. The browsers differ in where background code runs,
which surfaces exist and which APIs are available. The current facts, checked against MDN browser-compat-data and the
vendors' documentation, are in the
[cross-browser plan](../../migration/cross-browser-runtime-plan.md#platform-facts-that-shape-the-design). Read that
table rather than a copy; it records which items still need a real-browser check.

**Before relying on an API or manifest key:**

1. Check browser-compat-data for each supported browser and the minimum version DeepScope declares.
2. Choose by capability, not browser name (for example: run the matcher pool locally when the background has `Worker`,
   otherwise use the offscreen document).
3. Prefer the native web standard. Add a polyfill only for a browser whose minimum lacks the feature, and only in that
   browser's build.
4. Build every browser (`mise run build chrome`, `firefox`, `safari`) and lint Firefox (`mise run lint:firefox`).
5. Load the build in each affected browser. `mise run verify firefox` drives the shared scenarios in Firefox;
   `mise run verify safari` does the same in Safari once the one-time settings are on (see
   [`tools/verify/README.md`](../../../tools/verify/README.md)). Chrome has no driver yet; check it by hand.

**Evidence.** Browser name and version, build commit, scenario list and result file. A Chrome result does not prove
Firefox or Safari, and a normal window does not prove a private window. **Invalidated by** a new minimum version, a new
API, a manifest change or a browser release that changes the behavior relied on.

The `build-extensions` skill holds the cross-browser rules learned so far.
