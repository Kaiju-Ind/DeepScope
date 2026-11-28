# AE03 Prove requirements before expanding maintenance

Before adding a maintained image, operator, SDK fork or platform service, establish the requirement that forces it.
Trace the claim to current application code, migration behavior, supported platform contracts or an applicable security
policy. Keep compatibility, platform maintenance and security requirements distinct.

Test the existing supported path where practical. Compare configuration, a published extension, an upstream fix and
owned source using the same acceptance criteria. Record the remaining gap, affected consumers, ongoing owner and upgrade
cost. A copied version floor, example setting or failed local setup is not sufficient proof that the application needs a
new platform artifact.

The OpenATS retrospective records an imported PostgreSQL 17.12 floor becoming custom database-image work before source
review established any such patch-specific application need. The resulting work was removed. This is a reported
historical example, not a fresh qualification of the current catalog or a reason to ignore a real security requirement.
See the OpenATS retrospective.

If the added work fits existing scope and authorization, proceed and update the record. If it materially changes
ownership or requires a new capability outside that scope, present the evidence and concrete decision. Continue
independent delivery work. Never silently turn “deploy this application” into “maintain a new database distribution.”
