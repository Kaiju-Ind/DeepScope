# AE03 Prove requirements before expanding maintenance

Before adding a dependency, polyfill, wrapper, fork of a vendored utility or new browser permission, establish the
requirement that forces it.
Trace the claim to current application code, migration behavior, supported platform contracts or an applicable security
policy. Keep compatibility, platform maintenance and security requirements distinct.

Test the existing supported path where practical. Compare configuration, a published extension, an upstream fix and
owned source using the same acceptance criteria. Record the remaining gap, affected consumers, ongoing owner and upgrade
cost. A copied version floor, example setting or failed local setup is not sufficient proof that the application needs a
new platform artifact.

In DeepScope, the Temporal polyfill is the worked example: it ships only in Safari builds, because Chrome 144+ and
Firefox 139+ have native Temporal (see `utils/README.md`). Prefer the native web standard; add a polyfill only for a
browser whose supported minimum lacks the feature, and only in that browser's build.

If the added work fits existing scope and authorization, proceed and update the record. If it materially changes
ownership or requires a new capability outside that scope, present the evidence and concrete decision. Continue
independent delivery work. Never silently turn “support a browser” into “maintain a fork of a framework.”
