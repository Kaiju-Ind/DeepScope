# DeepScope project profile

DeepScope is a public browser extension. A user opens a web page, starts or
views a local scan, and reads detected technologies with their evidence. The
same product runs in Chrome, Firefox and Safari through each browser's actual
extension contexts. The product has no hosted service or remote database.

Use the [generic product method](generic.md) with the contracts below. The
organization examples in [the Kaiju profile](kaiju.md) remain available; they
do not select a new runtime or provider for this extension.

| Decision | DeepScope contract and owner |
| --- | --- |
| First useful action | Load the built extension, inspect an HTTP or HTTPS fixture, then read the badge, panel result and supporting evidence. |
| Source and task state | The current branch and full revision, dirty state and the owning plan in `docs/migration/`; frozen sibling branches remain separate. |
| Runtime | WXT, strict TypeScript, Solid, Node and pnpm at the versions in the native manifests and `mise.toml`. |
| Browser contexts | [Platform cards](../platforms/README.md) and the retained `build-extensions` skill. Chrome uses an offscreen worker host; Firefox and Safari use background-page workers. |
| Reusable packages | `packages/dom`, `packages/registry` and `packages/detection` export TypeScript source. Each owns its manifest, imports, tests and check command. |
| Utils | The current public source archive includes the `utils/` closure. Read [the source-build decision](../../adr/01-public-source-builds.md), the published-package guidance and the retained `use-utils` sync instructions before changing it. |
| Tools | Node programs under `tools/*` own manifests and native checks. Mise tasks stay thin and run from the repository root. |
| Preview and delivery | [Extension procedures](../procedures/extensions/README.md), generated browser archives and [release instructions](../../release/README.md). No deployment is needed to prove a local extension journey. |
| Recovery | Preserve the exact native ancestry, unpushed changes and artifact identities. A browser build, test pass, push and hosted CI run are distinct observations. |

The question for a structural change is whether the same scan, cancellation,
recovery and private-window behavior survives through clearer owners. Start
with the existing native tests and a small built-extension fixture. Preserve
failed observations. A source or build pass does not prove store acceptance or
a Safari run on macOS.

Use the [extension project records](../project/extensions/README.md) for concrete
browser, command and release fields. Add the product question, alternatives,
probe, observation, implication and next decision to the owning plan as required
by [A01](../product/01-a01-start-from-the-product-question.md).
