# Overview

DeepScope runs no servers. What it depends on outside the repository is browsers, browser stores and GitHub. Use these
readiness cards during P01 intake and [P02 platform checks](../procedures/02-p02-verify-required-service-contracts.md).
Bind each action to a repository task, a store console or a documented API. A card does not authorize an upload, a
submission or a release by itself; use the authorization already established for the task.

A platform is ready for a named journey, browser version, store account and identity. A credential's presence, a store
dashboard or a passing Chrome run is not enough. Record the check, expected result, observed result, commit, time, owner
and non-secret evidence location in the [project record](../project/README.md). Mark a check passed, failed, blocked,
not checked or not required. State what invalidates a previous pass.

Do one-time setup once (store listings, Apple membership, repository settings), repeat cheap checks per release (tag
equals version, archives build, `web-ext lint` passes), and rerun browser checks when a browser API, manifest key or
minimum version changes. P03 consumes this evidence for a usable preview. P04 rechecks it for a release.
