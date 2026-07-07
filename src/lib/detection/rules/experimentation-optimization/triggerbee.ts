import type { TechnologyDefinition } from '../../types';

export const triggerbeeTechnologyDefinition = {
	id: "triggerbee",
	name: "Triggerbee",
	website: "https://triggerbee.com",
	description: "Triggerbee is an onsite personalisation platform that lets you use customer and behavioral data to build and launch personalised campaigns.",
	icon: "Triggerbee.png",
	categories: [
		"experimentation-optimization",
		"analytics",
	],
	rules: [
		{
			id: "triggerbee:jsGlobal:0",
			kind: "jsGlobal",
			property: "triggerbee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "triggerbee:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("t\\.myvisitors\\.se"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
