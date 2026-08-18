# Chrome Web Store release checklist

Use this checklist against the final zip, not only the source tree.

## Manifest and listing

- `manifest.json` is at the zip root.
- `manifest_version` is `3`.
- `name`, `description`, and `action.default_title` all say Kaiju DeepScope.
- `description` has no trailing quote or stale placeholder copy.
- `permissions` contains only `activeTab`, `scripting`, `storage`, `offscreen`,
  `sidePanel`, and `clipboardWrite` for the first release.
- `host_permissions` contains only `http://*/*` and `https://*/*` for automatic normal-page scanning.
- `minimum_chrome_version` is `119` or newer.
- `action` has no `default_popup`; `side_panel.default_path` points to `sidepanel.html`.
- `options_page` or `options_ui` points to the independently built Diagnostics page.

## Privacy and permissions

- The dashboard single-purpose field matches
  `docs/release/chrome-web-store-privacy.md`.
- Permission justifications are copied from
  `docs/release/chrome-web-store-privacy.md`.
- The remote-code answer says detector rules, matcher workers, side-panel assets, and
  registry artifacts, general UI fonts, and diagnostics assets are bundled inside the extension package.
- The data disclosure covers automatic and manual page analysis, page URL/hostname,
  DOM/meta/resource/header-derived signals, cookie names, storage key names,
  JavaScript global names, bounded evidence snippets, and the bounded local diagnostic journal.
- The disclosure explains that Copy report writes only to the local clipboard after a user action and that the extension does not read clipboard contents.
- The disclosure does not claim that the extension avoids page access entirely.

## Final artifact checks

```sh
unzip -q kaiju-deepscope-web-extension-0.1.0-chrome.zip -d /tmp/kaiju-cws
cat /tmp/kaiju-cws/manifest.json
grep -R "new Function\\|eval(" /tmp/kaiju-cws || true
grep -R "https://\\|http://" /tmp/kaiju-cws/*.js /tmp/kaiju-cws/assets /tmp/kaiju-cws/chunks || true
```

Any `new Function` or `eval(` hit in the final artifact needs an explicit review
before submission. For this release, runtime registry loading should not import
Zod or the Zod Mini validator path.
