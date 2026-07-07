import type { TechnologyDefinition } from '../../types';

export const kamoziTechnologyDefinition = {
	id: "kamozi",
	name: "Kamozi",
	website: "https://kamozi.io",
	description: "Kamozi is a system designed to support brand growth and increase ecommerce revenue through integrated tools and strategies.",
	icon: "Kamozi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kamozi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trust\\.kamozi\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kamozi:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.kamozi\\.io"),
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
