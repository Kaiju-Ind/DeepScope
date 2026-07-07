import type { TechnologyDefinition } from '../../types';

export const readyplanetTechnologyDefinition = {
	id: "readyplanet",
	name: "ReadyPlanet",
	website: "https://www.readyplanet.com",
	description: "ReadyPlanet is a marketing platform from Thailand, offering various widgets to support businesses in their online marketing efforts.",
	icon: "ReadyPlanet.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "readyplanet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.readyplanet\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "readyplanet:dom:1",
			kind: "dom",
			selector: "link[href*='rwidget.readyplanet.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
