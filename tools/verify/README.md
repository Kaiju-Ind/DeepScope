# Real-browser verification

Scripts that load the built extension into a real browser. They have no npm
dependencies: `webdriver.mjs` speaks W3C WebDriver over `fetch`.

## Firefox

```sh
mise run build firefox
GECKODRIVER="$(mise exec npm:geckodriver@latest -- which geckodriver)" \
  mise exec -- node tools/verify/firefox.mjs
```

The driver starts geckodriver with `--allow-system-access`, installs
`.output/firefox-mv3` as a temporary add-on with a fixed moz-extension UUID,
serves local fixture pages (`fixtures.mjs`: a WordPress/jQuery page, a
Docusaurus SPA page, a page that blocks its main thread 900 ms of every
second), and opens `options.html` in a second window as a control page.
WebDriver refuses to navigate to `moz-extension:` URLs, so extension tabs are
opened from the chrome context. The control page drives tabs with
`browser.tabs.*` and reads results from:

- `browser.storage.local` session snapshots (`rd:session-index:<tab>` and
  `rd:session:*`) for detected technology names;
- `browser.action.getBadgeText({ tabId })`;
- the diagnostics journal (`diagnostics:record:*`), which mirrors background
  and content log events, including timing spans and `dom-scan` stats;
- `ExtensionParent` (chrome context) for the event page state
  (`running`/`stopped`) and `ChromeUtils.requestProcInfo()` for the extension
  process's resident memory.

Options:

| Flag | Default | Meaning |
| --- | --- | --- |
| `--only a,b` | all | scenarios (`scenarios.mjs`): `preinstall`, `active-load`, `background-tab`, `spa`, `real-sites`, `busy-page`, `navigate-mid-scan`, `close-mid-scan`, `idle-wake`, `panel-page`, `reinstall`, `restricted`, `heavy`, `history`, `nav-loop`, `permission-revoked`; `stress` only when named |
| `--headed` | off | show the browser window |
| `--idle-timeout ms` | 30000 | `extensions.background.idle.timeout` |
| `--stress-rounds n` | 12 | navigations in the `nav-loop` scenario |
| `--seed n`, `--minutes m`, `--quick`, `--tabs n`, `--windows n`, `--no-real`, `--no-idle` | see below | the `stress` scenario |
| `--out file` | temp dir | JSON results |
| `--extension dir` | `.output/firefox-mv3` | build to install |

`HEAVY_URLS=url,url` overrides the `heavy` pages. `VERIFY_VERBOSE=1` adds the
full event timeline to every result (failures always include it). Scenarios
marked "informational" always pass and record what happened. The exit code is
non-zero when any scenario fails. Real-site scenarios need network access.

## Stress

```sh
mise run verify firefox -- --only stress --seed 42 --minutes 10
mise run verify firefox -- --only stress --quick --seed 1      # CI-sized, about 3 minutes in all
mise run verify safari -- --stp --only stress --seed 42 --minutes 5
```

`stress.mjs` uses DeepScope like a careless heavy user. A seeded schedule
(`--seed`; the run prints it) opens up to `--tabs` tabs (default 24; 10 with
`--quick`) across `--windows` windows (4; 2), and for `--minutes` (5; 1.5)
switches tabs in bursts faster than scans finish, focuses windows, moves and
reorders tabs, closes tabs (preferring ones mid-scan) and windows, reopens
closed tabs (Firefox session restore), navigates, `location.replace`s, goes
back and forward, reloads in storms, `pushState`s, rewrites whole documents,
duplicates and pins tabs, opens `panel.html?tab=` and the Firefox sidebar, and
uses a private window (Firefox; the add-on is installed with private browsing
allowed). Halfway through (and at 80% in runs over 8 minutes) it leaves the
extension alone until the background unloads, then hammers it again.
`--no-real` keeps it to the local fixtures; `--no-idle` skips the idle wait.

The fixtures each carry one distinct generator (`STRESS_FIXTURES` in
`fixtures.mjs`), so a result naming another page's generator is a result
published for the wrong document. Results go to `--out` as `stress <invariant>`
records plus a `stress summary` with the action log; each failure carries the
seed, time, tab, the tab's last actions and its journal lines.

| Invariant | Checked |
| --- | --- |
| `inv1-current-document-results` | every 5 s, and at the end by visiting each tab: the stored result for the tab's current URL has the fixture's `must` names and no other fixture's marker |
| `inv2-badge` | every 5 s and in a final sweep: a non-blank badge equals the tab's current-URL result count |
| `inv3-closed-tab-cleanup`, `inv3-work-after-close` | no `rd:session*` keys, scheduler work or running matcher jobs for closed tabs; no scan events for a tab 8 s after it closed |
| `inv4-stuck-work`, `inv4-journal-errors` | the IndexedDB `work` store drains within 60 s; no error records; warnings and lost content scripts only right after the harness disturbed that tab |
| `inv5-memory` | Firefox only: extension process memory 20-50 s after activity stops is below 3x (or +400 MiB over) the start and not still growing |
| `inv6-private-not-persisted` | no stored key or value refers to a private tab |

