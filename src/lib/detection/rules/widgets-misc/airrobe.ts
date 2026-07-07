import type { TechnologyDefinition } from '../../types';

export const airrobeTechnologyDefinition = {
	id: "airrobe",
	name: "AirRobe",
	website: "https://airrobe.com",
	description: "AirRobe partners with brands and retailers to power the circular fashion economy.",
	icon: "AirRobe.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "airrobe:jsGlobal:0",
			kind: "jsGlobal",
			property: "airrobe.app_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
