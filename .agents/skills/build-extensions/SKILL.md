---
name: build-extensions
description: Design, implement, review, diagnose or verify Manifest V3 browser-extension work across Chrome, Firefox and Safari with WXT. Use for background models (service worker, event page, background page), where matcher workers and the offscreen document can run, panel surfaces (side panel, sidebar, popup, full page, options), content-script injection and reachability, extension messaging, toolbar badges, storage areas and private tabs, page-controlled data, per-browser manifests, store packaging and reproducible builds.
---

# Build browser extensions

## Reading boundary

Minimum: read this entrypoint and the linked shared software-quality contract.
Read [platform facts](references/platforms.md) before a decision that depends
on what a browser supports. The evidence for every rule below is in
[the cross-browser runtime plan](../../../docs/migration/cross-browser-runtime-plan.md)
and the [failure catalogue](../../../docs/kaiju/failures/README.md); read the
section that a decision touches, not the whole record. Stop when the affected
contexts and browsers are known.

## Shared obligations and companions

Read [software quality](../../guides/software-quality.md) before this
capability's work. Compose with `build-web` for rendering inside a panel
surface, `build-web-apps` for panel state and routes, `build-workflows` for
scan jobs that must survive a background unload, `use-utils` for the vendored
`@utils/*` packages, `verify-behavior` for real-browser checks and
`release-software` for archives and store submissions.

## Decide by capability, not by browser name

Feature-detect the API (`browser.sidePanel?.open`, `'Worker' in globalThis`,
`browser.offscreen`) and choose from what exists. A browser name decides only
manifest fields and build aliases in `wxt.config.ts`. Never infer a capability,
a provider or a store from a framework or a user agent.

## Rules

1. **Background model per browser.** Chrome runs a service worker, Firefox an
   event page (`background.scripts`; no service worker), Safari a
   non-persistent background page (the `build:manifestGenerated` hook in
   `wxt.config.ts` rewrites WXT's service worker). Every one of them can be
   unloaded mid-scan: register listeners synchronously on the first tick, keep
   nothing in module memory that a scan cannot rebuild, and re-collect from the
   live page instead of resuming a lost batch.
2. **Workers only from pages.** A service worker cannot construct a `Worker`.
   Matcher workers run in the offscreen document on Chromium and directly in the
   background page on Firefox and Safari. The executor is chosen by whether the
   background global has `Worker`.
3. **Offscreen documents are Chromium-only.** Request the `offscreen`
   permission only for Chromium targets. The offscreen host owns its own idle
   lifetime; a stale `host-idle` message must not close a busy host.
4. **Panel surfaces.** One Solid application renders every surface. Chromium
   uses the window's side panel; Firefox the sidebar, which opens only when
   `sidebarAction` is called synchronously inside the toolbar click handler,
   before any `await`; Safari declares a popup, so the browser never delivers
   the click; a full page is the fallback and keeps the tab it was opened for.
5. **Content-script reachability.** A missing script, a busy script and a page
   the browser refuses to script are different states
   (`CONTENT_SCRIPT_UNAVAILABLE`, a longer wait for a live but busy script,
   `PERMISSION_DENIED`). Every cross-context call has a timeout and a typed
   failure. Keep content-script work proportional to the page: route DOM
   selectors (`packages/dom/route.ts`) instead of calling `Element.matches` for
   every selector on every element.
   Trace the listener owner as well as the returned promise: a rejected send
   must release that request's subscription without removing concurrent ones.
   [Dependency patch records](../../../patches/README.md) explain the installed
   comctx repair and the remaining distinction between timeout and cancellation.
6. **Page-controlled keys.** Header names, cookie names, global names and other
   page strings never index a plain object. Use `packages/detection/observations/dictionary.ts`
   (prototype-free maps); `src/tests/security/page-controlled-keys.test.ts`
   guards it. A collision with `__proto__` or `constructor` is a security bug.
7. **Badge ordering.** One owner writes the badge from published snapshot
   revisions, ignores revisions older than the last one written for that tab
   and document, clears on cross-document navigation (browsers do too),
   recomputes on same-document navigation (browsers do not clear it), and
   restores open tabs' badges after a background restart. Safari ignores badge
   colours.
8. **Storage areas.** `storage.local` and IndexedDB persist; `storage.session`
   survives a background restart but not the browser session (Firefox has no
   `setAccessLevel`, so never expose it to content scripts by assumption).
   Scheduler control records hold hashed identities, never page content.
9. **Private tabs persist nothing.** Work for an incognito or private tab uses
   memory-only queues and history (`@utils/storage/queue/memory`), writes no
   snapshot or lifecycle record with a URL, and is dropped when the tab closes.
10. **Manifest V3 everywhere.** WXT 0.21 builds Firefox and Safari as Manifest
    V2 unless told otherwise; `wxt.config.ts` sets `manifestVersion: 3` and the
    Mise tasks pass `--mv3`. Firefox needs `browser_specific_settings.gecko`
    (id, `strict_min_version`, `data_collection_permissions`); Safari needs
    `strict_min_version` 18.4 when it relies on `MessageSender.documentId`.
11. **Native standards first.** Use what the minimum browsers ship (Temporal in
    Chrome 144 and Firefox 140, `storage.session`, `world: 'MAIN'` as a string)
    and add a polyfill only for the browser that lacks it (Safari's Temporal),
    by build alias rather than in every bundle.
12. **Reproducible archives.** The same commit must produce byte-identical
    archives for every browser: no timestamps, build-time dates or
    download-order-dependent output (fonts come from pinned npm packages via a
    hand-written `fonts.css`; registry products carry no `generatedAt`).
    Release archives ship with `SHA256SUMS` and provenance attestations.

## Failure review

Watch for: a listener registered after an `await`; module state that a
background unload loses silently; a `new Worker` in a service worker; an
`offscreen` call on Firefox or Safari; an `await` before `sidebarAction` in the
click handler; a cross-context call with no timeout; a plain object keyed by a
page string; a badge written from a stale revision; a private-tab write to
durable storage; a Manifest V2 build; a browser branch where a feature check
would do; and anything that makes two builds of one commit differ.

## Completion gate

A change to extension behaviour is not complete until `mise run check` and
`mise run test` pass, each affected browser builds (`mise run build <browser>`),
`mise run lint:firefox` passes for Firefox changes, and the affected scenario
has been run in the real browser (`mise run verify firefox`, Chrome by hand or
`pnpm validate:chrome-artifact`; Safari needs the one-time settings in
`tools/verify/README.md`). Report each browser as passed, failed, blocked or
not checked; a passing Chrome check says nothing about Firefox or Safari.

## Kaiju projects

In a Kaiju project, the playbook says which procedure this work belongs to and what evidence it needs: [Handbook](../../../docs/kaiju/handbook/README.md), [Procedures](../../../docs/kaiju/procedures/README.md), [Platform readiness](../../../docs/kaiju/platforms/README.md), [Failure catalogue](../../../docs/kaiju/failures/README.md).

## Resource navigation

The [complete resource index](references/resources.md) lists this capability's maintained detail. Use it only to
locate a decision-specific resource; it is not a reading checklist.
