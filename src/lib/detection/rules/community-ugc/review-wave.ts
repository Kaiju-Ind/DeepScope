import type { TechnologyDefinition } from '../../types';

export const reviewWaveTechnologyDefinition = {
	id: "review-wave",
	name: "Review Wave",
	website: "https://www.reviewwave.com",
	description: "Review Wave is reputation management software that helps business owners obtain reviews on trusted websites to boost growth.",
	icon: "ReviewWave.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "review-wave:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.reviewwave\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "review-wave:jsGlobal:1",
			kind: "jsGlobal",
			property: "RWEmbedJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "review-wave:jsGlobal:2",
			kind: "jsGlobal",
			property: "_rwReviewEmbed",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
