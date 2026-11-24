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
| `--only a,b` | all | scenarios: `preinstall`, `active-load`, `background-tab`, `spa`, `real-sites`, `busy-page`, `navigate-mid-scan`, `close-mid-scan`, `idle-wake`, `panel-page`, `reinstall`, `restricted`, `heavy`, `history`, `permission-revoked`, `stress` |
| `--headed` | off | show the browser window |
| `--idle-timeout ms` | 30000 | `extensions.background.idle.timeout` |
| `--stress-rounds n` | 12 | navigations in the `stress` scenario |
| `--out file` | temp dir | JSON results |
| `--extension dir` | `.output/firefox-mv3` | build to install |

`HEAVY_URLS=url,url` overrides the `heavy` pages. `VERIFY_VERBOSE=1` adds the
full event timeline to every result (failures always include it). Scenarios
marked "informational" always pass and record what happened. The exit code is
non-zero when any scenario fails. Real-site scenarios need network access.

## Safari

`safari-package.sh [out-dir]` wraps `.output/safari-mv3` in a macOS app
(`safari-web-extension-packager`) and builds it ad-hoc signed with
`xcodebuild`. Loading and driving it needs the owner:

1. Safari > Settings > Advanced > "Show features for web developers".
2. Develop > "Allow Remote Automation" (SafariDriver refuses sessions
   otherwise), or `safaridriver --enable`, which asks for an admin password.
3. Develop > "Allow Unsigned Extensions" (resets every time Safari quits).
4. Open the built app once, then enable "DeepScope Extension" in Safari >
   Settings > Extensions and grant it website access.

SafariDriver runs sessions in isolated automation windows. No documented
WebDriver command installs an extension (WebKit's BiDi `webExtension.install`
is tracked in https://bugs.webkit.org/show_bug.cgi?id=288348), so a Safari run
is manual after packaging until that is confirmed.
