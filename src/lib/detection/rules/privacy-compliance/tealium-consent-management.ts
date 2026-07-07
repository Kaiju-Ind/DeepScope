import type { TechnologyDefinition } from '../../types';

export const tealiumConsentManagementTechnologyDefinition = {
	id: "tealium-consent-management",
	name: "Tealium Consent Management",
	website: "https://docs.tealium.com/platforms/getting-started/consent-management",
	description: "Tealium Consent Management adds consent and data privacy support.",
	icon: "Tealium.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "tealium-consent-management:dom:0",
			kind: "dom",
			selector: "script#__tealiumGDPRecScript,div#__tealiumGDPRecModal",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
