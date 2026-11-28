# Releasing DeepScope

The Release workflow prepares one archive per browser, checksums and build
provenance attestations. It publishes the same files to a GitHub Release and
GitHub Packages (ghcr.io), then runs the store jobs enabled by the owner.

The store checklists in this folder (`chrome-web-store-*.md`) cover listing
content; this page covers building and publishing.

## What a release contains

| Asset | Contents |
| --- | --- |
| `deepscope-<version>-chrome.zip` | Chrome/Chromium MV3 extension (load unpacked or upload to the Chrome Web Store) |
| `deepscope-<version>-firefox.zip` | Firefox MV3 extension |
| `deepscope-<version>-firefox-sources.zip` | source archive WXT produces for the addons.mozilla.org source review |
| `deepscope-<version>-safari.zip` | Safari web extension files (wrap with Xcode; see below) |
| `SHA256SUMS` | SHA-256 of every archive, in `sha256sum -c` format |

The same five files are pushed as one OCI artifact to
`ghcr.io/kaiju-ind/deepscope:<version>`. The native OCI task derives the lowercase
owner from the repository context unless an explicit repository is supplied.

## Cutting a release

1. Update `version` in `apps/extension/package.json`, the single source:
   `apps/extension/wxt.config.ts` reads it for every manifest, and the release
   fails if any built manifest disagrees with it.
2. Optionally add a `## <version>` (or `## [<version>]`) section to
   `CHANGELOG.md`. It becomes the release notes; without it GitHub generates
   notes from merged PRs.
3. Merge to `main`, then tag that commit and push the tag:

   ```sh
   git tag -s v0.2.0 -m "DeepScope 0.2.0"
   git push origin v0.2.0
   ```

To rehearse without publishing, run **Actions → Release → Run workflow** with
`dry-run` checked on any branch. It checks types, runs every test, builds all
three browsers, lints the Firefox build and uploads the archives as a workflow
artifact. It does not attest, create a release or push a package (attestations
are public, permanent Sigstore records). A non-dry manual run must be
dispatched from a tag.

## What the Release workflow does

| Job | Permissions | Does |
| --- | --- | --- |
| `build` | `contents: read` | checks the tag equals `apps/extension/package.json`; cold install (no caches); `mise run check`, `mise run test`, `mise run release:archives`, `mise run lint:firefox`; uploads the archives |
| `attest` | `id-token`, `attestations`, `artifact-metadata: write` | `actions/attest` over every file named in `SHA256SUMS` |
| `github-release` | `contents: write` | `gh release create --draft --verify-tag` with every asset |
| `ghcr` | `packages: write` (+ attestation scopes) | `oras push ghcr.io/kaiju-ind/deepscope:<version>`, then attests the pushed manifest digest with `push-to-registry` |
| `publish` | `contents: write` | publishes the draft, then runs the advisory `gh release verify` check |
| `chrome-web-store`, `firefox-addons`, `app-store-connect` | `contents: read` + environment secrets | optional store steps, off by default |

The workflow's default token has no permissions; each job asks only for what
it uses. Assets are uploaded while the release is a draft because immutable
releases lock assets at publish time.

The local collector stages a complete candidate before replacing an empty or
previously verified collection. Source, archive inputs and unpacked browser
builds cannot be destinations. The [release tool guide](../../tools/release/README.md)
defines allowed paths and recovery when replacement or restoration fails.

**Partial failure.** A draft GitHub release and a pushed OCI artifact are separate
results. The package can already be available before the GitHub release is
published. Preserve the exact source, candidate archives, checksums, OCI digest
and successful target results. Diagnose the failed step and prepare a retry using
those same bytes. A whole-workflow rerun currently rebuilds and can encounter an
existing draft or package; it is not an automatic idempotent retry. Do not delete
published artifacts or reuse a version with different bytes to hide the failure.
Never move a consumed tag; publish a corrected version when the artifact changes.

The current workflow reports a failed release-attestation check as a warning.
That is an unverified result, even when the publication job is green. Read the
actual diagnostic and check the expected attestation, access and repository
settings before calling the release verified.

## Verifying a download

Replace `0.2.0` with the version you downloaded.

```sh
# 1. Checksums: every archive matches SHA256SUMS
sha256sum -c SHA256SUMS --ignore-missing      # macOS: shasum -a 256 -c SHA256SUMS

# 2. Provenance: the archive was built by this repository's Release workflow
gh attestation verify deepscope-0.2.0-chrome.zip \
  --repo Kaiju-Ind/DeepScope \
  --signer-workflow Kaiju-Ind/DeepScope/.github/workflows/release.yml

# 3. Release integrity (once immutable releases are enabled)
gh release verify v0.2.0 --repo Kaiju-Ind/DeepScope
gh release verify-asset v0.2.0 deepscope-0.2.0-chrome.zip \
  --repo Kaiju-Ind/DeepScope

# 4. The same files from GitHub Packages
oras pull ghcr.io/kaiju-ind/deepscope:0.2.0 -o deepscope-0.2.0
(cd deepscope-0.2.0 && sha256sum -c SHA256SUMS)
gh attestation verify oci://ghcr.io/kaiju-ind/deepscope:0.2.0 \
  --repo Kaiju-Ind/DeepScope
```

