import type { TechnologyDefinition } from '../../types';

export const contactusTechnologyDefinition = {
	id: "contactus",
	name: "ContactUs",
	website: "https://contactus.com",
	description: "ContactUs is a custom ecommerce development and online marketing platform offering customer acquisition and prospect management solutions.",
	icon: "ContactUs.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "contactus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.contactus\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
