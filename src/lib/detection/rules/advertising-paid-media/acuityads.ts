import type { TechnologyDefinition } from '../../types';

export const acuityadsTechnologyDefinition = {
	id: "acuityads",
	name: "AcuityAds",
	website: "https://www.acuityads.com",
	description: "AcuityAds offers automatic solutions to marketers willing to connect through clients across mobile, social, and online display advertising campaigns.",
	icon: "AcuityAds.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "acuityads:jsGlobal:0",
			kind: "jsGlobal",
			property: "acuityAdsEventQueue",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acuityads:jsGlobal:1",
			kind: "jsGlobal",
			property: "acuityAdsPixelKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acuityads:header:2",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.acuityplatform\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "acuityads:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.acuityplatform\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
