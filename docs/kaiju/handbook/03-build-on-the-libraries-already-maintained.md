# Build on the libraries already maintained

Search the project's maintained dependencies and installed native capabilities before implementing shared mechanics.
Inspect the actual export map or public API, installed version, source and tests. Test the specific claim with a direct
call before adding a wrapper. A remembered package name is not an API contract.

Under the [Kaiju profile](../profiles/kaiju.md), inspect the published Kaiju-Ind/Utils packages first for environment,
lifecycle, stream, HTTP, hashing or process mechanics. Outside that profile, this table is a sourced example rather than
a private-package requirement.

| Need                                 | Inspected ItsAPlan owner                     | What remains project-specific                                             |
| ------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------- |
| Environment discovery and validation | `@kaiju-ind/env`                           | Required keys and safe diagnostics at the command's composition root      |
| Deadline, cancellation and disposal  | `@kaiju-ind/context`                       | Operation budget, ownership transfers and recovery policy                 |
| HTTP and bounded response handling   | `@kaiju-ind/http` and `@kaiju-ind/streams` | Expected origin, status, response limit, retry policy and provider schema |
| Evidence digests                     | `@kaiju-ind/hash/digest`                   | Which inputs define a candidate or saved plan                             |
| Subprocess lifecycle                 | `@kaiju-ind/worker/process`                | A narrow runtime adapter where the published package lacks that host      |
| Model protocols                      | AI SDK plus the matching provider package  | Model/provider choice, data policy, tool permissions and spending limits  |
| Bunny control-plane protocol         | Official `@bunny.net/openapi-client`       | Resource identity and field ownership that Pulumi does not express        |
| CLI grammar and logs                 | Optique and LogTape                        | Public operations, stable results, error categories and redaction policy  |

The current
[Deno manifest](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/deno.jsonc) and
[operator code](https://github.com/Kaiju-Ind/ItsAPlan/tree/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/tools) establish
this mapping. For new progress interfaces, inspect the published observable/state contracts before inventing another
event bus. Observations and logs do not replace authoritative task state or recovery records.

The AI SDK integration here owns finite operator probes. ItsAPlan's upstream application, persistent runner and OpenCode
retain their own model and execution contracts. A passing probe does not establish that those consumers use the same
protocol correctly.

Use SDKs when they own a protocol correctly. Keep a native CLI when its saved-plan, authentication, plugin or backend
semantics are required. ItsAPlan still uses native Pulumi and `kubectl`; the lost Kubernetes SDK draft was never a
completed cutover. Avoid replacing a small proven CLI call with a large custom framework just to make every line
TypeScript.

When OpenAPI generation fills a real missing SDK, record the spec revision, generation tool, generated package owner and
consumer test. Discover publication requirements before the consumer depends on unpublished exports. Never fabricate
generated code or a lockfile to make a restricted workstation appear supported.
