import type { TechnologyDefinition } from '../../types';

export const crownpeakUniversalConsentPlatformTechnologyDefinition = {
	id: "crownpeak-universal-consent-platform",
	name: "CrownPeak Universal Consent Platform",
	website: "https://www.crownpeak.com/products/privacy-and-consent-management",
	description: "CrownPeak Universal Consent Platform is a tool for managing user consent and ensuring compliance with data privacy regulations.",
	icon: "CrownPeak.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "crownpeak-universal-consent-platform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.evidon\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crownpeak-universal-consent-platform:dom:1",
			kind: "dom",
			selector: "a[href*='info.evidon.com/pub_info/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "crownpeak-universal-consent-platform:jsGlobal:2",
			kind: "jsGlobal",
			property: "EB.EvidonConsent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crownpeak-universal-consent-platform:jsGlobal:3",
			kind: "jsGlobal",
			property: "evidon",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
