import type { TechnologyDefinition } from '../../types';

export const luckyOrangeTechnologyDefinition = {
	id: "lucky-orange",
	name: "Lucky Orange",
	website: "https://www.luckyorange.com",
	description: "Lucky Orange is a conversion optimisation tool with features including heatmaps, session recording, conversion funnels, form analytics, and chat.",
	icon: "Lucky Orange.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "lucky-orange:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.luckyorange\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lucky-orange:dom:1",
			kind: "dom",
			selector: "link[href*='.luckyorange.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "lucky-orange:jsGlobal:2",
			kind: "jsGlobal",
			property: "__wtw_lucky_site_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
