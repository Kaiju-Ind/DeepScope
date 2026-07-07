import type { TechnologyDefinition } from '../../types';

export const refinerTechnologyDefinition = {
	id: "refiner",
	name: "Refiner",
	website: "https://refiner.io",
	description: "Refiner provides a survey solution designed to help SaaS companies get more survey responses and gain a better understanding of their users.",
	icon: "Refiner.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "refiner:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.refiner\\.io\\/v([\\d]+)\\/client\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "refiner:dom:1",
			kind: "dom",
			selector: "div#refiner-widget-wrapper",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "refiner:jsGlobal:2",
			kind: "jsGlobal",
			property: "_refiner",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "refiner:jsGlobal:3",
			kind: "jsGlobal",
			property: "_refinerAlreadyBooted",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "refiner:jsGlobal:4",
			kind: "jsGlobal",
			property: "_refinerQueue",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "refiner:jsGlobal:5",
			kind: "jsGlobal",
			property: "_refinerTracker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
