import type { TechnologyDefinition } from '../../types';

export const consentManagerTechnologyDefinition = {
	id: "consent-manager",
	name: "Consent Manager",
	website: "https://www.consentmanager.net",
	description: "Consent Manager is a provider ensuring GDPR and CCPA compliance for websites.",
	icon: "ConsentManager.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "consent-manager:jsGlobal:0",
			kind: "jsGlobal",
			property: "cmpCCPA",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "consent-manager:jsGlobal:1",
			kind: "jsGlobal",
			property: "cmpConsentPurposes",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "consent-manager:jsGlobal:2",
			kind: "jsGlobal",
			property: "cmpConsentString",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "consent-manager:jsGlobal:3",
			kind: "jsGlobal",
			property: "cmpCustomPurposeConsent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "consent-manager:jsGlobal:4",
			kind: "jsGlobal",
			property: "cmpGDPR",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "consent-manager:jsGlobal:5",
			kind: "jsGlobal",
			property: "cmpGoogleVendorsConsent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "consent-manager:jsGlobal:6",
			kind: "jsGlobal",
			property: "cmp_closevendor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "consent-manager:jsGlobal:7",
			kind: "jsGlobal",
			property: "cmp_vendordelivery",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "consent-manager:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^__cmpcccx274$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "consent-manager:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^__cmpconsentx274$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "consent-manager:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^__cmpiuid$", "i"),
			description: "Cookie name matches a known technology marker.",
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
