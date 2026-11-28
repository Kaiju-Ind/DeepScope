# Kaiju project profile

Use this profile only for a task whose current instructions select the relevant Kaiju contracts. Apply the
[generic profile](generic.md) and [product method](../product/README.md) first. This profile preserves the original
playbook's organization-specific practices without making them defaults elsewhere.

| Kaiju choice | Authority and applicable rule |
| --- | --- |
| Shared utilities | `Kaiju-Ind/Utils` and its published `@kaiju-ind/*` packages. Read the `use-kaiju-utils` skill, actual exports, source, installed version and consumer tests. A personal repository with a similar name is not this authority. |
| Tooling | Follow the selected repository's pinned shared tooling, one root Mise interface where used, native manifests and current Deno/Node/runtime contracts. The handbook's names and versions are examples until verified. |
| Package access | Verify the intended local, CI and deployed identities separately. Source access does not prove registry access or that an export was published. |
| Application placement | Kubernetes-only and Bunny plus Kubernetes are existing Kaiju patterns. Select them only when the project uses those platform contracts; choose ownership separately from placement. |
| Shared platform | Reuse the actual cluster, KubeBlocks, storage, registry, networking and DNS owners. Application deployment must not recreate or adopt shared platform resources. |
| Provider services | Apply Bunny, Tailscale, Resend, Backblaze B2 and model-provider cards only for services needed by the agreed journey. Check current runtime and account behavior. |
| CI and release | Use verified repository runner labels, task families, source/artifact identities, tag conventions, protected checks and publication destinations. Never copy historical pins or labels without checking them. |
| Durable history | Follow current Code History authority, lineage, recovery and Git-writing rules when required. A saved guide or ZIP alone does not install instructions in Codex. |

The relevant preserved material is in [ownership and placement](../handbook/02-choose-ownership-and-placement-separately.md),
[maintained packages](../handbook/03-build-on-the-libraries-already-maintained.md),
[file ownership](../handbook/04-give-each-maintained-file-a-clear-owner.md), [service cards](../services/README.md),
[deployment procedures](../procedures/README.md), [CI rules](../engineering/README.md), and
[retrospectives](../failures/retrospectives/README.md). ItsAPlan, OpenATS, Core, Grafana and Twenty remain sourced examples.
Their reported observations do not prove the current state of Crawl, Utils or a new project.

For a Crawl retrieval problem, directly test the relevant browser, proxy route and browser configuration before
investing in wider orchestration. Record endpoint, time, observed exit identity, actual browser settings, timing,
retained response information and the effect on the customer result. Check individual factors, then relevant
combinations, and finally the actual API consumer. Proxy type, fingerprint alignment, speed and site access remain
hypotheses until that experiment produces evidence. See the shared
[examples](../../../.agents/guides/product/examples.md); this profile reports no new live Crawl result.
