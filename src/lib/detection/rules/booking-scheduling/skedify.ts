import type { TechnologyDefinition } from '../../types';

export const skedifyTechnologyDefinition = {
	id: "skedify",
	name: "Skedify",
	website: "https://calendly.com/",
	description: "Skedify is an appointment booking solution created for enterprises.",
	icon: "Skedify.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "skedify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("plugin\\.skedify\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "skedify:jsGlobal:1",
			kind: "jsGlobal",
			property: "Skedify.Plugin.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
