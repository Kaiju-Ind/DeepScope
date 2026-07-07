import type { TechnologyDefinition } from '../../types';

export const alchemerMobileTechnologyDefinition = {
	id: "alchemer-mobile",
	name: "Alchemer Mobile",
	website: "https://www.alchemer.com/mobile/",
	description: "Alchemer Mobile, formerly known as Apptentive, is a tool optimized for mobile, consolidating app-store ratings, reviews, in-app customer feedback, emotion data, and key metrics in one dashboard.",
	icon: "AlchemerMobile.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "alchemer-mobile:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.apptentive\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "alchemer-mobile:jsGlobal:1",
			kind: "jsGlobal",
			property: "ApptentiveSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "alchemer-mobile:jsGlobal:2",
			kind: "jsGlobal",
			property: "ApptentiveSDK.sdk.version",
			valuePattern: new RegExp("^([\\d\\.])$"),
			version: {
				source: "match",
				group: 1,
			},
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
