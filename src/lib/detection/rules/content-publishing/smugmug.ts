import type { TechnologyDefinition } from '../../types';

export const smugmugTechnologyDefinition = {
	id: "smugmug",
	name: "SmugMug",
	website: "https://www.smugmug.com",
	description: "SmugMug is a paid image sharing, image hosting service, and online video platform on which users can upload photos and videos.",
	icon: "SmugMug.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "smugmug:dom:0",
			kind: "dom",
			selector: ".sm-page-footer-copyright",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "smugmug:text:1",
			kind: "text",
			pattern: new RegExp("SmugMug"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "smugmug:jsGlobal:2",
			kind: "jsGlobal",
			property: "_smugsp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
