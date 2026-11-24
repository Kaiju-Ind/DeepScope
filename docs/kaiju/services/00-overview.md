# Overview

Use these readiness cards during P01 intake and [P02 service checks](../procedures/README.md). Bind each action to the
selected repository's supported command, API or administration control. These are proposed common procedures, not a
claim that one universal Kaiju preflight command already implements them.

A service is ready for a named journey, environment and execution identity. A credential's presence, a provider
dashboard or a successful laptop request is insufficient. Record the test, expected result, observed result,
source/configuration identity, timestamp, owner and non-secret evidence location in the
[project record](../project/README.md). Mark a check passed, failed, blocked, not checked or not required. State what
invalidates a previous pass.

Perform platform setup once, repeat cheap identity and health checks per deployment, and rerun compatibility tests when
relevant inputs change. P03 consumes this evidence for a usable preview. P04 rechecks production access and data safety.
P05 owns recovery, P06 owns cleanup, P07 owns upgrades, and P08 evaluates whether the procedure actually works. No card
authorizes a new production mutation, paid probe or external message by itself; use the authorization already
established for the task.
