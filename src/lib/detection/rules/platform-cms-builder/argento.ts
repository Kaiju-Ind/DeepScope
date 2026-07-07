import type { TechnologyDefinition } from '../../types';

export const argentoTechnologyDefinition = {
	id: "argento",
	name: "Argento",
	website: "https://argentotheme.com",
	description: "Argento is an optimised and a responsive Magento template designed to enhance website performance and improve user experience.",
	icon: "Argento.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "argento:jsGlobal:0",
			kind: "jsGlobal",
			property: "Argento",
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
	implies: [
		"magento",
	],
} as const satisfies TechnologyDefinition;
