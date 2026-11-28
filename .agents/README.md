# Agent guidance

Start with [START.md](START.md), then read the selected capability and
[software quality](guides/software-quality.md). The repository's root AGENTS.md owns
its scope, privacy, database and task boundaries. Inspect current exports, consumers
and fixtures before treating a product document as implementation evidence.

The shared [product method](guides/product/README.md) makes customer questions,
early direct experiments, and reusable progress anchors part of every selected
capability. It is generic across products and runtimes. The complete playbook
retains the `docs/kaiju/` path for installation compatibility; its Kaiju-specific
deployment and package choices apply only through that project's profile.

For Rust, the [Rust guide](guides/rust/README.md) and
[rust-software skill](skills/rust-software/SKILL.md) apply the same product method
to portable behavior, memory ownership, SIMD, FFI, tests and efficient builds.
Every maintained Rust package and binary needs working Wasm behavior on its
declared host; build-only checks and omitted native-only tools do not pass.

## One owner for each rule

Shared obligations live in guides/; shared engineering detail lives in references/.
Skills link those owners rather than distributing copies. The complete .agents
folder is the installation unit: copying one skill directory alone omits shared
guidance. Claude and Codex use the same skill tree.

Each entrypoint states its minimum reading and decision-triggered detail. Comments,
docs, names, imports, formatting, correctness and readability remain duties even
when no separate skill is selected. Read the applicable detail, not every guide.
Use resource indexes as lookup maps. Stop when the affected contract is understood;
a missing required source is a limit to report, not permission to guess.

## History and external material

Previous entrypoints, compiled duplicate manuals and obsolete setup recipes belong
in Git. They are not a second set of active instructions. Maintained domain
references and selected technical rule/example files remain with their capability;
source links and license notices retain attribution. Validate version-sensitive
claims against installed dependencies and primary documentation before use.
Do not restore material that a repository deliberately removed.

A repository can add a structural check that derives ownership from the actual
files and checks metadata, shared routes, missing resources, nested historical
skill entrypoints, symlink escapes and duplicate shared files. There is no
separate skill registry to synchronize. Structural checks cannot guarantee
activation, judgment or compliance.
