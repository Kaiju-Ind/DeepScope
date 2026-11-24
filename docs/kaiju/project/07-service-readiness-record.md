# Platform readiness record

Make one record per browser or store, version and identity. The [platform cards](../platforms/README.md) say what to
check. The example is illustrative, not real configuration.

```json
{
	"recordVersion": 1,
	"platform": "firefox",
	"version": "160",
	"context": "event page",
	"build": "commit and .output/firefox-mv3",
	"checks": ["mise run lint:firefox", "mise run verify firefox -- --only active-load,spa,idle-wake"],
	"result": "not checked",
	"checkedAt": null,
	"evidence": [".tmp/verify/firefox.json"],
	"invalidateOn": ["browser-release", "manifest-change", "minimum-version-change", "new-api"],
	"owner": "assigned-owner"
}
```

For a store, record the account and listing by reference, the credential's four states and the last accepted upload.
Do not store page content, credentials or personal data in evidence. Avoid one global "browsers ready" result: each
browser, context and window kind is its own record.
