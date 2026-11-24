# Keep the pack accessible

The playbook lives in the repository at `docs/kaiju/`, next to the skills in `.agents/`. The root `AGENTS.md` routes
both. A copy elsewhere is not active guidance.

The handbook describes common procedures and file ownership. The repository's tasks (`.mise/tasks/`, `package.json`
scripts) decide what can actually run. Do not paste a command from the playbook into a workflow and assume it exists;
check `mise tasks` and the task's source first.

The playbook was adapted from Kaiju-Ind/Crawl `docs/kaiju/` at `a00f0036d`. To take a later improvement, compare that
folder with this one and carry over what applies. File names are kept the same as Crawl's so the comparison stays
simple. Record DeepScope's own changes in the [changelog](../CHANGELOG.md).
