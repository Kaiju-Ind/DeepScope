# Component and ownership map

| Component          | Role                                           | Artifact strategy                   | Immutable source/artifact           | Runtime/platform               | Configuration owner | State and cleanup                       |
| ------------------ | ---------------------------------------------- | ----------------------------------- | ----------------------------------- | ------------------------------ | ------------------- | --------------------------------------- |
| Required component | API, web, background work, migration or runner | Image, package/file or owned source | Commit/package version/image digest | Exact runtime and architecture | Schema/module/path  | Retention, credential owner and removal |

Record each process role separately even when images are shared. Mark shared namespaces, controllers, StorageClasses,
BackupRepos, DNS zones and registry connections as borrowed. State which application resources the stack may create or
delete.

For an image, record the upstream release, registry, index/child digests, platform, entrypoint, arguments, ports and
writable paths. For a package, record public exports or its executable, version, runtime, lock and packaging entry
point. For owned source, record upstream ancestry or the verified source-import contract and maintained customizations.
