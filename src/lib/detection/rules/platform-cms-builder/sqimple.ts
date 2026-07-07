import type { TechnologyDefinition } from '../../types';

export const sqimpleTechnologyDefinition = {
	id: "sqimple",
	name: "Sqimple",
	website: "https://sqimple.com",
	description: "Sqimple is an all-in-one ecommerce platform that helps businesses sell more online.",
	icon: "Sqimple.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sqimple:jsGlobal:0",
			kind: "jsGlobal",
			property: "SqimpleCartManager",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sqimple:jsGlobal:1",
			kind: "jsGlobal",
			property: "sqimpleGoogleMapApiLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
