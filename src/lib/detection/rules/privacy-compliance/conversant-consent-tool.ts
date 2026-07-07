import type { TechnologyDefinition } from '../../types';

export const conversantConsentToolTechnologyDefinition = {
	id: "conversant-consent-tool",
	name: "Conversant Consent Tool",
	website: "https://www.conversantmedia.eu/consent-tool",
	description: "Conversant Consent Tool is a free tool to gain GDPR and ePD compliant consent for digital advertising.",
	icon: "Conversant.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "conversant-consent-tool:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.conversant\\.mgr\\.consensu\\.org\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "conversant-consent-tool:jsGlobal:1",
			kind: "jsGlobal",
			property: "conversant",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
