import type { TechnologyDefinition } from '../../types';

export const ultimateGdprAndCcpaTechnologyDefinition = {
	id: "ultimate-gdpr-and-ccpa",
	name: "Ultimate GDPR & CCPA",
	website: "https://www.createit.com/gdpr",
	description: "Ultimate GDPR & CCPA is a compliance toolkit for WordPress by createIT.",
	icon: "Ultimate GDPR & CCPA.png",
	categories: [
		"privacy-compliance",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "ultimate-gdpr-and-ccpa:jsGlobal:0",
			kind: "jsGlobal",
			property: "ct_ultimate_gdpr_cookie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
