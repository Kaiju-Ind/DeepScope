# Service readiness record

Make one record per contract, environment and principal. The example below is intentionally incomplete and is not
production configuration.

```json
{
	"recordVersion": 1,
	"service": "application-objects",
	"environment": "preview-example",
	"consumer": "api",
	"runtimeLocation": "bunny",
	"principalReference": "approved-secret-reference",
	"configurationReference": "reviewed-config-path-and-revision",
	"clientRevision": "exact-lock-or-image-reference",
	"operations": ["upload", "read", "deny-anonymous-read", "delete"],
	"result": "not checked",
	"checkedAt": null,
	"evidence": [],
	"invalidateOn": ["credential-rotation", "endpoint-change", "client-change", "policy-change"],
	"owner": "assigned-owner",
	"cleanup": "disposable-test-object-prefix-only"
}
```

Use a meaningful test-data policy. Do not store sensitive payloads or credentials in evidence. Avoid one global “storage
ready” result when state, database backups, public assets and private uploads have different consumers and permissions.
