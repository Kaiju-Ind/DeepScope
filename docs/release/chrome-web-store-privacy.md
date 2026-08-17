# Chrome Web Store privacy notes

Use this file as the source text for the Chrome Web Store privacy dashboard,
store listing review notes, and the public privacy policy page. Keep this file,
the extension UI, and the final built manifest aligned before each release.

## Single purpose

Kaiju Deepscope detects web technologies used by active website pages and
shows the evidence behind each detection. Automatic scanning can be disabled
from Settings.

## Data handled

Kaiju Deepscope can analyze page signals automatically when an active HTTP or
HTTPS page finishes loading. Automatic scanning is enabled by default and can be
turned off from Settings; users can still start analysis manually.

Depending on the detector rules needed for the current page, analysis can use
the page URL and hostname, DOM markers, meta tags, script and resource URLs,
selected response/request header data available to the extension, cookie names,
storage key names, JavaScript global names, and short bounded evidence snippets.

Kaiju Deepscope does not intentionally collect passwords, cookie values,
localStorage values, sessionStorage values, payment details, health information,
precise location, authentication secrets, or personal communications. Because
website pages can contain incidental personal or sensitive text, persisted
evidence values are bounded and redacted before they are stored for rendering or
replay summaries.

### Local diagnostics

Kaiju also keeps a bounded local support journal so extension failures can be
debugged after an MV3 context disappears. Diagnostic records can include:

- extension version and build identifier;
- extension execution surface and local context-run identifier;
- timestamps, LogTape category, and severity;
- bounded structured lifecycle/timing fields;
- error names, messages, stacks, and causes when available;
- worker filename/line/column when Chrome provides them;
- matcher job IDs, partition progress, and interruption state.

Sensitive-looking scalar values are redacted before diagnostic persistence. The
diagnostic journal does not intentionally store raw page HTML, raw page text,
cookie values, authorization values, request bodies, or general browser storage
contents.

## Storage and retention

Detection results, snapshot records, matcher job state, replay summaries, the
automatic-scan preference, and bounded diagnostic records are stored in Chrome
extension local storage.

The diagnostic journal retains at most 400 recent records and 30 recent context
starts, with a seven-day age limit. Terminal matcher lifecycle history is also
bounded to a maximum of 80 recent records and a seven-day age limit; unfinished
matcher work is retained until it can be completed or reconciled. Users can clear diagnostics separately from
the Diagnostics page without deleting detector snapshots or settings. Users can
clear stored detector data from Settings. Removing the extension removes its
extension-local storage.

## Sharing and remote services

Kaiju Deepscope does not send page analysis, detector evidence, browsing
activity, cached results, or diagnostic reports to a remote server for the first
release. Detection rules and registry files are packaged with the extension.
The extension does not sell user data, use user data for advertising, or
transfer user data to third parties.

The **Copy report** action writes a user-requested diagnostic report to the local
clipboard so the user can paste it into a support conversation or issue. The
extension does not read clipboard contents and does not upload the report.

## Permission justifications

- HTTP/HTTPS host access (`http://*/*`, `https://*/*`): allows the extension to
  start local technology analysis automatically when an active normal web page
  finishes loading. The **Scan pages automatically** setting controls whether
  those automatic starts occur.
- `activeTab`: supports explicit toolbar-driven access for manual analysis and
  user-initiated tab interaction.
- `scripting`: injects the packaged content analysis script and performs bounded
  MAIN-world probes used for technology detection during automatic or manual scans.
- `storage`: stores local detector results, redacted replay summaries, matcher
  lifecycle records, bounded local diagnostics, cache records, and extension
  preferences so results and support evidence survive MV3 context lifetimes.
- `offscreen`: runs local matcher work outside the side panel and background service
  worker so heavier analysis does not block the side panel and remains reliable
  under Manifest V3 service-worker lifecycle behavior. It does not display hidden
  UI, play media, record audio, or communicate with remote code.
- `sidePanel`: hosts one persistent window-scoped analysis UI. A mounted panel
  follows the active tab in its own browser window rather than creating a separate
  panel instance for every tab.
- `clipboardWrite`: writes a diagnostic support report only after the user clicks
  **Copy report**. The extension does not request clipboard-read access.

## Remote code answer

No. Kaiju Deepscope does not load or execute remotely hosted extension code.
Detector rules, matcher workers, side-panel assets, fonts used by the general UI,
and registry artifacts are bundled inside the extension package.

## Dashboard data disclosure summary

Disclose website content/page content because Kaiju Deepscope inspects
page-derived signals to identify technologies. Disclose browsing activity/context
because automatic analysis can start when active HTTP/HTTPS pages load and uses
the current page URL and hostname.

Do not select data categories that the extension does not intentionally collect,
such as payment information, health information, precise location,
authentication information, or personal communications.

Before submission, verify this summary against the final built artifact. Update
it before adding network synchronization, remote diagnostics, account login,
telemetry, or any other remote service.
