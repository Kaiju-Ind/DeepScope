import type { TechnologyDefinition } from '../../types';

export const flexbeTechnologyDefinition = {
	id: "flexbe",
	name: "Flexbe",
	website: "https://flexbe.com",
	description: "Flexbe is a website and landing page builder that allows users to create and design web pages without coding.",
	icon: "Flexbe.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flexbe:jsGlobal:0",
			kind: "jsGlobal",
			property: "flexbe_cli.adaptive",
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
} as const satisfies TechnologyDefinition;
