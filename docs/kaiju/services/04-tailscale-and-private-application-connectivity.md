# Tailscale and private application connectivity

**Inputs and owner.** Platform owns tailnet policy, operator and ProxyGroup. Deployment management creates the limited
runtime identity. The CI runner has a separate deployment-network identity. Record each role, permitted tag and intended
destination.

**Procedure.**

1. Confirm management credentials can perform the required provider operation. Independently prove the CI runner can
   reach the cluster through its assigned deployment identity.
2. Verify the operator-managed Service obtains a usable private address. Use that address in the application route; do
   not assume Kubernetes service DNS resolves outside the cluster.
3. Start the selected runtime sidecar and verify its exact tag, device identity, userspace configuration, state
   directory and readiness. Check the bridge's SOCKS destination, listener and target database port.
4. Perform a bounded database connection from the deployed application path using the application role. A tailnet device
   being online is not proof of bridge or database access.
5. Exercise restart and cleanup behavior appropriate to the identity. Ensure duplicate application instances cannot
   corrupt one persistent identity's state. Check the effective network policy, not merely a dedicated tag's existence.

ItsAPlan separates management OAuth, a limited application client, and ephemeral CI deployment access. Its one-replica
Bunny choice also reflects persistent Tailscale state. These are instance design decisions to reassess before increasing
replicas.
[Private network source](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/infra/network.ts);
[deployment credential roles](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/docs/deployment.md).

**Evidence and acceptance.** Record the effective identity/tag, operator address and app-to-database result without
exposing keys or kubeconfig. Confirm access is limited as intended; a broad existing tailnet grant can defeat the
assumed separation.

**Repeat and recovery.** First installation proves all three roles and restart behavior. Each deployment verifies
runtime connectivity and identity. Credential, tag/grant, ProxyGroup, address, sidecar/bridge digest or replica changes
require renewed proof. Diagnose identity, policy, route, proxy, listener and database separately. Revoke or remove only
resources owned by this operation; preserve shared operator resources and existing state during P05 recovery.
