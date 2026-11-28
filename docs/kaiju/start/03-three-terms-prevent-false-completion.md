# Three terms prevent false completion

**Plan preview** is an infrastructure diff that proposes changes. **Usable preview** is a reachable application where
the intended reviewer completes the agreed journey. **Production acceptance** is the verified outcome after the reviewed
candidate reaches the production environment.

The inspected ItsAPlan and OpenATS repositories implement saved infrastructure plans and controlled deployment. They do
not yet implement the complete automatic preview-environment lifecycle described as the target in this pack.

ItsAPlan's reviewed main at `8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5` has successful exact-source CI. OpenATS advanced
during review from `3b30f7e34a16dca68fe1ac354438ea93ef6fad26` to `132c68611381c36d3e03a9247abc97ae59eebe71`. The added
diff was reviewed; the newer revision's CI and launch audit passed. The inspected deployment of the earlier `3b30f7e`
revision was cancelled. An older `f178293a` revision has successful deployment evidence. These results do not prove
every user journey.
