# Timing and incident records

Record these timestamps in one time zone: request accepted, first prerequisite report, prerequisite ready, candidate
ready, URL ready, journey passed, production selected, production deployed and production accepted. Keep wait categories
and rework separately. Do not restart the original clock after an administrator supplies access.

An incident record needs a stable ID, source/artifact/environment, first symptom, impact, confirmed cause or open
hypothesis, evidence, repair, recovery result and prevention owner. Link it to the relevant
[known failure](../failures/README.md). A subsequent green workflow is useful evidence, but it does not by itself
establish the cause of an earlier failure.
