import type { TechnologyDefinition } from '../../types';

export const redonnerTechnologyDefinition = {
	id: "redonner",
	name: "Redonner",
	website: "https://www.redonner.fr",
	description: "This company promotes the collection and recycling of textiles by rewarding each donation of clothing made on its website with 'Re' points, allowing you to benefit from advantages and discounts at more than 70 partner brands.",
	icon: "Redonner.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "redonner:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.redonner\\.fr\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
