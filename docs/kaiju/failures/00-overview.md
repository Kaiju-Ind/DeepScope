# Overview

Use this catalogue to identify the failing contract, preserve the evidence, and choose the smallest repair. It contains
**46 evidence entries: 27 from OpenATS and 19 from ItsAPlan**. These are not 46 production outages. They include
observed failures, source defects, preparation constraints, test failures, recovery events and documentation gaps found
in the inspected history. The review does not claim to cover every past deployment or conversation.

The stable `OA-*` and `IAP-*` identifiers support search, incident notes and future procedure updates. Each entry
records the confidence in its cause separately from its repair status. A source fix, passing CI, a deployed health check
and a completed user journey are different evidence.

Version 1.1.0 adds the [supplied retrospective coverage map](retrospectives/README.md), which addresses 85 original
problem/finding references without renumbering these 46 entries. The sets overlap. The retrospectives add agent
decisions, user confirmations and contextual limits that source history alone did not establish. Use
[AE01–AE08](../agents/README.md) for their recurring execution controls.
