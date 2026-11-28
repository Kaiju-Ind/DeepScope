# AE04 Test the exact user action

Use [A01](../product/01-a01-start-from-the-product-question.md) to separate two questions: what can be learned from a
small isolated test now, and what must later be observed in the complete customer journey. Start the smallest credible
test as soon as its result can guide a decision. A native browser or direct public API call may be enough; adding a
queue, harness or deployment must solve a demonstrated testing need.

Keep the mechanism being investigated. Change an individual factor to test its effect, then a small combination when
interaction could matter. Record the control conditions, actual inputs, outcome, timing and retained failure evidence.
Repeat noisy or stateful cases as needed for the claim. An inconclusive comparison can justify a better test; it cannot
establish that the customer problem is solved. Follow the shared
[experiment guide](../../../.agents/guides/product/experiments.md) for causal limits.

Write the acceptance case before diagnosing a user-visible failure: **actor, action, target runtime,
source/configuration, recipient or resource, permitted side effect, expected observation and cleanup**. Obtain any
missing permission for that actual test. A working credential does not authorize a diagnostic message to a different
group.

Start from the failed action and trace its real execution path. For an invitation, distinguish the administrator's
result, account persistence, callback execution, SMTP acceptance, provider event, inbox arrival and link completion. A
generic SMTP probe can isolate transport; it cannot replace the invitation test. Preserve deliberate account-enumeration
protection in public reset responses. Do not reset another person's password, impersonate them or broaden credential
scope to make a test easier.

The OpenATS record describes a local message to the jobs group that did not exercise the failing deployed member
invitation. It later records a successful authorized staff invitation after a transport change, with explicit limits on
what that proved. Those are retrospective observations, not a new live test by this documentation task. See P19 and the
causal examples in the retrospective.

For AI/provider changes, verify that the actual consumer serializes the intended model, endpoint, authentication and
supported provider options into the outbound request. Use the existing test harness or a supported diagnostic and retain
only safe evidence. A configured SDK option, successful generic probe or installed package does not prove that the
application's request uses it. Check required streaming, tools, cancellation and error behavior at that consumer. Paid
calls require the relevant authorization.

If the required actor, session or recipient is unavailable, mark that acceptance case **blocked** and continue
independent checks. Do not substitute a different action and label the original case passed.
