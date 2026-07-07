import type { TechnologyDefinition } from '../../types';

export const magniteTechnologyDefinition = {
	id: "magnite",
	name: "Magnite",
	website: "https://www.magnite.com",
	description: "Magnite is an independent sell-side advertising platform that provides technology for publishers to monetize digital advertising inventory across various formats.",
	icon: "Magnite.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "magnite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.spotx\\.tv"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "magnite:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.spotx(?:change|cdn)\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "magnite:dom:2",
			kind: "dom",
			selector: "link[href*='.spotxchange.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "magnite:jsGlobal:3",
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
