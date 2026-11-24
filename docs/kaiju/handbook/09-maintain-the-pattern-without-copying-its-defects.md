# Maintain the pattern without copying its defects

Renovate proposes changes. It does not prove compatibility or test a journey. Group coupled packages, test the
installed versions, and recheck the browsers when a dependency changes what it emits (WXT changing a manifest default is
the standing example).

Vendored code has one upstream. Fix a utility in Kaiju-Ind/Utils and resync, rather than patching the copy; DeepScope's
own additions under `utils/` are written to be proposed upstream unchanged.

Each incident produces one owned prevention improvement: remove the unnecessary step, encode the invariant, add a cheap
capability check, test the behavior, or document the remaining choice. The [failure catalogue](../failures/README.md)
has DeepScope's examples. A prose warning alone is not closure for a failure that code or configuration can prevent.

Close the fresh-install path too. Search every task, workflow, doc and default that uses the changed setting, and
repeat setup from a clean checkout without relying on a local override.

Browsers and stores still change. Known prerequisites are checked before long work, mandatory failures stay visible,
and recovery follows a tested procedure. A passing check applies to its browser version, commit and observation time.
