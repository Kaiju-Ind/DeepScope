# Candidate, preview and production receipts

The records should link to one another without conflating their identities.

| Record                | Required content                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Candidate             | Repository/commit/tree, artifact type, immutable image/package/file identity, platform, build-input/lock identity, test evidence and builder run |
| Preview               | Candidate reference, preview config/plan identity, URL/access route, required service results, passed journey, known limits, owner and expiry    |
| Production plan       | Candidate reference, target stack/account, current state identity, exact configuration, migration/recovery decision and reviewed plan identity   |
| Production acceptance | Deployed artifact/configuration, actual apply record, health/convergence/journey/observation evidence, previous identity and recovery owner      |

If a build-time setting changes bytes, create a new candidate. If only the target environment changes, preserve the
admitted application artifact when the repository's source/provenance contract permits reuse, and create a new
infrastructure plan. Otherwise follow the required new-candidate release path; never weaken source admission to avoid
rebuilding. Credentials with short lifetimes need a current scoped refresh at the actual consumer; do not freeze
expiring tokens as permanent plan inputs.