[`gh attestation verify`](https://cli.github.com/manual/gh_attestation_verify)
checks the artifact's attestation against the requested repository and signer
workflow. [`gh release verify`](https://cli.github.com/manual/gh_release_verify)
checks the release attestation; [`verify-asset`](https://cli.github.com/manual/gh_release_verify-asset)
compares a local asset with that release's attested digest. These are separate
checks from running the extension in a browser.

## Store publishing (optional)

Each store job is disabled until its repository **variable** is `true`, and
reads secrets only from its protected **environment**. Create the environment
under *Settings → Environments*, add yourself as a required reviewer, then add
the secrets. Values come from the store consoles; nothing here supplies them.

| Job | Variable | Environment | Secrets |
| --- | --- | --- | --- |
| `chrome-web-store` | `CWS_UPLOAD=true` | `chrome-web-store` | `CWS_EXTENSION_ID`, `CWS_PUBLISHER_ID`, `CWS_CLIENT_ID`, `CWS_CLIENT_SECRET`, `CWS_REFRESH_TOKEN` |
| `firefox-addons` | `AMO_SUBMIT=true` | `addons-mozilla-org` | `WEB_EXT_API_KEY`, `WEB_EXT_API_SECRET` (AMO JWT issuer and secret) |
| `app-store-connect` | `ASC_PACKAGE=true`, `SAFARI_BUNDLE_ID` | `app-store-connect` | none yet |

- **Chrome Web Store**: uploads the Chrome zip with
  `chrome-webstore-upload-cli` and leaves it unpublished; submit it for review
  in the developer dashboard. The extension listing must exist first.
- **addons.mozilla.org**: `web-ext sign --channel listed` with the sources zip
  attached. Create the listing by hand for the first version. AMO reviewers
  rebuild from the sources zip with the declared Node 26.13.0 and pnpm 12.19.0 using
  `pnpm install --frozen-lockfile && pnpm zip:firefox` (a root script that runs
  `wxt zip -b firefox --mv3` in `apps/extension`, since `.mise/` is not in the
  sources zip). Supply the submitted build's `DEEPSCOPE_SOURCE_COMMIT` as
  described below. The build must reproduce the submitted files. The native
  submission task removes its temporary extraction after unzip or submission
  finishes, including either command's failure.
- **Safari / App Store Connect**: Apple requires a signed app wrapper. The job
  generates the Xcode project with `xcrun safari-web-extension-packager` on
  macOS and uploads it as a workflow artifact; the owner archives, signs and
  uploads it from Xcode. Automating that needs an Apple Developer Program team,
  a distribution certificate and provisioning profiles (as environment
  secrets), and an App Store Connect API key (`ASC_KEY_ID`, `ASC_ISSUER_ID`,
  `ASC_PRIVATE_KEY`); it is not implemented. `SAFARI_BUNDLE_ID` must end in
  `.DeepScope` because the packager derives the extension's id from it.

## Reproducibility

Compare rebuilds for each exact source and target before claiming reproducibility.
The build keeps several inputs explicit:

- The build id is the version plus the first 12 characters of
  `DEEPSCOPE_SOURCE_COMMIT`, otherwise `GITHUB_SHA`, otherwise `local`.
- Registry files carry no build timestamp
  (`apps/extension/src/tests/registry/reproducible-assets.test.ts` builds the catalog twice).
- Fonts come from pinned npm packages, declared by hand in
  `apps/extension/src/styles/fonts.css`, so no CDN download decides their order.
- WXT owns archive generation; compare both the ZIP digest and extracted file
  bytes so container metadata and emitted code differences remain distinguishable.

The release job still exports `SOURCE_DATE_EPOCH` for any tool that honours it.
For an AMO rebuild, unpack the submitted source archive into an empty directory,
use its pinned tools and frozen lockfile, and set `DEEPSCOPE_SOURCE_COMMIT` to the
source revision used for the submitted build. Preserve the corresponding commit
timestamp when `SOURCE_DATE_EPOCH` was part of the build. Run the install and
`pnpm zip:firefox`, then compare the resulting archive and every extracted file
with the submitted candidate. A local build identified as `local` does not by
itself reproduce a CI build identified by a commit. Keep the exact commands,
source/archive digests, tool versions, authentication and network conditions with
the result. The [active migration record](../migration/monorepo-plan.md) identifies
the completed source-rebuild evidence and its limits.

## Owner actions

- [ ] Confirm **immutable releases** in *Settings → General → Releases*, and
      retain a successful release-attestation verification result.
- [ ] Confirm the intended visibility and access for `ghcr.io/kaiju-ind/deepscope`
      in the package settings.
- [ ] Protect `v*` tags with a tag ruleset so only maintainers can create them.
- [ ] Decide on runners: the workflows now use GitHub-hosted `ubuntu-24.04`
      (free for public repositories); see [../ci.md](../ci.md#runners).
- [ ] Update required status checks to the new job names in
      [../ci.md](../ci.md#required-checks-and-branch-settings).
- [ ] Confirm ownership of the configured Firefox add-on id,
      `deepscope@openarsenal.github.io`, before the first signed release.
      It is an existing extension identity, not a repository URL to rename.
- [ ] Fill in the private reporting route in `SECURITY.md`.
- [ ] For store publishing: create the environments, variables and secrets
      listed above.
