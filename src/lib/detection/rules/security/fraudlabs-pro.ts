import type { TechnologyDefinition } from '../../types';

export const fraudlabsProTechnologyDefinition = {
	id: "fraudlabs-pro",
	name: "FraudLabs Pro",
	website: "https://www.fraudlabspro.com",
	description: "FraudLabs Pro is a fraud prevention service offered by the company FraudLabs Pro, which specialises in online fraud detection and risk management for businesses.",
	icon: "FraudLabs Pro.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "fraudlabs-pro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fraudlabspro\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fraudlabs-pro:jsGlobal:1",
			kind: "jsGlobal",
			property: "FraudLabsProAgent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
