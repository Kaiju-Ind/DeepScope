# Kaiju project playbook

Release 1.2.1, split into folders of short files. Each folder has a README that lists its parts. The pack routes project
and deployment work; the skills and guides in `.agents/` say how to do the engineering, and the repository's own files
decide what applies. Each folder's README names the skills that carry out its work, and each of those skills links back
to the folder. Start with [Start here](start/README.md).

| Folder                                      | Read it to                                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Start here](start/README.md)               | When the pack applies, what to read for each task, and the first action.                            |
| [Handbook](handbook/README.md)              | How a Kaiju project is structured: ownership, placement, procedures and files.                      |
| [Procedures](procedures/README.md)          | The eight procedures P01 to P08, and how to write a procedure.                                      |
| [Service readiness](services/README.md)     | How to prove email, storage, database, networking, images and AI before deployment depends on them. |
| [Project record](project/README.md)         | The project contract and the operating records that each project keeps.                             |
| [Agent execution](agents/README.md)         | Controls AE01 to AE08 that keep agent work aligned through long tasks and resumed sessions.         |
| [Engineering and CI](engineering/README.md) | Rules E01 to E06 for CI, test selection, caching, builds and package ownership.                     |
| [Task prompts](tasks/README.md)             | Copyable prompts T01 to T18 that run one engineering task with the right skills and rules.          |
| [Failure catalogue](failures/README.md)     | Known deployment failures, their causes, repairs and prevention, and the retrospective coverage.    |
| [Service references](references.md)         | The provider documentation behind the service readiness cards.                                      |
