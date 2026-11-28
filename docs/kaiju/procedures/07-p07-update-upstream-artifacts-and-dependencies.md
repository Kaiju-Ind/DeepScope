# P07 Update upstream artifacts and dependencies

**Trigger:** Renovate change, upstream release, security fix or requested customization. **Outcome:** a verified new
candidate with a clear migration and recovery impact.

1. Identify the actual owner: image, package, generated provider, application source or shared tooling.
2. Compare old and new immutable identities, public contracts and relevant upstream changes.
3. Keep coupled images and protocol dependencies in one reviewed cohort.
4. Integrate real source changes when the repository owns upstream source.
5. Update all consumers, examples, audits, tests and recovery contracts affected by renamed settings or providers.
6. Run affected checks on the actual installed package or final artifact.
7. Deliver a usable preview through P03.
8. Promote only the selected candidate through P04.

Renovate's version proposal is not proof of source integration. OpenATS distinguishes requested and integrated upstream
identities. Its source importer validates upstream tag SHAs and applies a real delta. Preserve proper ancestry where it
exists; do not manufacture a merge base for a historical file import.

Shared-tooling includes and task packs are versioned interfaces. Grafana, Twenty and Core use different pins and include
shapes. Copy the whole compatible contract, not individual lines from incompatible revisions. Scanner exceptions belong
to their reviewed project, exposure and expiry. Do not propagate them as template defaults.

Publication is a separate action. Before a consumer relies on a new package, confirm the intended version is actually
published and downloadable by its CI identity. Before deployment, confirm the exact image exists and can be pulled from
the deployment runtime. Source tags, npm packages, OCI publication and environment deployment have separate evidence.
