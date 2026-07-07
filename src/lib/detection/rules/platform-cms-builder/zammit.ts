import type { TechnologyDefinition } from '../../types';

export const zammitTechnologyDefinition = {
	id: "zammit",
	name: "Zammit",
	website: "https://www.zammit.shop",
	description: "Zammit is an ecommerce platform based in Egypt.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zammit:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("merchants\\.zammit\\.shop\\/"),
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
