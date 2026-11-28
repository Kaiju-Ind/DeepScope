# P06 Retire a preview

**Trigger:** preview expiry, closed work, explicit replacement or owner request. **Outcome:** owned temporary resources
are removed and retained data is accounted for.

1. Confirm the preview's exact environment, resource inventory and ownership labels.
2. Confirm the target is not production or a borrowed platform resource.
3. Stop background work and revoke preview-specific external access.
4. Export only data that the retention contract requires.
5. Remove the preview's application, routes, identities and temporary data through its owning tool.
6. Verify object versions, volumes, DNS records and credentials follow the intended retention policy.
7. Record remaining protected resources and their owner.

If identity or ownership is ambiguous, stop deletion and inspect the original receipt. A prefix match alone is
insufficient authority to delete resources. A TTL automation must use the same ownership contract as manual cleanup.
Cleanup failure remains visible even if the preview is no longer reachable.
