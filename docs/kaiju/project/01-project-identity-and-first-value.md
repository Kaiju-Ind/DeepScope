# Project identity and first value

| Field                                       | Project value                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Project/repository                          | Required                                                                                                    |
| Installation mode                           | New instance, existing-instance change or recovery; record observed target state                            |
| Starting branch and full commit SHA         | Required; verify remotely                                                                                   |
| Existing local changes and concurrent work  | Required; preserve ownership                                                                                |
| Guide version                               | Kaiju project playbook 1.2.0; record later updates                                                          |
| Original skills/guides and repository rules | Paths, source identity and relevant owners                                                                  |
| Delivery owner                              | One person or coordinating agent                                                                            |
| Reviewer and intended audience              | Required                                                                                                    |
| First-value journey                         | Ordered user actions with observable results                                                                |
| Required preview capabilities               | Only capabilities needed for that journey                                                                   |
| Deferred capabilities                       | Explicit scope and consequence                                                                              |
| Target placement                            | Kubernetes-only or Bunny plus Kubernetes, with reason                                                       |
| Preview environment identity and URL plan   | Dedicated stack/namespace/data/domain scope                                                                 |
| Production environment identity             | Separate target and credentials                                                                             |
| Existing authorization                      | Task scope and any concrete remaining approval                                                              |
| Configuration authority                     | One reviewed owner for public/encrypted settings; separate decryption credentials                           |
| Publication contract                        | Repository/branch, source tag format, image tag/digest relationship and exact-source gates                  |
| Requirement evidence                        | Source or compatibility result for each new maintained artifact; existing alternative and removal condition |
| Data classification                         | Synthetic preview data; production privacy/access requirements                                              |
| Preview expiry and cleanup owner            | Required before exposing the preview                                                                        |
| Recovery objectives                         | Required production data-loss/time expectations and evidence                                                |

Describe the journey in a way another person can execute. For example: an administrator invites a test staff member; the
recipient sets a password; the staff member signs in and creates a sample job. Replace the example with the actual
product's first useful behavior.
