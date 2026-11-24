# Measure the two passes without hiding waiting

Record the request, prerequisite report, prerequisite readiness, candidate readiness, usable preview, production
selection and production acceptance times. Preserve the original request timestamp. Split elapsed time into execution,
queueing, owner wait, provider wait and rework.

The two main measures are request-to-usable-preview and candidate-selection-to-production-acceptance. Also show
preview-acceptance-to-production-acceptance, because deliberate review time is part of the user's experience.
Existing-project iteration and first installation are separate cohorts.

The inspected OpenATS deployment [44445446613](https://github.com/Kaiju-Ind/OpenATS/actions/runs/44445446613) took
**26m01s** from workflow creation to the last job's completion. Its image publication/verification job took **15m47s**.
These measurements exclude preceding main CI and editing. ItsAPlan's
[44456800618](https://github.com/Kaiju-Ind/ItsAPlan/actions/runs/44456800618) verification workflow took **171
seconds**. Its separate **127-second** plan run did not produce a usable preview. These are different workloads and
single observations, not comparative benchmarks.

Start with these **proposed operating targets**:

| Measure                                                | Initial target                                                 | How to interpret a miss                                                           |
| ------------------------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| First prerequisite report                              | Within 15 minutes of repository access                         | Report known blockers and open checks; do not wait for perfect knowledge          |
| Repeat small change to usable preview                  | Pipeline portion within 15 minutes                             | Preserve total request time too; inspect the largest build, wait or rework stage  |
| Selected compatible candidate to production acceptance | Within 15 minutes when its required migration/observation fits | Document required longer work explicitly; never remove a check to meet the target |
| First project onboarding                               | Measure separately before setting an SLA                       | Move repeated platform setup into reusable readiness procedures                   |

These are targets to evaluate, not verified guarantees. Current [DORA metrics](https://dora.dev/guides/dora-metrics/)
include change lead time, deployment frequency, failed deployment recovery time, change fail rate and deployment rework
rate. Keep those production measures alongside the Kaiju preview measures. Report sample count and cold/warm conditions
before drawing performance conclusions.
