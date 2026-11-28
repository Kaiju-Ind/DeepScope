/**
 * The two values the registry build needs from the source tree.
 *
 * `modules/compile-registry.ts` bundles this file once with Rolldown instead of
 * importing the catalog through jiti. The catalog is about 8,000 TypeScript
 * files; jiti transforms them one at a time, which took about 19 seconds on a
 * fresh machine, while a single Rolldown pass takes about one second.
 */
export { technologies } from "@deepscope/registry";
export { compileTechnologyRegistry } from "@deepscope/detection/compiler";
