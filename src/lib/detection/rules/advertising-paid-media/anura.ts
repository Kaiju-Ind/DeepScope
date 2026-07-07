import type { TechnologyDefinition } from '../../types';

export const anuraTechnologyDefinition = {
	id: "anura",
	name: "Anura",
	website: "https://www.anura.io",
	description: "Anura is an ad fraud detection solution designed to identify and mitigate fraudulent activity across digital advertising platforms.",
	icon: "Anura.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "anura:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.anura\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "anura:jsGlobal:1",
			kind: "jsGlobal",
			property: "Anura",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "anura:jsGlobal:2",
			kind: "jsGlobal",
			property: "_anuraResFun",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
