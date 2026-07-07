import type { TechnologyDefinition } from '../../types';

export const syneriseTechnologyDefinition = {
	id: "synerise",
	name: "Synerise",
	website: "https://synerise.com/",
	icon: "Synerise.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "synerise:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("snrcdn\\.net\\/sdk\\/(3\\.0)\\/synerise-javascript-sdk\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
