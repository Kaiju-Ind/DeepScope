import type { TechnologyDefinition } from '../../types';

export const pandectesGdprComplianceTechnologyDefinition = {
	id: "pandectes-gdpr-compliance",
	name: "Pandectes GDPR Compliance",
	website: "https://pandectes.io",
	description: "Pandectes GDPR Compliance is a solution for Shopify stores, ensuring compliance with GDPR, CCPA/CPRA, VCDPA, APPI, PIPEDA, and PDPA regulations.",
	icon: "PandectesGDPRCompliance.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "pandectes-gdpr-compliance:jsGlobal:0",
			kind: "jsGlobal",
			property: "Pandectes",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes-gdpr-compliance:jsGlobal:1",
			kind: "jsGlobal",
			property: "PandectesBlocker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes-gdpr-compliance:jsGlobal:2",
			kind: "jsGlobal",
			property: "PandectesCore",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes-gdpr-compliance:jsGlobal:3",
			kind: "jsGlobal",
			property: "PandectesGeolocation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes-gdpr-compliance:jsGlobal:4",
			kind: "jsGlobal",
			property: "PandectesRules",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes-gdpr-compliance:jsGlobal:5",
			kind: "jsGlobal",
			property: "PandectesSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
