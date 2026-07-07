import type { TechnologyDefinition } from '../../types';

export const elementorCloudTechnologyDefinition = {
	id: "elementor-cloud",
	name: "Elementor Cloud",
	website: "https://elementor.com",
	description: "Elementor Cloud is a platform for creating and hosting WordPress websites with Elementor.",
	icon: "Elementor.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "elementor-cloud:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("Elementor Cloud", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "elementor-cloud:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("elementor cloud", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"elementor",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
