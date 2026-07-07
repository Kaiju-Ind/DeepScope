import type { TechnologyDefinition } from '../../types';

/**
 * Detects Shiki from syntax-token CSS variables commonly emitted by Shiki's
 * highlighter. The token prefix is specific enough to avoid matching generic
 * code-block styling.
 */
export const shikiTechnologyDefinition = {
	id: "shiki",
	name: "Shiki",
	website: "https://shiki.style/",
	description: "Shiki is a syntax highlighter that uses TextMate grammars and themes to produce tokenized code highlighting.",
	categories: [
		"developer-tooling",
		"rich-text-editors",
	],
	rules: [
		{
			id: "shiki:stylesheetContent:token-vars",
			kind: "stylesheetContent",
			pattern: /--shiki-(?:token|color|light|dark)/i,
			confidence: 90,
			description: "Captured stylesheet content contains Shiki token variables.",
		},
		{
			id: "shiki:html:token-vars",
			kind: "html",
			pattern: /--shiki-(?:token|color|light|dark)/i,
			confidence: 75,
			description: "Inline document styles contain Shiki token variables.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
