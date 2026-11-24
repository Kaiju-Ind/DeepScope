# Releasing DeepScope

Releases follow the uBlock Origin model: one archive per browser attached to a
GitHub Release, plus checksums. DeepScope adds build provenance attestations
and a copy of the same files on GitHub Packages (ghcr.io).

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
`ghcr.io/openarsenal/deepscope:<version>`.

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
| `build` | `contents: read` | checks the tag equals `package.json`; cold install (no caches); `mise run check`, `mise run test`, `mise run release:archives`, `mise run lint:firefox`; uploads the archives |
| `attest` | `id-token`, `attestations`, `artifact-metadata: write` | `actions/attest` over every file named in `SHA256SUMS` |
| `github-release` | `contents: write` | `gh release create --draft --verify-tag` with every asset |
| `ghcr` | `packages: write` (+ attestation scopes) | `oras push ghcr.io/openarsenal/deepscope:<version>`, then attests the pushed manifest digest with `push-to-registry` |
| `publish` | `contents: write` | publishes the draft, then runs `gh release verify` |
| `chrome-web-store`, `firefox-addons`, `app-store-connect` | `contents: read` + environment secrets | optional store steps, off by default |

The workflow's default token has no permissions; each job asks only for what
it uses. Assets are uploaded while the release is a draft because immutable
releases lock assets at publish time.

**Partial failure.** Anything that fails before `publish` leaves a draft
release (and possibly a ghcr tag) that nobody can download from the Releases
page. Delete the draft (`gh release delete v<version>`) and the package
version if one was pushed, fix the cause, and re-run the workflow for the same
tag. Never move a published tag; publish a new patch version instead.

## Verifying a download

Replace `0.2.0` with the version you downloaded.

```sh
# 1. Checksums: every archive matches SHA256SUMS
sha256sum -c SHA256SUMS --ignore-missing      # macOS: shasum -a 256 -c SHA256SUMS

# 2. Provenance: the archive was built by this repository's Release workflow
gh attestation verify deepscope-0.2.0-chrome.zip \
  --repo OpenArsenal/red-detector-web-extension \
  --signer-workflow OpenArsenal/red-detector-web-extension/.github/workflows/release.yml

# 3. Release integrity (once immutable releases are enabled)
gh release verify v0.2.0 --repo OpenArsenal/red-detector-web-extension
gh release verify-asset v0.2.0 deepscope-0.2.0-chrome.zip \
  --repo OpenArsenal/red-detector-web-extension

# 4. The same files from GitHub Packages
oras pull ghcr.io/openarsenal/deepscope:0.2.0 -o deepscope-0.2.0
(cd deepscope-0.2.0 && sha256sum -c SHA256SUMS)
gh attestation verify oci://ghcr.io/openarsenal/deepscope:0.2.0 \
  --repo OpenArsenal/red-detector-web-extension
```

`gh attestation verify` checks that the file's digest was signed by a GitHub
Actions run of this repository; the output names the workflow, commit and tag.

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
  rebuild from the sources zip on Ubuntu 24.04 with Node 24 using
  `pnpm install --frozen-lockfile && pnpm zip:firefox` (a root script that runs
  `wxt zip -b firefox --mv3` in `apps/extension`, since `.mise/` is not in the
  sources zip); the
  build must reproduce the submitted files (see *Reproducibility*).
- **Safari / App Store Connect**: Apple requires a signed app wrapper. The job
  generates the Xcode project with `xcrun safari-web-extension-packager` on
  macOS and uploads it as a workflow artifact; the owner archives, signs and
  uploads it from Xcode. Automating that needs an Apple Developer Program team,
  a distribution certificate and provisioning profiles (as environment
  secrets), and an App Store Connect API key (`ASC_KEY_ID`, `ASC_ISSUER_ID`,
  `ASC_PRIVATE_KEY`); it is not implemented. `SAFARI_BUNDLE_ID` must end in
  `.DeepScope` because the packager derives the extension's id from it.

## Reproducibility

Rebuilding a commit produces byte-identical archives for every browser. Three
full `mise run release:archives chrome firefox safari` runs gave the same
`SHA256SUMS`, two of them with outbound network blocked. What makes that hold:

- The build id is the version plus the commit (`DEEPSCOPE_SOURCE_COMMIT`, else
  `GITHUB_SHA`, else `local`); nothing reads the clock.
- Registry files carry no build timestamp
  (`apps/extension/src/tests/registry/reproducible-assets.test.ts` builds the catalog twice).
- Fonts come from pinned npm packages, declared by hand in
  `apps/extension/src/styles/fonts.css`, so no CDN download decides their order.
- WXT sorts zip entries and writes no timestamps.

The release job still exports `SOURCE_DATE_EPOCH` for any tool that honours it.

## Owner actions

- [ ] Enable **immutable releases** (*Settings → General → Releases*). Until
      then `gh release verify` warns instead of passing.
- [ ] After the first release, make `ghcr.io/openarsenal/deepscope` **public**
      (*Packages → deepscope → Package settings*); GitHub creates it private.
- [ ] Protect `v*` tags with a tag ruleset so only maintainers can create them.
- [ ] Decide on runners: the workflows now use GitHub-hosted `ubuntu-24.04`
      (free for public repositories); see [../ci.md](../ci.md#runners).
- [ ] Update required status checks to the new job names in
      [../ci.md](../ci.md#required-checks-and-branch-settings).
- [ ] Choose the Firefox add-on id; `Firefox add-on lint` fails until the
      manifest has one.
- [ ] Fill in the private reporting route in `SECURITY.md`.
- [ ] For store publishing: create the environments, variables and secrets
      listed above.
