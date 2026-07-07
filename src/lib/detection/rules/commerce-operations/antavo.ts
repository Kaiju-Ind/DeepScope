import type { TechnologyDefinition } from '../../types';

export const antavoTechnologyDefinition = {
	id: "antavo",
	name: "Antavo",
	website: "https://antavo.com",
	description: "Antavo is a software platform that provides AI-driven loyalty and promotion management solutions to help businesses design, automate, and analyze customer reward programs.",
	icon: "Antavo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "antavo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.antavo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "antavo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Antavo.AJAX",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
