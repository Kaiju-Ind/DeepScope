import type { TechnologyDefinition } from '../../types';

export const trustspotTechnologyDefinition = {
	id: "trustspot",
	name: "Trustspot",
	website: "https://trustspot.io/",
	description: "TrustSpot provides a solution to capture ratings & reviews, video testimonials, photos, social experiences, and product Q&A.",
	icon: "Trustspot.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "trustspot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trustspot\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trustspot:jsGlobal:1",
			kind: "jsGlobal",
			property: "trustspot_key",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
