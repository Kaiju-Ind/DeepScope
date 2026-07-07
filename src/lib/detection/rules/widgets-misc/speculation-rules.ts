import type { TechnologyDefinition } from '../../types';

export const speculationRulesTechnologyDefinition = {
	id: "speculation-rules",
	name: "Speculation Rules",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API",
	description: "Uses the Speculation Rules API to describe browser prefetch or prerender candidates.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "speculation-rules:html:0",
			kind: "html",
			pattern: new RegExp("<script\\b[^>]+type=[\"']speculationrules[\"']", "i"),
			confidence: 100,
			description: "Document contains a speculationrules script.",
		},
	],
} as const satisfies TechnologyDefinition;
