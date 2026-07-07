import type { TechnologyDefinition } from '../../types';

export const doteasyTechnologyDefinition = {
	id: "doteasy",
	name: "Doteasy",
	website: "https://www.doteasy.com",
	description: "Doteasy is a web hosting company that provides web hosting services, domain registration, and other related services for businesses and individuals. The company was founded in 2000 and is based in Vancouver, Canada.",
	icon: "Doteasy.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
