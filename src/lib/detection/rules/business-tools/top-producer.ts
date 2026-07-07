import type { TechnologyDefinition } from '../../types';

export const topProducerTechnologyDefinition = {
	id: "top-producer",
	name: "Top Producer",
	website: "https://www.topproducer.com",
	description: "Top Producer is an all-in-one business management platform, tailored for real estate as a CRM solution.",
	icon: "TopProducer.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "top-producer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.topproducerwebsite\\.com\\/"),
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
