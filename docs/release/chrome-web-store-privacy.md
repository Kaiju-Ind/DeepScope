# Chrome Web Store privacy notes

Use this file as the source text for the Chrome Web Store privacy dashboard,
store listing review notes, and the public privacy policy page. Keep this file,
the side-panel copy, and the final built manifest aligned before each release.

## Single purpose

Kaiju Site Scope detects web technologies used by the active website tab and
shows the evidence behind each detection.

## Data handled

Kaiju Site Scope analyzes page signals from the active tab after the user opens
or runs the extension. Depending on the detector rules needed for the current
page, this can include the page URL and hostname, DOM markers, meta tags, script
and resource URLs, selected response/request header data available to the
extension, cookie names, storage key names, JavaScript global names, and short
bounded evidence snippets.

Kaiju Site Scope does not intentionally collect passwords, cookie values,
localStorage values, sessionStorage values, payment details, health information,
precise location, authentication secrets, or personal communications. Because
website pages can contain incidental personal or sensitive text, persisted
evidence values are bounded and redacted before they are stored for side-panel
rendering or replay summaries.

## Storage and retention

Detection results, snapshot records, matcher job state, and replay summaries are
stored in Chrome extension local storage so reopening the side panel can show recent
results without repeating all work immediately. Cached detector records are local
to the user's browser profile. Users can clear stored detector data from the
side panel or remove the extension to delete extension storage.

## Sharing and remote services

Kaiju Site Scope does not send page analysis, detector evidence, browsing
activity, or cached results to a remote server for the first release. Detection
rules and registry files are packaged with the extension. The extension does not
sell user data, use user data for advertising, or transfer user data to third
parties.

## Permission justifications

- `activeTab`: allows the extension to inspect the current tab only after the
  user opens or invokes the extension. Chrome grants this access temporarily for
  the active page, instead of giving the extension persistent access to every
  site.
- `scripting`: injects the packaged content analysis script into the active tab
  after user action so the extension can collect page signals used for
  technology detection.
- `storage`: stores local detection results, redacted replay summaries, and
  cache records so reopening the side panel can show recent results without
  immediately rerunning all analysis.
- `offscreen`: runs local matcher work outside the side panel and background service
  worker so heavier analysis does not block the side panel and remains reliable under
  Manifest V3 service-worker lifecycle behavior. It does not display hidden UI,
  play media, record audio, or communicate with remote code.
- `sidePanel`: keeps the user-initiated analysis UI in Chrome's persistent side
  panel so browser-owned prompts or page focus changes do not dismiss progress and
  results. The panel is enabled per tab after a toolbar action.

## Remote code answer

No. Kaiju Site Scope does not load or execute remotely hosted extension code.
Detector rules, matcher workers, side-panel assets, and registry artifacts are bundled
inside the extension package.

## Dashboard data disclosure summary

Disclose website content/page content because Kaiju Site Scope inspects
page-derived signals to identify technologies. Disclose active-tab browsing
context because analysis is tied to the current visible page URL and hostname.
Do not select data categories that the extension does not intentionally collect,
such as payment information, health information, precise location,
authentication information, or personal communications.

Before submission, verify this summary against the final built artifact and
update it if network sync, diagnostics export, account login, telemetry, or any
remote service is added.
