import type { TechnologyDefinition } from '../../types';

export const fathershopsTechnologyDefinition = {
	id: "fathershops",
	name: "FatherShops",
	website: "https://fathershops.com",
	description: "FatherShops is an ecommerce platform.",
	icon: "FatherShops.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fathershops:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fathershop\\/view\\/theme\\/fs\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	excludes: [
		"opencart",
	],
} as const satisfies TechnologyDefinition;
