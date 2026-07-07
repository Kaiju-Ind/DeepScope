import type { TechnologyDefinition } from '../../types';

export const mendixTechnologyDefinition = {
	id: "mendix",
	name: "Mendix",
	website: "https://www.mendix.com",
	description: "Mendix is a low-code platform utilized by businesses for development of mobile and web applications at scale.",
	icon: "Mendix.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "mendix:dom:0",
			kind: "dom",
			selector: "script[type='mendix/widget']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mendix:jsGlobal:1",
			kind: "jsGlobal",
			property: "CKEditorForMendix",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mendix:jsGlobal:2",
			kind: "jsGlobal",
			property: "mendix",
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
		cpe: "cpe:2.3:a:mendix:mendix:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
