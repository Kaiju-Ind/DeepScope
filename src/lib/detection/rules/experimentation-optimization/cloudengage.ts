import type { TechnologyDefinition } from '../../types';

export const cloudengageTechnologyDefinition = {
	id: "cloudengage",
	name: "CloudEngage",
	website: "https://cloudengage.com",
	description: "CloudEngage is a platform enabling no-code personalization for enhanced revenue and customer satisfaction.",
	icon: "CloudEngage.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "cloudengage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cloudengage\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cloudengage:jsGlobal:1",
			kind: "jsGlobal",
			property: "CloudEngage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cloudengage:jsGlobal:2",
			kind: "jsGlobal",
			property: "CloudEngageHead",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
