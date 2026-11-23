# Security policy

## Reporting a vulnerability

Please report security problems privately. Do not open a public issue.

> **OWNER ACTION REQUIRED — fill in before announcing the repository.**
> Replace this block with the private reporting route, for example GitHub
> private vulnerability reporting (*Security → Report a vulnerability*, after
> enabling it under *Settings → Code security*) and/or a monitored security
> email address. Until this is filled in there is no confirmed private channel.

Include the DeepScope version, the browser and its version, steps to
reproduce, and the impact you observed. We will acknowledge the report, keep
you informed while we investigate, and credit you in the release notes unless
you ask us not to.

## Supported versions

Only the latest release receives security fixes.

## Scope

In scope: the extension code in this repository and the release archives
published from it. DeepScope reads untrusted web pages, so issues where page
content can influence the extension (for example page-controlled object keys,
script injection into extension pages, or data leaving the browser) are
especially relevant.

## Verifying releases

Every release archive has a SHA-256 checksum and a GitHub build provenance
attestation. See [docs/release/README.md](docs/release/README.md#verifying-a-download).
