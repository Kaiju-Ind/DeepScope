import type { TechnologyDefinition } from '../../types';

export const ventasxmayorTechnologyDefinition = {
	id: "ventasxmayor",
	name: "VentasxMayor",
	website: "https://ventasxmayor.com",
	description: "VentasxMayor is an ecommerce platform designed for wholesalers, brands, distributors, and importers to streamline and increase wholesale sales.",
	icon: "VentasxMayor.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ventasxmayor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bunny-cdn\\.ventasxmayor\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
