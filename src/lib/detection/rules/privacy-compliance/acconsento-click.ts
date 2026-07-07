import type { TechnologyDefinition } from '../../types';

export const acconsentoClickTechnologyDefinition = {
	id: "acconsento-click",
	name: "Acconsento.click",
	website: "https://shop.acconsento.click",
	description: "Acconsento.click is a software solution designed to assist users in achieving cookie policy compliance for their websites.",
	icon: "Acconsento.click.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "acconsento-click:dom:0",
			kind: "dom",
			selector: "link[href*='//acconsento.click/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "acconsento-click:jsGlobal:1",
			kind: "jsGlobal",
			property: "AcconsentoAPI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acconsento-click:jsGlobal:2",
			kind: "jsGlobal",
			property: "acconsentoCreateElement",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
