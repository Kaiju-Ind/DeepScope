# DeepScope repository rename

This document is the cutover inventory for renaming `Kaiju-Ind/kaiju-deepscope` to `Kaiju-Ind/DeepScope`.

The rename changes repository identity only. Extension runtime behavior and semantic ownership are separate migrations.

## Known canonical references

The current organization contains at least these direct source links:

- `Kaiju-Ind/kaiju-website/src/lib/marketing-links.ts`
- `Kaiju-Ind/kaiju-deepscope-website/astro.config.ts`
- `Kaiju-Ind/kaiju-deepscope-website/src/components/home/Workflow.astro`
- `Kaiju-Ind/kaiju-deepscope-website/src/content/site/navigation.json`

Update them to the canonical `Kaiju-Ind/DeepScope` URL after the GitHub rename. GitHub redirects are compatibility support, not the desired permanent source links.

## Preserve during the rename

- extension package/artifact behavior
- browser permissions
- WXT build/release configuration
- local storage/cache formats
- Chrome minimum version
- extension runtime entrypoints and release validation

Do not combine this rename with the later semantic Registry migration.

## Validation

1. Run the current extension release check before the rename.
2. Rename the GitHub repository.
3. Update all known canonical source links.
4. Run the extension release check again.
5. Run both public website validation workflows.
6. Search the organization for the old repository URL and classify any remaining hits as historical or stale.

## Stop conditions

- the extension build or generated-artifact validation changes unexpectedly;
- either public site no longer builds/deploys independently;
- semantic code is moved merely to accompany the rename.
