import type { TechnologyDefinition } from '../../types';

export const bazaarvoiceReviewsTechnologyDefinition = {
	id: "bazaarvoice-reviews",
	name: "Bazaarvoice Reviews",
	website: "https://www.bazaarvoice.com/products/ratings-and-reviews/",
	description: "Bazaarvoice is a provider of user-generated content solutions like ratings and reviews and Q&A.",
	icon: "Bazaarvoice.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "bazaarvoice-reviews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.bazaarvoice\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bazaarvoice-reviews:jsGlobal:1",
			kind: "jsGlobal",
			property: "BV.api",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bazaarvoice-reviews:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("apps\\.bazaarvoice\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
