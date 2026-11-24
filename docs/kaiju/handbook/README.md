# Handbook

How a Kaiju project is structured: ownership, placement, procedures and files.

Skills: `plan-changes`, `refactor-code`.

| Part                                                                                                       | What it covers                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Overview](00-overview.md)                                                                                 | A Kaiju project should become useful before deployment work consumes a day.                                                                                 |
| [Start with the user's first useful action](01-start-with-the-users-first-useful-action.md)                | Write the journey before choosing files.                                                                                                                    |
| [Choose ownership and placement separately](02-choose-ownership-and-placement-separately.md)               | Classify each component.                                                                                                                                    |
| [Build on the libraries already maintained](03-build-on-the-libraries-already-maintained.md)               | Search the published Kaiju packages before implementing environment, lifecycle, stream, HTTP, hashing or process mechanics.                                 |
| [Give each maintained file a clear owner](04-give-each-maintained-file-a-clear-owner.md)                   | This is a proposed starting layout, adapted from the audited repositories.                                                                                  |
| [Make the preview path short and complete](05-make-the-preview-path-short-and-complete.md)                 | The following is the **target procedure**, not a claim that automatic preview environments already exist.                                                   |
| [Production promotion preserves identity and data](06-production-promotion-preserves-identity-and-data.md) | Select the candidate the reviewer actually used.                                                                                                            |
| [Measure the two passes without hiding waiting](07-measure-the-two-passes-without-hiding-waiting.md)       | Record the request, prerequisite report, prerequisite readiness, candidate readiness, usable preview, production selection and production acceptance times. |
| [Implement the missing automation in useful increments](08-implement-the-missing-automation-in-useful.md)  | The reviewed repositories supply substantial building blocks.                                                                                               |
| [Maintain the pattern without copying its defects](09-maintain-the-pattern-without-copying-its-defects.md) | Renovate proposes changes.                                                                                                                                  |
