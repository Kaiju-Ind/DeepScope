import type { TechnologyDefinition } from '../../types';

export const waiAriaTechnologyDefinition = {
	id: "wai-aria",
	name: "WAI-ARIA",
	website: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA",
	description: "Uses WAI-ARIA attributes or roles to expose accessibility semantics.",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "wai-aria:html:aria-attr",
			kind: "html",
			pattern: new RegExp("\\saria-[a-z0-9_-]+\\s*=", "i"),
			confidence: 90,
			description: "Document contains WAI-ARIA attributes.",
		},
		{
			id: "wai-aria:html:role-attr",
			kind: "html",
			pattern: new RegExp("\\srole=[\"\\'][a-z0-9_-]+[\"\\']", "i"),
			confidence: 70,
			description: "Document contains ARIA role attributes.",
		},
	],
} as const satisfies TechnologyDefinition;
