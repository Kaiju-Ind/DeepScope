import type { TechnologyDefinition } from '../../types';

export const reviewsolicitorsTechnologyDefinition = {
	id: "reviewsolicitors",
	name: "ReviewSolicitors",
	website: "https://www.reviewsolicitors.co.uk",
	description: "ReviewSolicitors is a free and independent client-led review platform focusing on the UK legal market.",
	icon: "ReviewSolicitors.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reviewsolicitors:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reviewsolicitors\\.co\\.uk\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reviewsolicitors:jsGlobal:1",
			kind: "jsGlobal",
			property: "rs.getWidgetHtml",
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
