# Overview

These procedures specify actions, evidence and recovery for taking a DeepScope change from intake to a published
release. Bind each operation to a real task (`mise tasks`, `.mise/tasks/`, `package.json` scripts) before running it. A
procedure ID is not a command. For CI or test and build changes, use the
[engineering rules E01–E06](../../engineering/README.md) before claiming a workflow or release check is efficient or
complete.

**Default owner:** one delivery lead. The lead can delegate independent investigation and implementation, but owns
integration, the order of changes and the completion claim. Existing user authorization governs the work. A
documentation or plan request does not authorize a push, a tag, a release or a store submission.

Keep the [active task record](../../agents/00-overview.md) current as decisions, source and evidence change.

Use these result states consistently: **passed**, **failed**, **blocked**, **not checked**, or **not required**. Explain
every result other than passed. A passing test suite, a built archive and a completed journey in a real browser are
different evidence.
