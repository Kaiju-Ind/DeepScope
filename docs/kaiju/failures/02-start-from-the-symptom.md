# Start from the symptom

| Symptom                                                                | First checks                                                                                      | Entries      |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------ |
| "Can't find the content script" or `CONTENT_SCRIPT_UNAVAILABLE`        | Is the script alive but busy (dom-scan timings in the journal)? Is site access granted? Page size. | DS-01        |
| A page with odd meta, cookie or header names breaks collection         | Keys such as `constructor` or `__proto__` reaching ordinary objects.                              | DS-02        |
| A test or a page analysis hangs for minutes                            | A catalog regex with nested unbounded quantifiers; the partition deadline.                        | DS-03        |
| Firefox or Safari build is Manifest V2, or lacks background/workers    | The `--mv3` flag and `manifestVersion`; the emitted manifest.                                     | DS-04        |
| Two builds of one commit have different checksums                      | Network fetches during build, output order, timestamps in the build.                              | DS-05, DS-06 |
| Cold build is slow before any compile work                             | How the registry module loads the catalog.                                                        | DS-07        |
| Diagnostics name the wrong executor                                    | The persisted `matcherExecutor` value per browser.                                                | DS-08        |
| Something from a private window appears in storage or history          | Private context passed through collection, matcher persistence and diagnostics.                   | DS-09        |
| Toolbar badge blank or stale                                           | Which snapshot revision the badge owner last wrote; navigation kind.                              | DS-10        |
| Safari verification refuses every session                              | Remote Automation, unsigned extensions, extension enabled, website access.                        | DS-11        |
| A cached CI task still re-runs, or a job "passes" without running      | Cache restore versus hit; whether the step's script exists.                                       | DS-12, DS-13 |

The entries are in [content scripts and catalog](03-content.md), [builds](04-builds.md),
[background runtime](05-runtime.md) and [verification and CI](06-verification.md).
