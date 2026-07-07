import type { TechnologyDefinition } from '../../types';

export const ugcCreativeTechnologyDefinition = {
	id: "ugc-creative",
	name: "UGC Creative",
	website: "https://ugc-creative.com/",
	description: "UGC Creative is a tool that utilises reviews, Instagram, and TikTok user-generated content on websites to enhance conversion rates and customer lifetime value.",
	categories: [
		"community-ugc",
		"marketing-automation",
	],
	rules: [
		{
			id: "ugc-creative:jsGlobal:0",
			kind: "jsGlobal",
			property: "UgcCreativeReview",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ugc-creative:jsGlobal:1",
			kind: "jsGlobal",
			property: "ugcReview.prototype._display_item_count",
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
