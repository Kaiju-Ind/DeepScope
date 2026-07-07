import type { TechnologyDefinition } from '../../types';

export const hashtagLabsTechnologyDefinition = {
	id: "hashtag-labs",
	name: "Hashtag Labs",
	website: "https://hashtag-labs.com",
	description: "Hashtag Labs is a full-service digital ad operations company.",
	icon: "Hashtag Labs.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "hashtag-labs:dom:0",
			kind: "dom",
			selector: "link[href*='//htlbid.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hashtag-labs:jsGlobal:1",
			kind: "jsGlobal",
			property: "htlbid.cmd",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
