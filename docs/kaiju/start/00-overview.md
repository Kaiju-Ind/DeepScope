# Overview

DeepScope is a browser extension, not a hosted service. Use this playbook for any change that has to reach users: a
feature, a browser, a dependency update, a CI change or a release. Start with a small usable outcome: one journey that a
reviewer completes in the built extension, in each browser the change affects. Then release the reviewed commit through
the separate release procedure.

The playbook was written for Kaiju's server projects and adapted here. Its Kubernetes, Bunny and service-deployment
chapters do not apply to DeepScope and were removed; the [changelog](../CHANGELOG.md) lists what changed.
