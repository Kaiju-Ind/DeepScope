# Model and agent selection record

| Field                     | Value to establish                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Consumer                  | App API, background worker, internal agent, operator probe or external coding runner                        |
| Task                      | Text, structured extraction, tool use, reasoning, streaming or another actual requirement                   |
| Provider/account          | Sail Research, Cheaper Inference or another supported account                                               |
| Model and tier            | Exact account catalog ID and selected tier                                                                  |
| Protocol/adapter          | Responses, Chat Completions or verified provider-native protocol                                            |
| Credential/header support | Exact configuration supported by this consumer                                                              |
| Limits                    | Input/output, total operation deadline, tool steps, concurrency and retries                                 |
| Request evidence          | Actual serialized options/headers and the required schema/tool behavior; no secret payloads in general logs |
| Data handling             | Allowed inputs, retention policy and permitted provider destinations                                        |
| Failure/fallback          | Bounded retry owner; fallback disabled unless explicitly designed and permitted                             |
| Cost evidence             | Timestamped same-model/tier pricing and measured token/request usage                                        |
| Acceptance                | Direct protocol test plus the actual consumer's complete task                                               |

A cheaper advertised token rate does not prove a cheaper successful task. Tool failures, retries, queue time, context
limits and unsupported fields can change the result. Do not route private content to another provider as an automatic
troubleshooting fallback.
