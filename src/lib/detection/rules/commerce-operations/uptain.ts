import type { TechnologyDefinition } from '../../types';

export const uptainTechnologyDefinition = {
	id: "uptain",
	name: "Uptain",
	website: "https://uptain.de",
	description: "Uptain is a software solution designed to reduce shopping cart abandonment in ecommerce by utilizing AI-based tools like exit-intent popups and trigger emails.",
	icon: "Uptain.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "uptain:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.uptain\\.de\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uptain:jsGlobal:1",
			kind: "jsGlobal",
			property: "uptainUpdateUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
