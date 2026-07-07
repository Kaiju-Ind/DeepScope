import type { TechnologyDefinition } from '../../types';

export const matajerTechnologyDefinition = {
	id: "matajer",
	name: "Matajer",
	website: "https://mapp.sa",
	description: "Matajer is an ecommerce platform from Saudi Arabia.",
	icon: "Matajer.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "matajer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.mapp\\.sa\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
