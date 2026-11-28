# Overview

These prompts turn the playbook's product and engineering rules into tasks an agent can run. Every copied prompt
starts with A01: customer outcome, questions, smallest useful test and evidence that supports the next decision. Each prompt is a complete instruction:
it names the repository frame, the skills to load, the rules to follow, the steps, the exit condition and where to stop.
Nothing outside the fenced block is needed once it is copied.

## Run one prompt per session

1. Pick the prompt for the decision. Use [T19](19-t19-answer-one-product-question.md) for an immediately testable
   unknown, [T20](20-t20-report-a-team-anchor.md) for a useful progress update, and
   [T21](21-t21-make-the-next-action-concrete.md) to turn findings into a concrete plan. Use
   [T01](01-t01-map-source-owners.md) when source ownership needs investigation. Independent experiments need not wait
   for a complete architecture inventory.
2. Copy the fenced block into a new session and replace `<owner/name>` and `<name>`.
3. Let the session finish and record its stopping point before starting the next prompt.

T01 to T03 and T06 are read-only. They produce the ownership map, the capability audit, the baseline and the task
register that the other prompts depend on. Run T07 before T08, and T13 before T14. A prompt whose inputs do not exist
yet is not ready; run the read-only prompt that produces them instead.

A prompt does not expand authorization. Apply existing authorization for the same scope and destination without
asking again. Obtain only a genuinely missing decision before a consequential action. Read-only prompts stay read-only;
use another authorized task for mutations. An experiment can answer its discovery question without fixing the product.
Implementation and delivery prompts retain their acceptance exits.

## How the prompts are checked

The repository's guidance check (`tools/lint/guidance.ts`) reads every prompt in this folder. A prompt fails the check
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
