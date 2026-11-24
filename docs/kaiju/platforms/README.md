# Platform readiness

How to prove that the browsers, stores and release channel a change depends on are ready before a release depends on
them. This folder replaces Crawl's `services/` cards: DeepScope runs no servers, so the Kubernetes and KubeBlocks,
Bunny, Tailscale, Resend, Backblaze B2, model-provider and user-access cards were removed. They can be restored from
Kaiju-Ind/Crawl `docs/kaiju/services/` at `a00f0036d` if DeepScope ever gains a hosted part.

Skills: `build-extensions`, `release-software`, `use-utils`.

| Part                                                                                  | What it covers                                                                     |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Overview](00-overview.md)                                                            | What "ready" means for a platform and how the cards feed P02 to P04.               |
| [Vendored packages and runnable artifacts](01-private-tooling-packages-and-runnable-artifacts.md) | `@utils/*` copied from Kaiju-Ind/Utils, no private packages, release artifacts.     |
| [Browser runtimes](02-browsers.md)                                                    | Chrome, Firefox and Safari: minimum versions, capability checks, real-browser runs. |
| [Chrome Web Store](03-chrome.md)                                                      | Listing, upload credentials, unpublished upload for human review.                  |
| [addons.mozilla.org](04-firefox.md)                                                   | Add-on id, listed signing with the sources zip, reproducible builds.               |
| [Safari and App Store Connect](05-safari.md)                                          | Apple membership, Xcode wrapper, Remote Automation and unsigned-extension settings. |
| [GitHub Releases and ghcr](06-github.md)                                              | Immutable releases, checksums, attestations and the OCI copy.                      |