A violation seen while running counts only if the next sample still shows it
and the harness has not touched the tab since.

## Shared scenarios

`scenarios.mjs` holds the parts that work in any browser: the state reader,
the problem filter, the waits, and the scenario matrix. Each driver installs
the build, opens a control page, and passes in hooks for what only its
browser can do: background state, process memory, opening extension tabs,
reinstalling, and restricted pages. The `idle-wake` scenario also counts
background starts in the journal (`matcher-executor-selected`). That count is
how the Safari run sees an unload.

`mise run verify <firefox|safari> [-- options]` runs a driver against an
existing build. Run `mise run build <browser>` first.

## Safari

```sh
mise run build safari
mise run verify safari                  # Safari 26+
mise run verify safari -- --stp         # Safari Technology Preview's own driver
mise run verify safari -- --check-only  # no browser: manifest and packager checks
```

What Safari supports for automated extension tests (checked November 2026):

- On macOS, SafariDriver supports the W3C Web Extensions classic command
  `POST /session/{id}/webextension` from Safari 26. The release notes say
  "Added support for web extensions in WebDriver"; the WebKit changes are
  287737@main, 290244@main and 290723@main.
  - The body is `{"type":"path"|"archivePath","path":...}` or
    `{"type":"base64","value":...}`.
  - The result is the extension id. `DELETE /session/{id}/webextension/{id}`
    unloads it.
  - No capability is needed.
  - The draft spec also names `value` as the key for paths, so the driver
    tries each body shape and records which one worked.
- BiDi `webExtension.install` is not implemented
  (https://bugs.webkit.org/show_bug.cgi?id=288348).
- The other tools don't help:
  - Playwright drives its own WebKit build, not Safari, and cannot load
    extensions.
  - WebdriverIO's `installExtension` skips Safari.
  - WXT only builds for Safari (`wxt build -b safari`). It launches only
    Chrome and Firefox.
- WebKit unloads an idle non-persistent background after 30 s, which is the
  default `--idle-timeout`. Safari doesn't report background state to
  WebDriver, so `idle-wake` waits past the timeout, then checks for a
  background restart.

**One-time owner settings.** Until these are set, both drivers refuse every
session, over HTTP and over BiDi. The script exits with code 2 and prints the
missing step.

1. Safari > Settings > Advanced > "Show features for web developers".
2. Settings > Developer > "Allow remote automation". Alternatively, run
   `safaridriver --enable` once; it asks for an admin password. For Safari
   Technology Preview, turn the setting on in that app, or run
   `"/Applications/Safari Technology Preview.app/Contents/MacOS/safaridriver" --enable`.

Once the settings are on, the driver:

1. Installs a copy of `.output/safari-mv3` through WebDriver. The copy adds
   one background script, `verify-probe-bg.js`, that opens
   `options.html?verify-probe=1` once per session. WebDriver returns Safari's
   composed identifier, not the UUID in `safari-web-extension://` URLs, and
   refuses to navigate to those URLs (WebKit bug 252112), so that tab is how
   the driver finds the UUID and its control page.
2. Records `safari-worker-fetch`: whether a worker can fetch the packaged
   registry shards. Safari lowercases the host in `location.origin`, and a
   fetch under that host fails, so workers must resolve against
   `location.href`.
3. Records host access (informational). Safari Technology Preview reports no
   granted origins for a WebDriver install but still scans. If scans fail, go
   to Settings > Extensions and set DeepScope to "Always Allow on Every
   Website".

Options:

| Flag | Meaning |
| --- | --- |
| `--stp` | use Safari Technology Preview and its own driver |
| `--driver path` | use a different safaridriver binary |
| `--extension dir` | build to install |
| `--base-url safari-web-extension://<uuid>` | use a copy that is already installed instead of installing one |
| `--diagnose` | write safaridriver logs to `~/Library/Logs/com.apple.WebDriver/` |
| `--only`, `--idle-timeout`, `--stress-rounds`, `--out` | same as for Firefox |

The `restricted` scenario uses an App Store page and a PDF. Safari reports no
process memory, so there is no `memory` hook.

**Fallback without WebDriver installs.** `safari-package.sh [out-dir]` wraps
the build in a macOS app (`safari-web-extension-packager`) and builds it with
ad-hoc signing. Then load it one of two ways:

- Open the app once and turn on Develop > "Allow Unsigned Extensions". The
  setting resets whenever Safari quits.
- Or use Settings > Developer > "Add Temporary Extension..." with
  `.output/safari-mv3`. Safari removes it after 24 hours or when it quits.

Either way, finish by enabling DeepScope in Settings > Extensions.
