# Chrome Web Store test instructions

Paste this into the optional Chrome Web Store reviewer test-instructions field
when submitting the first public release.

## Reviewer path

1. Install the submitted extension package.
2. Open `https://vercel.com/` in a normal tab.
3. Click the Kaiju Site Scope toolbar button.
4. Confirm the side panel shows active-tab analysis status, technology detections,
   and evidence/replay details for the visible page.
5. Repeat with `https://wordpress.com/` or `https://shopify.com/` if a second
   page is useful for verification.
6. Use the side panel's **Clear stored detector data** button to clear local cached
   analysis records.

## Expected behavior

No account, login, payment, or external service is required. Kaiju Site Scope
runs only after the user opens or invokes the extension for the active tab. The
extension reads page-derived signals to identify technologies, stores detection
state locally for side-panel reopening and replay summaries, and does not send page
analysis or detection results to a remote server in this release.

## Unsupported pages

Chrome internal pages such as `chrome://extensions`, Chrome Web Store pages, and
other browser-restricted surfaces may show an unsupported-page error. That is
expected because Chrome does not allow ordinary extension content-script analysis
on those pages.
