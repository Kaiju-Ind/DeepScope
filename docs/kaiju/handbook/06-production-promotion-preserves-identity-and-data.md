# Release preserves identity and data

Release the commit the reviewer used. The Release workflow rebuilds it from the tag on a cold runner, so the build must
be reproducible: no build timestamp, no network fetch during the build, deterministic output order. Then the published
archives are the reviewed bytes, and `SHA256SUMS` plus attestations prove where they came from.

Keep the identities stable across releases:

- **Extension ids.** The Chrome Web Store item id, the Firefox add-on id (`browser_specific_settings.gecko.id`) and the
  Safari bundle id (ending in `.DeepScope`) never change once published. Changing one creates a different extension;
  users lose their data and settings.
- **Versions.** One version per release, equal to the tag. Stores never accept a version twice.
- **Signing.** Store signing keys and the Apple team are owner-held. Never put them in the repository.
- **Tags and assets.** Never move a published tag or replace a published asset; immutable releases enforce it.

Code and stored data are separate. An update must read what the previous version wrote to `storage.local`,
`storage.session` and IndexedDB, and a fix must read what a broken version wrote. Keep storage keys and persisted shapes
byte-identical unless a migration reads the old form. Nothing from a private tab may reach disk.

Stores, not DeepScope, decide rollout. A store review can reject or delay a version; record that as its own state.
