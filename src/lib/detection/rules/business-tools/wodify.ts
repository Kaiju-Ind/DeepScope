import type { TechnologyDefinition } from '../../types';

export const wodifyTechnologyDefinition = {
	id: "wodify",
	name: "Wodify",
	website: "https://www.wodify.com",
	description: "Wodify is a gym management software.",
	icon: "Wodify.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "wodify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("wodify\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "wodify:jsGlobal:1",
			kind: "jsGlobal",
			property: "validateWodifyLeadForm",
			description: "Page-owned global matches a known technology marker.",
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
