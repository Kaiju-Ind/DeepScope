import type { TechnologyDefinition } from '../../types';

export const superpwaTechnologyDefinition = {
	id: "superpwa",
	name: "SuperPWA",
	website: "https://superpwa.com",
	description: "SuperPWA helps to easily convert your WordPress website into Progressive Web Apps instantly through our widely used PWA software without in coding.",
	icon: "superpwa.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "superpwa:jsGlobal:0",
			kind: "jsGlobal",
			property: "superpwa_sw",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
			"recurring",
		],
	},
	implies: [
		"pwa",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
