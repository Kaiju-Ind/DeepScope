import type { TechnologyDefinition } from '../../types';

export const azuracastTechnologyDefinition = {
	id: "azuracast",
	name: "AzuraCast",
	website: "https://www.azuracast.com",
	description: "AzuraCast is an open-source self-hosted web radio station in a box.",
	icon: "AzuraCast.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "azuracast:dom:0",
			kind: "dom",
			selector: "link[href*='/public/azuratest_radio/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "azuracast:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/static\\/vite_dist\\/assets\\/(?:Layout|Login)-"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "azuracast:dom:2",
			kind: "dom",
			selector: "footer a[href='https://azuracast.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:azuracast:azuracast:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
