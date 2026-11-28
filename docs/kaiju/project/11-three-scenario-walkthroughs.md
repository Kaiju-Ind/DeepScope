# Three scenario walkthroughs

**Upstream image on Kubernetes.** Select a pinned supported image and read its actual ports, state and migration
requirements. Reuse the platform ingress and database capability. Omit Magic Containers/Tailscale bridge files unless
the network contract needs them. Test the image and first-value journey. Keep version/digest updates grouped and avoid
creating a fake application source workspace.

**Published package in a small image.** Verify the package's executable or public API and actual Deno/Node support. Keep
a minimal launcher and exact dependency lock. Test the installed package, graceful exit and final image. Deploy through
the selected placement. Update the package with Renovate, then repeat its actual consumer tests.

**Owned application source.** Preserve upstream framework/runtime conventions, verified ancestry/import record and Kaiju
customizations. Check the full source delta on upstream updates. Keep native infrastructure dependencies separate.
Validate builds, migrations and user journeys, then reuse admitted artifacts for preview and promotion where
configuration and the source/provenance contract permit.

These are document walkthroughs. Real onboarding must bind commands and exercise the chosen scenario before it can be
labeled preview- or production-exercised.
