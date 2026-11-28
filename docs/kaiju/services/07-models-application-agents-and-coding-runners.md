# Models, application agents and coding runners

**Inputs and owner.** Product owners select acceptable models, cost/latency/data policy and tool permissions. Provider
administrators supply scoped keys and account availability. Application owners configure internal agents; execution
owners operate coding runners and workspaces.

**Procedure.**

1. Query the selected account's model catalog and record exact provider/model IDs. Choose protocol, service tier,
   timeout, token budget and permitted data. Recheck prices before making a cost claim; compare the complete task,
   including retries and tool turns.
2. Test the required text, streaming and tool capabilities with a finite authorized probe. Set request/token/time limits
   and record that inference is billed. Do not hide cross-provider fallback, model substitution or background-tier
   behavior.
3. Exercise the **actual consumer**. A Kaiju AI SDK probe does not prove an upstream Mastra agent, OpenCode version or
   custom application uses the same fields/history/tool schema. Configure through the application's supported credential
   API and preserve existing permissions.
4. For coding work, verify the installed runner artifact, claim/heartbeat/progress/result path, workspace persistence
   and cancellation. Test contention, lease loss, interrupted reporting and retry handling before enabling autonomous
   work with external side effects.

Inspect the outgoing request when correctness or cost depends on an SDK option. A TypeScript field does not prove that
supported reasoning limits or structured-output settings reached the provider. Separately verify that client deadlines
and cancellation are enforced by the actual consumer; they need not be provider request fields. For document processing,
use synthetic readable, scanned, large and malformed inputs; state OCR/capability limits. Exercise the compiled worker
and AI-disabled path when they are supported consumers. Coordinate SDK retries with the queue's retry owner and preserve
manual recovery without silent provider substitution.

ItsAPlan's current tools provide `models`, bounded `probe`, credential checks/saves and model assignment. They use
published Kaiju HTTP/lifecycle utilities and AI SDK protocol adapters. Persistent runners use upstream task semantics;
no first-party Kubernetes operator or per-task sandbox is supplied by this repository.
[Actual commands and protocol limits](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/tools/agents/README.md);
[runner lifecycle](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/docs/agents.md).

**Evidence and acceptance.** Record provider/model/protocol, consumer version, bounded request counts, completion/tool
result and cancellation behavior. Keep model output and credentials out of general diagnostic logs. A catalog response
proves account visibility only.

**Repeat and recovery.** First installation proves the intended consumer and task. Each relevant deployment checks
identity and changed AI behavior. Model, tier, SDK, runner, tools, header, credential or workspace-policy changes
invalidate affected proof. On failure, isolate transport, protocol, capability and application permissions. Inspect
prior task/Git/API effects before retrying. Adding a sandbox backend still requires durable claim ownership,
cancellation, stale-result rejection and cleanup; it does not solve those application contracts automatically.
