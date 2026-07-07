import type { TechnologyDefinition } from '../../types';

export const gosquaredTechnologyDefinition = {
	id: "gosquared",
	name: "GoSquared",
	website: "https://www.gosquared.com",
	description: "GoSquared is a web analytics platform positioned as an alternative to Google Analytics.",
	icon: "GoSquared.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "gosquared:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("gosquared\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "gosquared:jsGlobal:1",
			kind: "jsGlobal",
			property: "GoSquared",
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
