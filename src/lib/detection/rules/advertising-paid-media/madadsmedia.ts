import type { TechnologyDefinition } from '../../types';

export const madadsmediaTechnologyDefinition = {
	id: "madadsmedia",
	name: "MadAdsMedia",
	website: "https://madadsmedia.com",
	icon: "MadAdsMedia.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "madadsmedia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/(?:ads-by|pixel)\\.madadsmedia\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "madadsmedia:jsGlobal:1",
			kind: "jsGlobal",
			property: "setMIframe",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "madadsmedia:jsGlobal:2",
			kind: "jsGlobal",
			property: "setMRefURL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
