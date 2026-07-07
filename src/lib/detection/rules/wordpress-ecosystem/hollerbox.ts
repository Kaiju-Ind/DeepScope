import type { TechnologyDefinition } from '../../types';

export const hollerboxTechnologyDefinition = {
	id: "hollerbox",
	name: "HollerBox",
	website: "https://hollerwp.com",
	description: "HollerBox is a lead generation popup tool for WordPress.",
	icon: "HollerBox.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "hollerbox:jsGlobal:0",
			kind: "jsGlobal",
			property: "HollerBox.active",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
