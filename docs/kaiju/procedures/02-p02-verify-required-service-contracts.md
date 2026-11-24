# P02 Verify required platform contracts

**Trigger:** a new browser API or manifest key, a raised or lowered minimum version, a new store, credential rotation,
or evidence that has expired. **Outcome:** every platform the journey or release needs has current evidence.

**Entry:** the P01 contract and the [platform cards](../platforms/README.md). Use read-only checks first. An upload, a
signing request or a store submission needs authorization for that action.

| Step | Action                                                                  | Expected result                                                                           | If it fails                                                        |
| ---- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 1    | Name the browser, version and extension context for each API used.      | Each check names where it runs: service worker, event page, background page, content script, worker or panel. | A result from another context is not evidence.     |
| 2    | Check browser-compat-data for every supported minimum.                  | Available everywhere, or a capability check and fallback is designed.                      | Raise the minimum only as an owner decision; record it.             |
| 3    | Exercise the smallest real use in a built extension.                    | The API behaves as relied on in each browser.                                             | Keep the first error; mark the item *unverified* in the plan.       |
| 4    | Exercise one refusal case.                                              | Missing permission, revoked site access or an unsupported page fails as designed.          | Fix the error path before relying on the API.                       |
| 5    | For a store or the release channel, check account and credential state. | Each of exists, retrievable, usable by the job and accepted by the store is known.         | Report the missing state as an owner action.                        |
| 6    | Record the evidence and what invalidates it.                            | The plan's facts table or the project record is updated.                                   | Leave the item open; do not round *unverified* up to verified.      |

Credential discovery has four separate results: the credential exists, this operator can retrieve it, the workflow job
can use it, and the store accepts it. An inaccessible value is not an absent value.
[AE02](../agents/02-ae02-prove-access-and-report-owner-actions-early.md) gives the rule.

Reuse a record only while its scope holds. A new browser release, manifest change or new API needs the relevant check
again.

**Exit evidence:** an updated facts table or platform record with required and optional items. **Recovery:** follow the
platform card and update the owner-action report.
