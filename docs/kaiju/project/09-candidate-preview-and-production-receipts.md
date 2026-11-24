# Build and release receipts

The records link to one another without conflating their identities.

| Record            | Required content                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Candidate         | Commit, lockfile, check and test results, Verify run id                                                                   |
| Preview           | Candidate, build location or Verify artifact, browsers and versions, journey result, real-browser result files, limits    |
| Release           | Version, tag, commit, Release run id, asset names and SHA-256 digests, attestation and `gh release verify` results, ghcr digest |
| Store submission  | Store, version, upload or signing result, review state and reviewer messages, date                                       |

A release rebuilds from the tag. If its archives differ from the reviewed preview build, explain the difference and
recheck the affected journey; never call different bytes the same candidate. Store review state changes over time:
record each state with its date rather than overwriting it.
