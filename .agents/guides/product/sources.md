# Research behind the method

Reviewed for this edition on 2026-11-25. These sources explain the established
practices behind the synthesis. Repository source and local experiments still
control claims about a specific implementation. The core method, naming, and
60:10 working cadence are this pack's operating choices.

| Primary source | Relevant contribution | Limit |
| --- | --- | --- |
| Teresa Torres, [Assumption Testing](https://www.producttalk.org/assumption-testing/) | Break a proposed solution into assumptions; find a small test that changes a decision; compare alternatives | An assumption test supplies evidence for its scope, not certainty about the whole product |
| Marty Cagan, [Build to Learn FAQ](https://www.svpg.com/build-to-learn-faq/) | Product discovery centers on outcomes and value, usability, feasibility, and viability risks | Product opinion and practice guidance; not experimental proof of this pack's effectiveness |
| GOV.UK Service Manual, [How the alpha phase works](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works) | Test risky assumptions with a minimal prototype; concentrate on difficult parts | Public-service delivery context; its complete process is not imposed on every repository |
| NIST, [One factor at a time](https://www.itl.nist.gov/div898/handbook/pri/section2/pri212.htm) | Changing factors individually can miss interactions | Experiment structure still depends on the question, cost, and feasible controls |
| Strategyzer, [Test Card](https://www.strategyzer.com/library/validate-your-ideas-with-the-test-card) | State an assumption, test, measure, and criterion before interpreting the result | A filled card is not evidence; exploratory probes may refine later criteria |
| Strategyzer, [Learning Card](https://www.strategyzer.com/library/capture-customer-insights-and-actions-with-the-learning-card) | Separate observation, learning, and resulting action | A plausible interpretation still needs scrutiny and scope |
| Google SRE, [Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/) | Relate latency, traffic, errors, and saturation to service behavior | Operational telemetry alone does not establish customer value or durable completion |
| Marty Cagan, [Discovery Judgement](https://www.svpg.com/discovery-judgement/) | Match discovery effort to risk and consequence | Professional judgment remains necessary; no universal experiment quota |

The Kaiju Crawl guidance baseline is commit
`22d258f771126c53e963e35a51cd86289646fa45`, the head of PR 106 when inspected.
The full existing skills and playbook were retained before this edition's
changes. The Kaiju Utils baseline is `Kaiju-Ind/Utils` main at
`b64c3fea26431012f75d924045a1cf9873077da5`, after PR 68 merged. Its benchmark,
profiling, capability, artifact, and telemetry guides informed measurement and
evidence rules. The source manifest in this distribution records exact paths
and hashes. A similarly named personal utility repository is not a source for Kaiju Utils.

The current Utils tree has its own guides and a local GitButler skill. It does
not contain the shared `docs/kaiju/` playbook or the complete skill pack. This
edition therefore preserves Crawl's full distribution and incorporates reusable
Utils lessons with their provenance. It does not pretend the two trees were
identical or claim to have merged their Git histories.

The 60:10 cadence is an explicit user requirement. None of the sources above
establishes that ratio as statistically optimal. Experiment quality depends on
the question, controls, observations, and consequence of the decision.
