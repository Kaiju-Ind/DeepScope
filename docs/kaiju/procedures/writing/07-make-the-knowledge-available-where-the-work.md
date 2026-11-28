# Make the knowledge available where the work happens

Keep a short `AGENTS.md` route to the detailed procedures. [OpenAI's current guidance](https://developers.openai.com/codex/guides/agents-md/) describes global and
project instruction discovery, more specific overrides, and a default combined limit of 32 KiB. A large handbook
therefore belongs in ordinary Markdown, with a small instruction entry that tells Codex when to read it.

Copy this pack to `docs/kaiju/`, merge [the portable fragment](../../start/agents-fragment.md) into existing repository
instructions, and verify the active sources in that environment. A Library save does not automatically install those
files in Codex.
