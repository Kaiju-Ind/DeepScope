import type { TechnologyDefinition } from '../../types';

export const demioTechnologyDefinition = {
	id: "demio",
	name: "Demio",
	website: "https://www.demio.com",
	description: "Demio is a webinar platform designed for marketing purposes.",
	icon: "Demio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "demio:dom:0",
			kind: "dom",
			selector: "script#demio-js",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "demio:jsGlobal:1",
			kind: "jsGlobal",
			property: "DEMIO_API_URI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
