# Builds

**DS-04 WXT builds Firefox and Safari as Manifest V2 by default.** *Symptom:* `wxt build -b firefox` produced an MV2
manifest. *Cause (confirmed):* WXT 0.21 defaults Firefox and Safari to MV2 unless `wxt.config.ts` sets
`manifestVersion: 3`. *Repair:* every target builds MV3 with its own settings (Firefox add-on id, minimum version and
data-collection declaration; Safari a non-persistent background page so it can create workers; offscreen permission only
for Chromium), and `.mise/tasks/build` and `.mise/tasks/zip` pass `--mv3` explicitly. *Prevention:* always build through
the Mise task; check the emitted manifest; `mise run lint:firefox` fails on MV2-only keys. WXT is a tool, not the
standard: check what it emits.

**DS-05 Fontless made font order, and so the archives, nondeterministic.** *Symptom:* two builds of one commit had
different CSS order, chunk names and checksums, and builds needed the network. *Cause (confirmed):* Fontless downloaded
Space Grotesk and Space Mono from the Fontsource CDN during every build and inserted each family's `@font-face` rules
when its download finished. *Repair:* `src/styles/fonts.css` declares the same 17 faces by hand from exact-pinned
`@fontsource-variable/space-grotesk` and `@fontsource/space-mono` (byte-identical files) and the local American Kestrel
TTF. *Prevention:* `src/tests/architecture/fonts.test.ts` keeps font sources local and pinned; two builds of a commit
must produce the same `SHA256SUMS`.

**DS-06 The build id embedded the build time.** *Symptom:* the Chrome zip hash changed between two builds of the same
commit. *Cause (confirmed):* `wxt.config.ts` put `new Date()` into the build id. *Repair:* the build id is now the
version plus the source commit. *Prevention:* the reproducible-build drill in
[P08](../procedures/08-p08-validate-and-maintain-a-procedure.md). *Note:* `docs/release/README.md#reproducibility`
still describes the old behavior and should be updated by its owner.

**DS-07 jiti took about 19 s to load the catalog.** *Symptom:* a cold build spent most of its time before compiling
anything. *Cause (confirmed):* WXT loads modules through jiti, which transformed the roughly 8,000 catalog files one at a
time: about 19 s cold and 2.6 s warm, while compiling and writing the registry took under a second. *Repair:*
`modules/registry-sources.ts` is bundled once with Rolldown (about 0.6 s) and the module imports that bundle; a cold
Chrome build went from 17.9 s to 8.9 s with byte-identical registry files. *Prevention:* the build log reports load and
compile times; measure the load step before optimizing the compiler.
