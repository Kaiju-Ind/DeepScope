# Owner actions before long implementation

Send this table as soon as known blockers appear. Update it instead of making the owner rediscover requirements across
messages. The plan's `## Owner actions` section is where DeepScope keeps it.

| Need                     | Exact requested action                                                           | Where it applies                       |
| ------------------------ | -------------------------------------------------------------------------------- | -------------------------------------- |
| Licence                  | Choose DeepScope's licence (the vendored utilities are MIT)                       | Before public promotion                |
| Data and asset rights    | Confirm the catalog's upstream and licence, and the American Kestrel font's terms | Before public promotion                |
| Firefox add-on id        | Choose `browser_specific_settings.gecko.id`                                       | Firefox lint and AMO                   |
| Store accounts           | Chrome Web Store listing and API credentials; AMO listing and JWT credentials     | Store jobs in the Release workflow     |
| Apple                    | Apple Developer Program team, bundle id, signing, App Store Connect API key       | Safari distribution                    |
| Repository settings      | Immutable releases, `v*` tag ruleset, environments, required checks, runners      | Release and CI                         |
| ghcr visibility          | Make the package public after the first push                                     | Download verification                  |
| Local Safari automation  | Enable Remote Automation and allow unsigned extensions on the test Mac           | `mise run verify safari`               |

Select rows from the journey; this is not a request to set up everything. Record four facts for each credential
separately: it exists, the operator can retrieve it, the workflow job can use it, and the store accepts it.
[AE02](../../agents/02-ae02-prove-access-and-report-owner-actions-early.md) gives the procedure.
