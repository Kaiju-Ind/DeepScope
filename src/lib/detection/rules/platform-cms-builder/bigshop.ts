import type { TechnologyDefinition } from '../../types';

export const bigshopTechnologyDefinition = {
	id: "bigshop",
	name: "Bigshop",
	website: "https://www.bigshop.com.br",
	description: "Bigshop is a platform for creating and managing online stores.",
	icon: "Bigshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bigshop:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.bigshop\\.com\\.br"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
