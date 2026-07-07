import type { TechnologyDefinition } from '../../types';

export const vfinderTechnologyDefinition = {
	id: "vfinder",
	name: "Vfinder",
	website: "https://vfinder.io",
	description: "Vfinder is a platform where users can sell and display coordinated items and recommended items simultaneously.",
	icon: "Vfinder.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vfinder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^(https?:)?\\/\\/vfinder\\.io\\/js\\/viewfinder\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vfinder:jsGlobal:1",
			kind: "jsGlobal",
			property: "VfinderGetCookie",
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
