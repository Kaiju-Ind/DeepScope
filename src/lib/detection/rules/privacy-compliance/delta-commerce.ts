import type { TechnologyDefinition } from '../../types';

export const deltaCommerceTechnologyDefinition = {
	id: "delta-commerce",
	name: "Delta Commerce",
	website: "https://www.deltacommerce.com",
	description: "Delta Commerce is a cookie registration and consent management platform that enables websites to comply with privacy regulations by collecting, storing, and managing user consent preferences.",
	icon: "DeltaCommerce.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "delta-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.deltacommerce\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
