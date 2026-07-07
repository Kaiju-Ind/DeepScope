import type { TechnologyDefinition } from '../../types';

export const jaliosTechnologyDefinition = {
	id: "jalios",
	name: "Jalios",
	website: "https://www.jalios.com",
	description: "Jalios provides digital workplace solutions, including collaborative intranets, enterprise social networks, and document management systems, to enhance organizational communication and productivity.",
	icon: "Jalios.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jalios:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Jalios", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "jalios:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("jalios", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
