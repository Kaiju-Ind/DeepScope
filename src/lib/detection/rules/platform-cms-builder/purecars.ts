import type { TechnologyDefinition } from '../../types';

export const purecarsTechnologyDefinition = {
	id: "purecars",
	name: "PureCars",
	website: "https://www.purecars.com",
	description: "PureCars is an automotive software and managed services company serving dealerships, advertising associations, and OEMs across the North American retail automotive industry.",
	icon: "PureCars.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "purecars:dom:0",
			kind: "dom",
			selector: "a[href*='app.purecars.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "purecars:jsGlobal:1",
			kind: "jsGlobal",
			property: "_pureCars",
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
