# Chrome Web Store

**Owner actions (one time).** A Chrome Web Store developer account, an existing listing for DeepScope, and OAuth
credentials for the upload API. Store them as secrets of the `chrome-web-store` environment (`CWS_EXTENSION_ID`,
`CWS_PUBLISHER_ID`, `CWS_CLIENT_ID`, `CWS_CLIENT_SECRET`, `CWS_REFRESH_TOKEN`) and set the repository variable
`CWS_UPLOAD=true`. Listing content follows the checklists in [`docs/release/`](../../release/README.md).

**Procedure.** The Release workflow's `chrome-web-store` job runs `mise run release:store-upload chrome <dir> <version>`.
It uploads the Chrome zip and leaves it **unpublished**; a person submits it for review in the developer dashboard.

**Evidence.** The workflow run, the item's upload state and version in the dashboard, and the review result once it
arrives. Upload accepted, submitted for review and published are three states.

**Repeat and recovery.** Each release uploads a new version. The store never accepts a version number twice; a rejected
or broken version is fixed by a new patch release ([P05](../procedures/05-p05-recover-a-failed-deployment.md)).
Credential rotation invalidates the upload check.
