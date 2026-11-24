# Keep both delivery passes focused

For **change to usable preview**, define one first-value journey and identify its necessary integrations. Report
owner-only prerequisites before substantial implementation. The report should name the exact publication, permission,
domain, credential scope, or CI action needed. Continue independent work while that action is completed, and report new
blockers as they appear.

The preview exit condition is a URL the intended reviewer can use to complete that journey. Deliver the access method,
exact candidate, passed checks, limitations, and cleanup owner. Keep preview data and external side effects separate
from production. [DORA's small-batch guidance][small-batches] supports independently useful, testable increments that
return feedback quickly.

For **preview to production**, select the reviewed candidate and its configuration. Promote the same immutable
application artifact where the application permits runtime configuration. If build-time settings require a new artifact,
treat it as a new candidate and repeat the affected checks. Versioned build inputs and identifiable artifacts follow
[Google's release-engineering principles][release].

Use the rollout mechanism the platform and application actually support. [Google's canary guidance][canary] describes a
limited, evaluated rollout with a control; naming a replica “canary” does not supply useful evaluation. A low-traffic
service may need explicit synthetic journeys and a longer observation period to establish the relevant behavior.

Plan database compatibility separately from code rollback. A previous application version may not understand a new
schema. [Google's rollback guidance][rollback] illustrates staged compatible releases before features that depend on
schema changes. Do not translate an application rollback into an automatic destructive database downgrade.
