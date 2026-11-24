# Primary sources and their limits

| Source                                                | What it contributes                                                                                                                       |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [ISO/TC 176 terminology, September 2022][iso]         | Process, procedure, and ownership definitions. A dated compilation, not a claim about every current ISO edition.                          |
| [EPA QA/G-6, April 2007][epa]                         | Clear SOPs, independent draft testing, document control, and checklists. Historical guidance, adapted to software work.                   |
| [HSE: Procedures][hse-procedures]                     | User involvement, task analysis, appropriate detail, and limits of procedure-only controls. Industrial guidance, not software regulation. |
| [HSE: Operating procedures][hse-operations]           | Prerequisites, consistent language, revision control, and walkthrough validation. Includes older background references.                   |
| [DORA: Small batches][small-batches]                  | Independently useful changes and faster feedback. Generic duration examples are not Kaiju results.                                        |
| [DORA: Delivery metrics][metrics]                     | Current five-metric model and interpretation pitfalls.                                                                                    |
| [DORA: Value-stream visibility][value-stream]         | End-to-end flow, stage measurements, ownership, and bottlenecks.                                                                          |
| [Google SRE Workbook: Canarying, 2018][canary]        | Automated releases and evaluated, limited rollouts.                                                                                       |
| [Google Cloud: Reliable rollbacks, 2017][rollback]    | Rehearsed rollback and schema compatibility. Does not prove arbitrary upstream migrations are reversible.                                 |
| [Google SRE Workbook: Postmortems, 2018][postmortem]  | Evidence, accountable actions, and recurring-incident analysis.                                                                           |
| [Google SRE Book: Release engineering, 2016][release] | Repeatable builds, artifact identity, and release records. Adapt the principles, not Google's internal tools.                             |
| [OpenAI: AGENTS.md][codex]                            | Current instruction discovery and scope. Does not establish automatic Library access.                                                     |

[iso]: https://committee.iso.org/files/live/sites/tc176sc1/files/Terms%20in%20TC%20176%20Standards%20Alphabetical%20Listing%20V1%202022%2009%2029.pdf
[epa]: https://www.epa.gov/sites/default/files/2015-06/documents/g6-final.pdf
[hse-procedures]: https://www.hse.gov.uk/humanfactors/topics/procedures.htm
[hse-operations]: https://www.hse.gov.uk/comah/sragtech/techmeasoperatio.htm
[small-batches]: https://dora.dev/capabilities/working-in-small-batches/
[metrics]: https://dora.dev/guides/dora-metrics/
[value-stream]: https://dora.dev/capabilities/work-visibility-in-value-stream/
[canary]: https://sre.google/workbook/canarying-releases/
[rollback]: https://cloud.google.com/blog/products/gcp/reliable-releases-and-rollbacks-cre-life-lessons
[postmortem]: https://sre.google/workbook/postmortem-culture/
[release]: https://sre.google/sre-book/release-engineering/
[codex]: https://developers.openai.com/codex/guides/agents-md/
