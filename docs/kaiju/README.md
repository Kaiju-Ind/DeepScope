# Anchor-based product development playbook

Release 1.4.0. Start with a customer problem, identify the next decision-relevant unknown, and run the smallest credible
experiment that can answer it. Turn the observation into an anchor the team can use, then implement and validate the
product change. The [shared product guide](../../.agents/guides/product/README.md) owns the method; the playbook routes
it through intake, plans, skills, execution, review and handoff.

The default is [generic](profiles/generic.md): any product, organization or runtime. `docs/kaiju/` retains the original
path so existing links continue to work. Choose the [Kaiju profile](profiles/kaiju.md) only when the task or current
repository selects its packages and platform. Historical deployment and CI lessons remain available with their evidence
limits. The repository's verified source, current instructions and user requirements decide what applies.

Each folder's README names the skills that carry out its work, and each named skill links back to the folder. Start with
[Start here](start/README.md). Use the existing task record; the pack does not require a new tracking system.

| Folder | Read it to |
| --- | --- |
| [Start here](start/README.md) | Identify the customer outcome, questions, source and first useful test. |
| [Product method](product/README.md) | Connect research, experiments, concrete plans and team anchors. |
| [Project profiles](profiles/README.md) | Bind the method to a generic project or the opt-in Kaiju platform. |
| [Handbook](handbook/README.md) | Choose ownership, placement and delivery practices for the actual outcome. |
| [Procedures](procedures/README.md) | Apply P01 to P08 when project intake, services or deployment are in scope. |
| [Service readiness](services/README.md) | Verify required service contracts from their real consumers. |
| [Project record](project/README.md) | Keep applicable project, experiment, acceptance and operating evidence. |
| [Agent execution](agents/README.md) | Carry outcome, questions, anchors and authorization through long and resumed tasks. |
| [Engineering and CI](engineering/README.md) | Preserve correct test selection, caching, builds and ownership while measuring improvement. |
| [Rust product engineering](rust/README.md) | Require functioning Wasm operations, explicit memory/FFI ownership and measured performance with complete CI. |
| [Task prompts](tasks/README.md) | Run T01 to T22 with the same product method, skills and observable exit rules. |
| [Failure catalogue](failures/README.md) | Use historical causes, repairs and prevention without assuming a new incident has the same cause. |
| [Service references](references.md) | Find the provider sources behind the service cards and refresh claims before use. |

## DeepScope application

Use [the DeepScope profile](profiles/deepscope.md) to bind this method to the
public browser extension. It keeps the [extension procedures](procedures/extensions/README.md),
[project records](project/extensions/README.md), [browser and store cards](platforms/README.md)
and [DS incident evidence](failures/README.md). Shared service examples do not
add a server, a private registry credential or a deployment to this product.
