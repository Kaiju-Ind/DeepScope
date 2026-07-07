import type { TechnologyDefinition } from '../../types';

export const powerreviewsTechnologyDefinition = {
	id: "powerreviews",
	name: "PowerReviews",
	website: "https://www.powerreviews.com/",
	description: "Powerreviews is a provider of UGC solutions like ratings and reviews.",
	icon: "PowerReviews.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "powerreviews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ui\\.powerreviews\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "powerreviews:jsGlobal:1",
			kind: "jsGlobal",
			property: "POWERREVIEWS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
