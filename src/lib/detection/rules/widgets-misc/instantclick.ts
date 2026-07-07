import type { TechnologyDefinition } from '../../types';

export const instantclickTechnologyDefinition = {
	id: "instantclick",
	name: "InstantClick",
	website: "https://instantclick.io/",
	description: "InstantClick is a JavaScript library that speeds up your website, making navigation faster.",
	icon: "InstantClick.svg",
	categories: [
		"widgets-misc",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "instantclick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("instantclick\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "instantclick:jsGlobal:1",
			kind: "jsGlobal",
			property: "InstantClick",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
