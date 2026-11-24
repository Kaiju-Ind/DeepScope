# Bunny application, public routes and health

**Inputs and owner.** Platform supplies Magic Containers availability, registry connection, DNS zone and account
capacity. The instance owns its application, endpoint identities, custom hostnames and app-specific edge policy. Each
workload owner supplies command, arguments, port, writable paths and health contract.

**Procedure.**

1. Verify platform limits and pull access to every selected immutable image. Inspect actual Linux architecture,
   entrypoint, command override and argument encoding. Container and shell argument contracts are not interchangeable.
2. Start the candidate through the selected runtime. Verify that required listeners bind to an interface reachable by
   the platform's probes. A loopback-only bridge can work inside its pod while failing an external TCP probe.
3. Give endpoints distinct identities within the provider's naming scope. Resolve the generated endpoint and Pull Zone.
   Keep DNS pointed at the stable system CDN domain after custom-host attachment; check a subsequent refresh/plan for
   self-referencing DNS.
4. Verify TLS and the public host from a reviewer client. Exercise the actual login/callback flow, cookie scope, upload
   and streaming route where required. Preserve request cookies and `Set-Cookie`; bypass caching/coalescing on private
   dynamic responses.
5. Check desired versus running instance counts and inspect container-level errors. When stopping writers for migration,
   prove that old application instances are gone rather than relying on the undeploy request's acceptance.

Report DNS, certificate validation, origin response, each required container, private route and worker rollout
separately. A certificate marked installed may still be propagating; valid public TLS can coexist with HTTP 503. Use
phase-specific deadlines and logs. Never disable TLS verification or recreate a healthy database to hide a
route/readiness failure.

ItsAPlan's reviewed adapters demonstrate the command correction, unique endpoints, stable CNAME target and
field-specific cookie ownership. Use them as tested examples, not a universal application config.
[Application source](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/infra/application.ts);
[edge policy](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/infra/edge.ts).

**Evidence and acceptance.** Keep image identity, endpoint/zone IDs, redacted probe results, DNS/TLS result and
completed public journey. ItsAPlan's API `/` and web `/login` HTTP checks establish reachability; they do not prove
invitation, attachment or agent behavior.

**Repeat and recovery.** Verify the full path on first installation. Recheck identity, public health and changed
journeys each deployment. New images, listener settings, endpoints, domains, cookie policy, regions or runtime changes
invalidate the affected checks. On failure, trace image/process, listener, readiness, endpoint, DNS, TLS and application
in order. Correct the identified layer, then follow P05 and the repository's plan/state contract. OpenATS can require
the original bound plan for a partial-apply retry; ItsAPlan may require a fresh plan after state changes. Do not rebuild
an unchanged application image merely to diagnose a routing error.
