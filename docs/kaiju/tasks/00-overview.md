# Overview

These prompts turn the playbook's engineering rules into tasks an agent can run. Each prompt is a complete instruction:
it names the repository frame, the skills to load, the rules to follow, the steps, the exit condition and where to stop.
Nothing outside the fenced block is needed once it is copied.

## Run one prompt per session

1. Pick the prompt for the work. Start with [T01](01-t01-map-source-owners.md) when the owners of the change are not yet
   known.
2. Copy the fenced block into a new session and replace `<owner/name>` and `<name>`. For DeepScope the repository is
   this one; name the branch.
3. Let the session finish and record its stopping point before starting the next prompt.

T01 to T03 and T06 are read-only. They produce the ownership map, the capability audit, the baseline and the task
register that the other prompts depend on. Run T07 before T08, and T13 before T14. T12 (container image layers) was dropped: DeepScope builds no images. A prompt whose inputs do not exist
yet is not ready; run the read-only prompt that produces them instead.

A prompt never authorizes a merge, a tag, a release, a store submission, a change in another repository or a costly
workflow run. The owner grants
those separately.

## How the prompts are checked

The repository's guidance check (see `AGENTS.md`) reads every prompt in this folder. A prompt fails the check
when:

- its `Skills:` line is missing or names a skill that does not exist in `.agents/skills/`;
- its `Rules:` line is missing or links to no playbook rule, labelled by its short name (`E03`, `AE01`, `P07`, or `H03`
  for the third handbook chapter);
- its fenced prompt does not name each of those skills and rules, so a copied prompt would lose them;
- its fenced prompt does not start from `AGENTS.md` and `.agents/START.md`, or has no `STOPPING POINT`.

Each skill named in the [README](README.md) links back to this folder, so a reader can go from the method to the task.

## Add a prompt

Add a numbered file with a title, a `Use this prompt when …` sentence, the `Skills:` and `Rules:` lines and the fenced
prompt, then add its row to the README. Keep the steps to the decisions that the rules require, and keep tool names to
the ones a reader can check in the repository.
