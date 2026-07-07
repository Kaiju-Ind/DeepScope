import type { TechnologyDefinition } from '../../types';

export const hikeordersTechnologyDefinition = {
	id: "hikeorders",
	name: "HikeOrders",
	website: "https://hikeorders.com/",
	description: "HikeOrders is a web accessibility overlay that claims to make your site disability friendly.",
	icon: "HikeOrders.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "hikeorders:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("hikeorders\\.com\\/main\\/assets\\/js\\/hko-accessibility\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
