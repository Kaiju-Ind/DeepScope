# Overview

**Status:** Reusable procedure, drawn from Kaiju's CI work and adapted to DeepScope's toolchain: pnpm 12 and Node 26
pinned by Mise, Vitest 5 projects with native discovery, TypeScript through `tsc --noEmit`, WXT builds per browser, and
two GitHub Actions workflows (Verify and Release, see [`docs/ci.md`](../../ci.md)). DeepScope has no Deno runtime and
builds no container images; the OCI artifact on ghcr only carries the release archives. This chapter defines an
engineering contract, not a claim that every optimization is implemented.
