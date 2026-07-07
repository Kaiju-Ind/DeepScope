import type { TechnologyDefinition } from '../../types';

export const pushadTechnologyDefinition = {
	id: "pushad",
	name: "PushAd",
	website: "https://push-ad.com/en/home-page",
	description: "PushAd is a notification system from Poland.",
	icon: "PushAd.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pushad:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.push-ad\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pushad:jsGlobal:1",
			kind: "jsGlobal",
			property: "PushAdReady",
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
