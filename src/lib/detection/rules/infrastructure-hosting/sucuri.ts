import type { TechnologyDefinition } from '../../types';

export const sucuriTechnologyDefinition = {
	id: "sucuri",
	name: "Sucuri",
	website: "https://sucuri.net/",
	description: "Sucuri is a cybersecurity company that provides website security solutions and services.",
	icon: "sucuri.png",
	categories: [
		"infrastructure-hosting",
		"wordpress-ecosystem",
		"security",
	],
	rules: [],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
