import type { TechnologyDefinition } from '../../types';

export const juicyadsTechnologyDefinition = {
	id: "juicyads",
	name: "JuicyAds",
	website: "https://www.juicyads.com",
	description: "JuicyAds is a legitimate advertising network that specializes in adult content.",
	icon: "JuicyAds.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "juicyads:jsGlobal:0",
			kind: "jsGlobal",
			property: "adsbyjuicy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
