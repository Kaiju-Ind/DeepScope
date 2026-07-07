import type { TechnologyDefinition } from '../../types';

export const liveintentTechnologyDefinition = {
	id: "liveintent",
	name: "LiveIntent",
	website: "https://www.liveintent.com",
	description: "LiveIntent is an email ad monetization platform.",
	icon: "LiveIntent.svg",
	categories: [
		"email-messaging",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "liveintent:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.liadm\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "liveintent:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.liadm\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "liveintent:jsGlobal:2",
			kind: "jsGlobal",
			property: "LI.advertiserId",
			valuePattern: new RegExp("\\d+"),
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
