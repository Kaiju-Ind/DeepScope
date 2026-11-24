# Real-browser verification

Scripts that load the built extension into a real browser. They have no npm
dependencies: `webdriver.mjs` speaks W3C WebDriver over `fetch`.

## Firefox

```sh
mise exec -- pnpm exec wxt build -b firefox
GECKODRIVER="$(mise exec npm:geckodriver@latest -- which geckodriver)" \
  mise exec -- node scripts/verify/firefox.mjs
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
| `--only a,b` | all | scenarios (`scenarios.mjs`): `preinstall`, `active-load`, `background-tab`, `spa`, `real-sites`, `busy-page`, `navigate-mid-scan`, `close-mid-scan`, `idle-wake`, `panel-page`, `reinstall`, `restricted`, `heavy`, `history`, `permission-revoked`, `stress` |
| `--headed` | off | show the browser window |
| `--idle-timeout ms` | 30000 | `extensions.background.idle.timeout` |
| `--stress-rounds n` | 12 | navigations in the `stress` scenario |
| `--out file` | temp dir | JSON results |
| `--extension dir` | `.output/firefox-mv3` | build to install |

`HEAVY_URLS=url,url` overrides the `heavy` pages. `VERIFY_VERBOSE=1` adds the
full event timeline to every result (failures always include it). Scenarios
marked "informational" always pass and record what happened. The exit code is
non-zero when any scenario fails. Real-site scenarios need network access.

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

1. Installs `.output/safari-mv3` through WebDriver.
2. Opens `safari-web-extension://<id>/options.html` as the control page. If
   Safari refuses that navigation (WebKit bug 252112), the driver stops with
   an error that says so.
3. Checks host access before running the scenarios. Safari can withhold
   website access even when the manifest lists `host_permissions`. If this
   check fails, go to Settings > Extensions and set DeepScope to "Always
   Allow on Every Website".

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
