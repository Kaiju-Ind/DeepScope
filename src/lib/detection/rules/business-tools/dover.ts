import type { TechnologyDefinition } from '../../types';

export const doverTechnologyDefinition = {
	id: "dover",
	name: "Dover",
	website: "https://www.dover.com",
	description: "Dover is a platform that streamlines recruiting by identifying and scheduling qualified candidates.",
	icon: "Dover.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "dover:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.dover\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
