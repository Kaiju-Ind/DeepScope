import type { TechnologyDefinition } from '../../types';

export const clickyTechnologyDefinition = {
	id: "clicky",
	name: "Clicky",
	website: "https://getclicky.com",
	description: "Clicky is web an analytics tool which helps you to get real-time analysis including spy view.",
	icon: "Clicky.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "clicky:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.getclicky\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clicky:jsGlobal:1",
			kind: "jsGlobal",
			property: "clicky",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
