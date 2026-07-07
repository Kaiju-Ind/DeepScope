import type { TechnologyDefinition } from '../../types';

export const pixelezeTechnologyDefinition = {
	id: "pixeleze",
	name: "Pixeleze",
	website: "https://pixeleze.com",
	description: "Pixeleze is an affiliate-based tracking system for ecommerce that records referral activity and links sales performance to corresponding affiliate sources.",
	icon: "Pixeleze.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "pixeleze:jsGlobal:0",
			kind: "jsGlobal",
			property: "Pixeleze",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
