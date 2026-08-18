# Chrome Web Store test instructions

Paste this into the optional Chrome Web Store reviewer test-instructions field
when submitting the first public release.

## Reviewer path

1. Install the submitted extension package.
2. Open `https://vercel.com/` in a normal tab and wait for the page to finish loading.
3. Click the Kaiju DeepScope toolbar button.
4. Confirm the side panel opens on **Technologies**, follows the visible tab, and shows or continues the automatically started analysis.
5. Open one technology result and confirm its evidence appears on the technology detail page.
6. Open **Scans** and confirm scan state/replay history is separate from the primary technology list.
7. Open **Diagnostics**, press **Copy report**, and confirm a local report is copied without contacting a remote service.
8. Use **Open full page** and confirm the independent extension Diagnostics page loads.
9. Switch between two already-loaded HTTP/HTTPS tabs while the side panel is pinned and confirm the host and detections follow the active tab.
10. Repeat with `https://wordpress.com/` or `https://shopify.com/` if a second page is useful for verification.
11. Turn **Scan pages automatically** off in Settings, load another normal site, and confirm no background scan starts until the side panel is opened or Refresh is pressed.
12. Re-enable **Scan pages automatically**, then use **Clear detector data** to clear local cached analysis records.
13. Use **Clear diagnostics** and confirm detector results/settings remain available.

## Expected behavior

No account, login, payment, or external service is required. Automatic scanning
is enabled by default for active HTTP/HTTPS pages and can be disabled from
Settings. Manual side-panel analysis remains available. Diagnostics are stored
locally and can be cleared separately. The extension reads
page-derived signals to identify technologies, stores detection state locally for
side-panel reopening and replay summaries, and does not send page analysis or
detection results to a remote server in this release.

## Unsupported pages

Chrome internal pages such as `chrome://extensions`, Chrome Web Store pages, and
other browser-restricted surfaces may show an unsupported-page error. That is
expected because Chrome does not allow ordinary extension content-script analysis
on those pages.
