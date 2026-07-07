import type { TechnologyDefinition } from '../../types';

export const thecutTechnologyDefinition = {
	id: "thecut",
	name: "theCut",
	website: "https://thecut.co",
	description: "theCut is a barber booking app that allows users to schedule appointments with barbers through a centralized digital platform.",
	icon: "theCut.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "thecut:dom:0",
			kind: "dom",
			selector: "iframe[src*='.thecut.co']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
