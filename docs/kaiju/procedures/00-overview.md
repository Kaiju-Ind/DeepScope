# Overview

These procedures specify actions, evidence and recovery. They are a reusable operating design drawn from Kaiju's
deployed repositories. Bind each operation to the target repository's actual task before execution. A procedure ID is
not a CLI command. For CI or test/build optimization, use the separate
[engineering procedure E01–E06](../engineering/README.md) before claiming a workflow or release check is efficient or
complete.

**Default owner:** one delivery lead. The lead can delegate independent investigation and implementation, but owns
integration, mutation order and the completion claim. Existing user authorization governs the work. A documentation or
plan request does not authorize live deployment.

Keep the [active task record](../agents/00-overview.md) current as user decisions, source and evidence change. Use it to
resume and coordinate these procedures. It is a compact working record, not a second implementation or a new set of
approval gates.

Use these result states consistently: **passed**, **failed**, **blocked**, **not checked**, or **not required**. Explain
every result other than passed. A documented capability, a configured key and a completed user journey are different
evidence.
