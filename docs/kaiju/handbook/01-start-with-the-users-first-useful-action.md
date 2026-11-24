# Start with the user's first useful action

Write the journey before choosing files. For DeepScope the core journey is: open an ordinary website, see the toolbar
badge count, open the panel, see the detected technologies with their evidence. A change may add steps: switch tabs and
see the panel follow, navigate within a single-page app, open a private window, or upgrade the extension with tabs open.

That journey defines which contexts and browsers must work. A panel change that only matters in Chrome's side panel
still has to work in Firefox's sidebar, Safari's popup and the full page, because one Solid application renders every
surface. Record what is deliberately out of scope. Do not shrink the agreed journey silently to make a check pass.

Name who will accept it and in which browsers. Use the [agent execution controls](../agents/README.md) to carry this
contract across long sessions and parallel work.

The work has two passes:

1. **Change to usable preview:** build each affected browser, load it, run the journey and give the reviewer the build,
   the result and the limitations.
2. **Reviewed preview to release:** tag the reviewed commit, let the Release workflow rebuild and publish it, verify
   the release, and submit to the stores.

The small-batch principle is supported by [DORA](https://dora.dev/capabilities/working-in-small-batches/).
