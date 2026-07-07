import type { TechnologyDefinition } from '../../types';

export const rualTechnologyDefinition = {
	id: "rual",
	name: "Rual",
	website: "https://rual.nl",
	description: "Rual is a software development platform that designs and builds tailor-made digital solutions to meet specific business or operational requirements.",
	icon: "Rual.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "rual:jsGlobal:0",
			kind: "jsGlobal",
			property: "RUALCONFIG.api",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
