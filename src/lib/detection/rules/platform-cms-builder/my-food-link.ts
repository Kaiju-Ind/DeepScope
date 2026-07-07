import type { TechnologyDefinition } from '../../types';

export const myFoodLinkTechnologyDefinition = {
	id: "my-food-link",
	name: "My Food Link",
	website: "https://www.myfoodlink.com.au",
	description: "My Food Link provides a fully hosted specialist online supermarket ecommerce platform to supermarkets and grocers.",
	icon: "My Food Link.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "my-food-link:jsGlobal:0",
			kind: "jsGlobal",
			property: "Myfoodlink",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "my-food-link:jsGlobal:1",
			kind: "jsGlobal",
			property: "myfoodlink",
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
