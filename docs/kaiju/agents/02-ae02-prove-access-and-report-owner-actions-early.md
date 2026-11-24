# AE02 Prove access and report owner actions early

Read the agreed repository and platform references before declaring a credential or capability missing. Inspect named
configuration sources and expected secret items within existing authority. An organization-wide vault inventory is not
the default discovery method. Say “not found in these sources” or “this principal cannot retrieve it” when that is what
the evidence establishes.

Keep four credential states separate:

| State                       | Required observation                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------- |
| Exists                      | The owning source identifies the required item. A similarly named item is insufficient. |
| Retrievable                 | The intended principal can obtain the required item through the approved path.          |
| Usable by the job           | The actual job or runtime receives the correct binding, scope and lifetime.             |
| Accepted by the destination | The required minimal operation succeeds against the intended service.                   |

Prove the earliest useful states before expensive work. Some runtime observations require deployment; leave them pending
until that runtime exists. A laptop result does not establish hosted-runner access or store acceptance. Follow the
applicable [platform card](../platforms/README.md).

Report owner actions as soon as known: a licence decision, catalog redistribution rights, a store listing or developer
account, an Apple Developer Program membership, a repository setting (immutable releases, tag rules, environments), or
a named credential reference. State what the action enables and
what work can continue. Do not leave these until final delivery.

Reuse already-granted authorization. If a new action, recipient, destination or scope needs authority, make the proposed
action concrete before asking. If automatic approval review rejects it, identify the action and stated reason. Continue
a permitted narrower path when one exists. A refused login or missing consent is an acceptance limit, not user
misconduct or permission to bypass it.
