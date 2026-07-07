import type { TechnologyDefinition } from '../../types';

export const verfactoTechnologyDefinition = {
	id: "verfacto",
	name: "Verfacto",
	website: "https://www.verfacto.com",
	description: "Verfacto is a marketing analytics tool for eCommerce that identifies factors influencing customer behavior and reveals what converts visitors into customers.",
	icon: "Verfacto.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "verfacto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.verfacto\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "verfacto:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("analytics\\.verfacto\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "verfacto:jsGlobal:2",
			kind: "jsGlobal",
			property: "VerfactoEntryPoint",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "verfacto:jsGlobal:3",
			kind: "jsGlobal",
			property: "VerfactoTracker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
