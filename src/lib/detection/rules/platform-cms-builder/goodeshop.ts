import type { TechnologyDefinition } from '../../types';

export const goodeshopTechnologyDefinition = {
	id: "goodeshop",
	name: "GoodEshop",
	website: "https://goodeshop.sk",
	description: "GoodEshop is an online ecommerce management tool.",
	icon: "GoodEshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "goodeshop:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.goodeshop\\.sk"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
