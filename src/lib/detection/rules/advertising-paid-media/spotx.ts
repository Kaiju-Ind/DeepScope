import type { TechnologyDefinition } from '../../types';

export const spotxTechnologyDefinition = {
	id: "spotx",
	name: "SpotX",
	website: "https://www.spotx.tv",
	description: "SpotX is a video advertising platform.",
	icon: "SpotX.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "spotx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.spotx\\.tv"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spotx:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.spotx(?:change|cdn)\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "spotx:dom:2",
			kind: "dom",
			selector: "link[href*='.spotxchange.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "spotx:jsGlobal:3",
			kind: "jsGlobal",
			property: "SpotX.VERSION",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
