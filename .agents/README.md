# Agent guidance

Start with [START.md](START.md), then read the selected capability and
[software quality](guides/software-quality.md). The root [AGENTS.md](../AGENTS.md)
owns DeepScope's scope, privacy, release and task boundaries. Inspect current
exports, consumers and fixtures before treating a document as implementation
evidence.

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

## Where this pack comes from

This is the Kaiju skills and guides pack as kept in Kaiju-Ind/Crawl `main` at
`a00f0036d` (identical guidance to `baee4f46a`), adapted to DeepScope: a public
WXT + Solid + TypeScript Manifest V3 extension for Chrome, Firefox and Safari,
with vendored utilities (`@utils/*`), no servers and no database. Open Crawl
pull requests carried no newer guidance, except a Crawl-only handbook section
about packaging built dependencies, which was not taken. The older copies in
the finance application and the Kaiju Industries notes are earlier versions of
the same pack; they hold nothing that this copy lacks and DeepScope needs.

| Change | Skills |
| --- | --- |
| Kept and adapted | accessibility, benchmark-code, build-devtools, build-libraries, build-web, build-web-apps, build-workflows, commit-changes, design-interfaces, explore-ecosystems, plan-changes, prepare-pull-requests, refactor-code, release-software, review-code, shadcn, test-code, use-okikio, verify-behavior, write-docs |
| Renamed | use-kaiju-utils is now use-utils: it covers the vendored `@utils/*` packages and `tools/utils/sync.ts` instead of the private registry |
| Added | build-extensions: Manifest V3 rules learned across Chrome, Firefox and Safari |

Not taken, because DeepScope has no part they govern. Restore one from Crawl
(`git show a00f0036d:.agents/skills/<name>` in Kaiju-Ind/Crawl) if that changes:

| Skill | Why it does not apply |
| --- | --- |
| build-apis | No HTTP service, endpoint or gateway; extension messaging is `build-extensions` |
| build-auth | No accounts, sessions or identity providers |
| build-clis | No published command-line tool; repository scripts are `build-devtools` |
| build-data | No PostgreSQL, ClickHouse or Drizzle; browser stores are `build-workflows` and `use-utils` |
| build-sites | No content site or Astro; fonts and icons in the extension are `build-web` |
| deno-software | No Deno runtime; vendored utilities run under Node and Vitest |
| python-software | No Python |

Within kept skills, reference files about React server rendering, Astro
delivery, Temporal and Effect workflows, CLI stacks, npm/JSR packaging and the
Okikio libraries DeepScope does not use were removed for the same reason.
`guides/cli-guidelines-audit-and-expansion.md` went with `build-clis`.

## Package-shipped skills

Some dependencies ship their own agent skills (for example
`@logtape/logtape/skills/logtape`). Read those from `node_modules` when the
decision is in scope; they are not copied or linked here, so the tracked tree
never points at installed files.

## History and external material

Previous entrypoints, compiled duplicate manuals and obsolete setup recipes belong
in Git. They are not a second set of active instructions. Maintained domain
references and selected technical rule/example files remain with their capability;
source links and license notices retain attribution. Validate version-sensitive
claims against installed dependencies and primary documentation before use.
Do not restore material that DeepScope deliberately removed.

[`tools/lint/guidance.test.ts`](../tools/lint/guidance.test.ts) derives
ownership from the actual files and checks links, routes, playbook back-links,
task prompts and the utility authority. There is no separate skill registry to
synchronize. Structural checks cannot guarantee activation, judgment or
compliance.
