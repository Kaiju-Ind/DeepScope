# Platform facts

Checked on 2026-11-23 against MDN browser-compat-data and the Chrome, Mozilla and Apple documentation. The
[cross-browser runtime plan](../../../../docs/migration/cross-browser-runtime-plan.md#platform-facts-that-shape-the-design)
is the dated source; update it there first when a fact changes, then this summary. Re-check a fact against
browser-compat-data before relying on it for a new minimum version.

| Capability                          | Chrome (144+)   | Firefox (140+)                       | Safari (18.4+)                                  |
| ----------------------------------- | --------------- | ------------------------------------ | ----------------------------------------------- |
| Background                          | service worker  | event page (`background.scripts`)    | non-persistent background page                  |
| `Worker` from the background        | no              | yes                                  | yes from a page                                 |
| Offscreen documents                 | yes             | no                                   | no                                              |
| Side surface                        | `sidePanel`     | `sidebar_action` (open in the click) | none; popup                                     |
| `action.openPopup()`                | 127             | 109                                  | 16                                              |
| `storage.session`                   | 102             | 115, no `setAccessLevel`             | 16.4                                            |
| `executeScript` `world: 'MAIN'`     | 95              | 128                                  | 15.4 (pass the string, not the enum)            |
| `MessageSender.documentId`          | 106             | 153                                  | 18.4                                            |
| Badge cleared on `pushState`        | no              | no                                   | no                                              |
| Badge colours                       | yes             | yes                                  | no effect                                       |
| Native Temporal                     | 144             | 139                                  | 27.3 (polyfill for older)                       |
| Real-browser driver                 | Chromium or Chrome for Testing + CDP | WebDriver via geckodriver | SafariDriver; classic extension commands from Safari 26 |

The driver row was rechecked on 2026-11-28 against
[WebKit's Safari 26 announcement](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)
and [Chromium's branded-build announcement](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/1-g8EFx2BBY).
Safari's classic WebDriver extension support is separate from BiDi. Official
Chrome-branded builds from 137 do not support the validator's `--load-extension`
switch. Follow the [browser setup guide](../../../../tools/verify/README.md)
and record an actual runtime result separately from platform support.

Unverified: whether a busy `Worker` keeps a Firefox or Safari background alive. Design as if it does not.

## Store and packaging facts

| Store                | Archive                                   | Notes                                                                   |
| -------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| Chrome Web Store     | `mise run zip chrome`                     | uploaded unpublished; a person submits it for review                    |
| addons.mozilla.org   | `mise run zip firefox` plus sources zip   | listed submission with sources; `mise run lint:firefox` first            |
| App Store (Safari)   | Xcode project from `mise run safari-project` | needs an Apple Developer team, a real bundle id and signing           |
| GitHub Releases, ghcr | `mise run release:archives`              | per-browser archives, `SHA256SUMS`, attestations; versions never reused |

See [docs/release/README.md](../../../../docs/release/README.md) and the
[platform readiness cards](../../../../docs/kaiju/platforms/README.md).
