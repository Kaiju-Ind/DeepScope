import type { TechnologyDefinition } from '../../types';

export const fuguTechnologyDefinition = {
	id: "fugu",
	name: "FUGU",
	website: "https://www.fugu-it.com",
	description: "FUGU is a payment fraud prevention solution that analyzes transactions both before and after checkout.",
	icon: "FUGU.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "fugu:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.fugu-it\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
