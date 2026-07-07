import type { TechnologyDefinition } from '../../types';

export const digiohTechnologyDefinition = {
	id: "digioh",
	name: "Digioh",
	website: "https://www.digioh.com/",
	description: "Digioh is a lead generation and marketing company helping to convert clicks to customers known for it's email/sms sign-up units",
	icon: "Digioh.png",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "digioh:jsGlobal:0",
			kind: "jsGlobal",
			property: "DIGIOH_API",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
