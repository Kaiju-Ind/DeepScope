# Private tooling, packages and runnable artifacts

**Inputs and owner.** The repository maintainer selects the shared-tooling commit, package locks, generator versions and
image identities. Repository/package administrators grant missing access. The publisher owns package or image release.
Capture credential references for each required identity without copying values.

**Procedure.**

1. Inventory the full dependency graph and artifact list. Include transitive private npm packages, generated provider
   SDKs, the shared GitHub tooling revision, base images and runtime images.
2. Test the actual access paths separately: SSH/private Git fetch, private Action use, GitHub API reads, npm download,
   CI image push, and image pull by Kubernetes or Bunny. A shared tooling SSH key does not establish package access.
3. Check that required versions are published. If an export needs publication or a native generator requires controlled
   CI, report the exact package/version or job, required account action and consumer verification to Carl during P01.
   Continue independent work while it is resolved.
4. Perform a frozen installation in the intended runtime. For a generated SDK, verify the generator/provider identity,
   generated artifact and resulting lock before accepting it. Keep bootstrap generation distinct from normal locked CI.
5. Verify image tag, digest, source revision and platform together. Pull the digest using the deployment platform's
   registry identity. Publish only through the authorized publisher, then verify the registry bytes and test the actual
   installed artifact.

Keep a compatibility record for the selected shared-tooling revision, action versus binary versions, native
compiler/checker split, provider/schema and supported local/hosted runtimes. A newer version can be incompatible with
the pinned shared policy. Treat an intentional native-generation review stop differently from a failed build. A local
fixture must honor the host's cache/path rules when local support is promised.

Before selecting or tagging a consumer release, admit its already published dependency images: an absent digest and an
existing digest from the wrong release are separate failures. For a newly built owned image, verify the source, built
artifact and provenance before its authorized publication trigger. After publication and before provisioning,
maintenance or migration, verify registry availability and tested-byte identity for the complete required image set.
Check tag association, index/child relationship, OCI source/version labels and the capability relied on, such as an
externally reachable listener. When CI transfers a tested image, verify artifact inclusion, retention, checksum and
publisher read-back. Files under an ignored or hidden temporary path may need explicit upload inclusion. Record transfer
size and progress; do not rebuild unchanged bytes because a transfer is merely slow. Disabled optional runners do not
make their publication a prerequisite for the baseline app.

GitHub's workflow `packages: read` permission and a package's repository access are separate controls. Grant required
repository access through the package's Actions settings; publishing requires its own write authority.
[GitHub package access](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility).

**Evidence and acceptance.** Retain the exact CI run, lock digest, package cohort, generator receipt and image
digest/platform. A cache hit alone does not prove current download permissions. ItsAPlan's historical errors progressed
from `env` to `streams` to `result`; check the whole locked cohort together. Current source CI succeeds, so these are
prevention examples rather than a current outage. [Failure history](../failures/README.md);
[publication implementation](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/.mise/tasks/release/runner.sh).

**Repeat and recovery.** First installation proves every access path. Each deployment checks selected identities and
artifact availability. Repository moves, token rotation, package ACL changes, new dependencies, generator updates or
platform changes invalidate the relevant proof. On failure, retain the failed identity and status, fix its owner, then
retry the failed check. Never infer that a tag is absent from an authentication error, rewrite an existing release tag,
or replace a missing generated dependency with invented source.
