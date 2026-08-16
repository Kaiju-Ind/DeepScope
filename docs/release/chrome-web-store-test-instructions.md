# Chrome Web Store test instructions

Paste this into the optional Chrome Web Store reviewer test-instructions field
when submitting the first public release.

## Reviewer path

1. Install the submitted extension package.
2. Open `https://vercel.com/` in a normal tab and wait for the page to finish loading.
3. Click the Kaiju Site Scope toolbar button.
4. Confirm the side panel immediately shows or continues the automatically started
   analysis, technology detections, and evidence/replay details for the visible page.
5. Repeat with `https://wordpress.com/` or `https://shopify.com/` if a second
   page is useful for verification.
6. Turn **Scan pages automatically** off, load another normal site, and confirm no
   background scan starts until the side panel is opened or Refresh is pressed.
7. Re-enable **Scan pages automatically**, then use **Clear stored detector data**
   to clear local cached analysis records.

## Expected behavior

No account, login, payment, or external service is required. Automatic scanning
is enabled by default for active HTTP/HTTPS pages and can be disabled from the
side panel. Manual side-panel analysis remains available. The extension reads
page-derived signals to identify technologies, stores detection state locally for
side-panel reopening and replay summaries, and does not send page analysis or
detection results to a remote server in this release.

## Unsupported pages

Chrome internal pages such as `chrome://extensions`, Chrome Web Store pages, and
other browser-restricted surfaces may show an unsupported-page error. That is
expected because Chrome does not allow ordinary extension content-script analysis
on those pages.
