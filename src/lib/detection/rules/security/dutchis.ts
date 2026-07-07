import type { TechnologyDefinition } from '../../types';

export const dutchisTechnologyDefinition = {
	id: "dutchis",
	name: "DutchIS",
	website: "https://dutchis.net",
	description: "DutchIS is a web application front service that monitors, protects, cleans, and secures web traffic for websites.",
	icon: "DutchIS.svg",
	categories: [
		"security",
	],
	rules: [],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
