# Routing fragment for AGENTS.md

This is an ordinary Markdown fragment. It is not an installable skill, and saving it does not change any agent
configuration.

Copy the complete pack, including `.agents/`, while preserving its relative layout. The playbook stays at
`docs/kaiju/`. **Merge the section below into the existing root `AGENTS.md`**,
preserving unrelated instructions and project rules. Do not replace the file wholesale. Resolve any conflicts using the
user's requirements and the current original guides.

After installation, start a new Codex session in the repository and ask it to identify the active instruction sources
and open `docs/kaiju/README.md`. Confirm that the files and links exist. A ChatGPT Library save alone does not
make the pack available inside Codex. See
[OpenAI's instruction guidance](https://developers.openai.com/codex/guides/agents-md/) for discovery and scope.

## Section to merge into AGENTS.md

## Anchor-based product development

Use `docs/kaiju/README.md` for every product task. Before substantial implementation, read
`docs/kaiju/product/01-a01-start-from-the-product-question.md` and `.agents/guides/product/README.md`. Start with the
customer outcome, decision, relevant unknowns, alternatives and smallest useful experiment. Use supplied questions and
existing evidence; ask only about material unresolved intent or constraints. Start a direct native invocation or small
configuration test as soon as research yields a useful lead. Preserve the actual mechanism and avoid unnecessary
scaffolding. For each 60 research minutes, spend at least 10 active minutes preparing, executing and interpreting relevant
experiments. Each cycle requires an executed probe or direct observation; setup alone does not satisfy it. Do not wait
for the hour or pad time, and report a real blocker.

Use `docs/kaiju/profiles/generic.md` by default. Apply `docs/kaiju/profiles/kaiju.md` only when the task or current
repository selects its organization-specific contracts. The directory name does not prescribe a runtime, provider,
private package or deployment. Read the chapters needed for the task. The pack routes work; current repository
instructions, original skills and guides, verified source contracts, and the user's requirements remain authoritative.

Maintain one compact active-task record using `docs/kaiju/agents/01-ae01-maintain-the-active-task-record.md`. Carry
the latest user outcome, questions, options, experiment receipts, anchors, accepted decisions, authorization, source
identities, known failures, full concrete plan, next action and self-contained continuation. An anchor records the exact
observation, time, conditions, scope, product implication and next decision. Keep failed and inconclusive evidence. Do
not present implementation activity or a local probe as proof that the customer journey changed. After a context reset, handoff or interruption, use AE07 to reconcile that record with the latest user message, remote source,
local changes, running jobs and actual deployment state. Do not replay historical commands because a checkpoint mentions
them.

Establish the actual repository, branch, remote revision, dirty state, and related work before editing. Preserve
concurrent changes. Check the current upstream and published artifacts rather than assuming an older example still
applies. Read Code History's current authority and lineage records when available; use the repository's recorded
portable evidence when that service is unavailable, and report the precise missing authority. This fallback does not
waive a mandatory original-guide or lineage requirement. Continue independent investigation while the missing source is
obtained.

When delivery needs it, classify each component's artifact ownership and supported runtime independently from
deployment placement. The Kaiju profile preserves upstream image, published JavaScript package/file and owned-source
examples, with Kubernetes-only or Bunny plus Kubernetes placement. They do not constrain another project. An npm
infrastructure package or a Node command inside an image does not establish a published-application-package integration. Record the supported
customization and upgrade contract. Add only the services the agreed user journey requires.

Before substantial implementation, identify actions that only the user or an administrator can complete. Report exact
package/version publication needs, private-package access, CI generation/build requirements, credentials by reference,
domains, account scopes, and environment readiness. Explain what the action enables and what can continue independently.
Report new blockers immediately. Never expose secret values or leave a known owner action until the end.

Before requesting a missing credential, check the agreed service-specific sources and distinguish existence, retrieval
access, job usability and provider acceptance. Before adding a maintained artifact, prove the requirement and the gap in
the existing platform. Record the cost and ownership of any authorized scope expansion. For external tests, AE04
requires the exact user action, originating runtime, recipient/destination, consent and allowed side effect.

For changes to CI, builds, test runners or package imports, first read `docs/kaiju/engineering/README.md`. Preserve required
test selection independently of cache admission, test native capabilities before adding wrappers, validate on fresh
runners and representative change scenarios, and report both elapsed time and total runner usage. Keep meaningful
behavior tests tracked; move only disposable investigation artifacts into an ignored workspace. Do not change a
different repository or PR without scoped authorization. Use native test/package discovery and scoped globs rather than
hand-maintained test-file arrays in `package.json`, `deno.json` or Mise tasks. Split broad test files only when
ownership and isolation permit useful independently selected/cacheable units; prove fresh-runner restoration and
per-layer hit/miss results.

Use the project's existing runtime, native manifests and task interface. Under the Kaiju profile, use one root
`mise.toml`, thin argument-bearing tasks under `.mise/tasks/`, pinned shared tooling and published Kaiju-Ind/Utils
packages at verified exports. In any project, test an existing native or maintained capability before adding a wrapper.
Prefer maintained SDKs and service contracts where they fit; retain native CLIs when they own the required state or lifecycle.
Place project-specific orchestration in `tools/` and infrastructure in its owning program. Do not copy another product's
namespaces, domains, credentials, version pins, or provider assumptions.

Make plans executable: bind each step to verified files, symbols, public APIs, task help, arguments, runtime and
environment. Include ordered inputs, outputs, dependencies, failure behavior, cleanup and observable exits; add
pseudocode where it resolves logic or state ambiguity. Trace larger architectural defects into a separate issue and
repair them only within scope; never hide a blocking dependency. Bind each procedure to its actual command contract.
Proposed names in the handbook are not runnable commands. Keep read-only checks distinct from actions that create resources, send email, invoke paid
models, or change data. Use the authorization already granted; do not introduce repeated approval steps. When a
genuinely unauthorized action is needed, first make the proposed result concrete and reviewable.

When the requested outcome includes a deployed preview, define one first-value journey for it. An infrastructure plan
preview is a proposed diff; a usable preview is a reachable application where the intended reviewer completes that journey. Verify the required integrations from the
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
`docs/kaiju/failures/retrospectives/README.md` for relevant known classes rather than turning every historical incident into a
mandatory setup step. Keep reported historical outcomes distinct from current live verification.
