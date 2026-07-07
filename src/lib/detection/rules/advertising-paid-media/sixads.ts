import type { TechnologyDefinition } from '../../types';

export const sixadsTechnologyDefinition = {
	id: "sixads",
	name: "Sixads",
	website: "https://sixads.net",
	description: "Sixads is a platform that facilitates the exchange of product ads between webstores.",
	icon: "Sixads.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "sixads:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.sixads\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
