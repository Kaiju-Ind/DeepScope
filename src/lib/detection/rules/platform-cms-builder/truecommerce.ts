import type { TechnologyDefinition } from '../../types';

export const truecommerceTechnologyDefinition = {
	id: "truecommerce",
	name: "TrueCommerce",
	website: "https://www.truecommerce.com",
	description: "TrueCommerce is an eCommerce platform.",
	icon: "Truecommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "truecommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.nexternal\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
