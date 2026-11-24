# Safeguards derived from contracts

The following are design requirements found while tracing consumers. They are not additional observed outages.

- ItsAPlan object paths use database-local project IDs without an instance prefix. Independent installations need
  separate buckets unless a reviewed adapter establishes a different isolation contract. Two keys for the same object
  namespace do not provide name isolation.
- A migration Job dependency orders new workloads. It does not stop an old API or worker from writing. The maintenance
  owner must observe the required writer shutdown before a migration that cannot coexist with them.
- A backup PVC with `WaitForFirstConsumer` needs a consuming workload before binding. IaC must not wait for binding in a
  way that prevents that workload from being created.
- Dedicated Tailscale tags and Kubernetes NetworkPolicy declarations need effective platform policy. A tag under a broad
  grant is not network isolation, and an unenforced NetworkPolicy does not restrict traffic.
- Provider and agent retries can repeat billable inference or external Git/API effects. Assign one retry owner, retain
  task identity, reject stale completions and inspect prior side effects before replaying work.
- A direct model probe tests the selected adapter. It does not prove the upstream application's separate agent framework
  or external coding runner uses the same protocol, tools or configuration.

Sources:
[ItsAPlan deployment procedure](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/docs/deployment.md),
[ItsAPlan architecture](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/docs/architecture.md),
[ItsAPlan agent tooling](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/tools/agents/README.md),
[OpenATS storage](https://github.com/Kaiju-Ind/OpenATS/blob/3b30f7e34a16dca68fe1ac354438ea93ef6fad26/docs/deployment-storage.md),
[OpenATS SAIL adapter](https://github.com/Kaiju-Ind/OpenATS/blob/3b30f7e34a16dca68fe1ac354438ea93ef6fad26/docs/sail-analysis.md).
