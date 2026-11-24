# GitHub Releases and ghcr

Releases follow uBlock Origin's model: one archive per browser on a GitHub Release, plus checksums, with build
provenance attestations and the same files pushed to ghcr.io as one OCI artifact.
[`docs/release/README.md`](../../release/README.md) is the procedure; this card lists what must be ready.

**Owner actions (one time).**

- Enable immutable releases, so published assets cannot change and `gh release verify` passes.
- Protect `v*` tags with a ruleset.
- After the first push, make the ghcr package public (GitHub creates it private).
- Choose runners. Release jobs stay on GitHub-hosted runners so provenance names GitHub's runner.
- Update required status checks to the job names in [`docs/ci.md`](../../ci.md#required-checks-and-branch-settings).

**Per release.** The tag equals the `apps/extension/package.json` version (`mise run release:check-version <tag>`). The `build` job
installs cold with no caches and runs `mise run check`, `mise run test`, `mise run release:archives` and
`mise run lint:firefox`. Later jobs attest every file in `SHA256SUMS`, create a draft release with every asset, push and
attest the OCI artifact, then publish the draft and run `gh release verify`.

**Evidence.** The workflow run, `sha256sum -c SHA256SUMS`, `gh attestation verify` for an archive and for the OCI
artifact, and `gh release verify`. **Recovery.** A failure before publication leaves a draft and maybe a package
version; delete both, fix the cause and re-run for the same tag. Never move a published tag; publish a new patch
version.
