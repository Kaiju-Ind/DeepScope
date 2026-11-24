# Routing fragment for AGENTS.md

This is an ordinary Markdown fragment. It is not an installable skill, and saving it does not change any agent
configuration.

Copy the documentation pack into `docs/kaiju/`. **Merge the section below into the existing root `AGENTS.md`**,
preserving unrelated instructions and project rules. Do not replace the file wholesale. Resolve any conflicts using the
user's requirements and the current original guides.

After installation, start a new Codex session in the repository and ask it to identify the active instruction sources
and open `docs/kaiju/00-READ-FIRST.md`. Confirm that the files and links exist. A ChatGPT Library save alone does not
make the pack available inside Codex. See
[OpenAI's instruction guidance](https://developers.openai.com/codex/guides/agents-md/) for discovery and scope.

## Section to merge into AGENTS.md

## Kaiju projects and deployment

Use `docs/kaiju/00-READ-FIRST.md` when the user identifies this as a Kaiju project, asks to self-host an application, or
asks for Kubernetes or Bunny deployment. Read the chapters needed for the task. The pack routes work; current repository
instructions, original skills and guides, verified source contracts, and the user's requirements remain authoritative.

Maintain one compact active-task record using `docs/kaiju/agent-execution.md` AE01. Carry the latest user outcome,
accepted decisions, authorization, source identities, known failures, next action and self-contained continuation. After
a context reset, handoff or interruption, use AE07 to reconcile that record with the latest user message, remote source,
local changes, running jobs and actual deployment state. Do not replay historical commands because a checkpoint mentions
them.

Establish the actual repository, branch, remote revision, dirty state, and related work before editing. Preserve
concurrent changes. Check the current upstream and published artifacts rather than assuming an older example still
applies. Read Code History's current authority and lineage records when available; use the repository's recorded
portable evidence when that service is unavailable, and report the precise missing authority. This fallback does not
waive a mandatory original-guide or lineage requirement. Continue independent investigation while the missing source is
obtained.

Classify each component as an **upstream image**, a **published JavaScript package/file**, or **owned source**. Choose
**Kubernetes-only** or **Bunny plus Kubernetes** placement independently. An npm infrastructure package or a Node
command inside an image does not establish a published-application-package integration. Record the supported
customization and upgrade contract. Add only the services the agreed user journey requires.

Before substantial implementation, identify actions that only the user or an administrator can complete. Report exact
package/version publication needs, private-package access, CI generation/build requirements, credentials by reference,
domains, account scopes, and environment readiness. Explain what the action enables and what can continue independently.
Report new blockers immediately. Never expose secret values or leave a known owner action until the end.

Before requesting a missing credential, check the agreed service-specific sources and distinguish existence, retrieval
access, job usability and provider acceptance. Before adding a maintained artifact, prove the requirement and the gap in
the existing platform. Record the cost and ownership of any authorized scope expansion. For external tests, AE04
requires the exact user action, originating runtime, recipient/destination, consent and allowed side effect.

For changes to CI, builds, test runners or package imports, first read `docs/kaiju/engineering-ci.md`. Preserve required
test selection independently of cache admission, test native capabilities before adding wrappers, validate on fresh
runners and representative change scenarios, and report both elapsed time and total runner usage. Keep meaningful
behavior tests tracked; move only disposable investigation artifacts into an ignored workspace. Do not change a
different repository or PR without scoped authorization. Use native test/package discovery and scoped globs rather than
hand-maintained test-file arrays in `package.json`, `deno.json` or Mise tasks. Split broad test files only when
ownership and isolation permit useful independently selected/cacheable units; prove fresh-runner restoration and
per-layer hit/miss results.

Use one root `mise.toml` and thin argument-bearing tasks under `.mise/tasks/`. Let native manifests own their checks.
Reuse pinned shared tooling and published Kaiju Utils at their verified exports before adding generic utilities. Prefer
maintained SDKs and service contracts where they fit; retain native CLIs when they own the required state or lifecycle.
Place project-specific orchestration in `tools/` and infrastructure in its owning program. Do not copy another product's
namespaces, domains, credentials, version pins, or provider assumptions.

Bind each procedure to actual task help, source, arguments, and runtime requirements. Proposed names in the handbook are
not runnable commands. Keep read-only checks distinct from actions that create resources, send email, invoke paid
models, or change data. Use the authorization already granted; do not introduce repeated approval steps. When a
genuinely unauthorized action is needed, first make the proposed result concrete and reviewable.

Define one first-value journey for the preview. An infrastructure plan preview is a proposed diff; a usable preview is a
reachable application where the intended reviewer completes that journey. Verify the required integrations from the
consuming runtime and identity. Record the URL, access method, exact candidate, passed checks, limitations, and cleanup
owner.

Promote the reviewed source/artifact and record environment configuration separately. If build-time changes create a new
artifact, recheck the affected behavior. Inspect actual target state before applying a saved plan. Serialize mutations
sharing deployment state or a database. Plan migration compatibility, backup/restore, partial failure, and recovery; do
not assume an application rollback can safely reverse database changes.

Use bounded subagents for independent work, with exclusive write scopes and one integration owner. Keep a shared plan
and evidence record. Review the combined result and verify the necessary types, tests, builds, runtime behavior, and
user journeys. Mark checks passed, failed, blocked, not checked, or not required. A successful push, health check, or
infrastructure command proves only its own result.

Commit coherent changes and push according to existing authorization. Verify the remote full SHA and CI outcome
separately. Preserve meaningful unpushed work with the current recovery procedure. Record failures in the catalogue with
evidence, cause confidence, repair, and a prevention action. Keep total request-to-preview and preview-to-production
time visible, including waiting and rework.

Close incident remedies across fresh-install defaults, launch audits, examples and recovery paths using AE08. Consult
`docs/kaiju/retrospective-coverage.md` for relevant known classes rather than turning every historical incident into a
mandatory setup step. Keep reported historical outcomes distinct from current live verification.
