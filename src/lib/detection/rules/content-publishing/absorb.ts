import type { TechnologyDefinition } from '../../types';

export const absorbTechnologyDefinition = {
	id: "absorb",
	name: "Absorb",
	website: "https://www.absorblms.com",
	description: "Absorb is a cloud-based learning management system.",
	icon: "Absorb.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "absorb:jsGlobal:0",
			kind: "jsGlobal",
			property: "AbsorbLMS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "absorb:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_absorb_ui_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
