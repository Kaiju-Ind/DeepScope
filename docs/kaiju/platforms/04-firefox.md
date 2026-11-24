# addons.mozilla.org (AMO)

**Owner actions (one time).** Choose the Firefox add-on id (`browser_specific_settings.gecko.id`); `web-ext lint` and
AMO both reject a build without it. Create the listing by hand for the first version. Store the AMO JWT issuer and
secret as `WEB_EXT_API_KEY` and `WEB_EXT_API_SECRET` in the `addons-mozilla-org` environment and set `AMO_SUBMIT=true`.

**Procedure.** The Release workflow's `firefox-addons` job runs `mise run release:store-upload firefox <dir> <version>`,
which calls `web-ext sign --channel listed` with the sources zip attached. AMO reviewers rebuild from that sources zip
on Ubuntu 24.04 with `pnpm install --frozen-lockfile && pnpm zip:firefox`, so the build must be
reproducible: no build timestamp, no network fetch during the build, deterministic output order. See
[`docs/release/README.md`](../../release/README.md#reproducibility).

**Checks before submission.** `mise run lint:firefox` on the unpacked build passes; the manifest declares Manifest V3,
the add-on id, `strict_min_version` 140 and `data_collection_permissions`; two builds of the same commit produce the
same files.

**Evidence.** Lint output, the signing result and AMO's review state. **Repeat and recovery.** As for Chrome: a version
is never reused; fix forward with a new patch version.
