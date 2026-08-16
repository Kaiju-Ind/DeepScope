# Chrome Web Store release checklist

Use this checklist against the final zip, not only the source tree.

## Manifest and listing

- `manifest.json` is at the zip root.
- `manifest_version` is `3`.
- `name`, `description`, and `action.default_title` all say Kaiju Site Scope.
- `description` has no trailing quote or stale placeholder copy.
- `permissions` contains only `activeTab`, `scripting`, `storage`, `offscreen`,
  and `sidePanel` for the first release.
- `host_permissions` contains only `http://*/*` and `https://*/*` for automatic normal-page scanning.
- `minimum_chrome_version` is `116` or newer.
- `action` has no `default_popup`; `side_panel.default_path` points to `sidepanel.html`.

## Privacy and permissions

- The dashboard single-purpose field matches
  `docs/release/chrome-web-store-privacy.md`.
- Permission justifications are copied from
  `docs/release/chrome-web-store-privacy.md`.
- The remote-code answer says detector rules, matcher workers, side-panel assets, and
  registry artifacts are bundled inside the extension package.
- The data disclosure covers automatic and manual page analysis, page URL/hostname,
  DOM/meta/resource/header-derived signals, cookie names, storage key names,
  JavaScript global names, and bounded evidence snippets.
- The disclosure does not claim that the extension avoids page access entirely.

## Final artifact checks

```sh
unzip -q kaiju-site-scope-web-extension-0.1.0-chrome.zip -d /tmp/kaiju-cws
cat /tmp/kaiju-cws/manifest.json
grep -R "new Function\\|eval(" /tmp/kaiju-cws || true
grep -R "https://\\|http://" /tmp/kaiju-cws/*.js /tmp/kaiju-cws/assets /tmp/kaiju-cws/chunks || true
```

Any `new Function` or `eval(` hit in the final artifact needs an explicit review
before submission. For this release, runtime registry loading should not import
Zod or the Zod Mini validator path.
