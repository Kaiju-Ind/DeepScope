import type { TechnologyDefinition } from '../../types';

export const signCustomiserTechnologyDefinition = {
	id: "sign-customiser",
	name: "Sign Customiser",
	website: "https://www.signcustomiser.com",
	description: "Sign Customiser is a tool for generating sign quotes for online stores, designed to help increase sales and streamline shipping logistics.",
	icon: "SignCustomiser.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sign-customiser:jsGlobal:0",
			kind: "jsGlobal",
			property: "signCustomiserEmbedScript",
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
