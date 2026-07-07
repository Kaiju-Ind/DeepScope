import type { TechnologyDefinition } from '../../types';

export const reaktionTechnologyDefinition = {
	id: "reaktion",
	name: "Reaktion",
	website: "https://reaktion.com",
	description: "Reaktion is a provider of ecommerce solutions designed to help businesses enhance their online profits.",
	icon: "Reaktion.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "reaktion:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.reaktion\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "reaktion:jsGlobal:1",
			kind: "jsGlobal",
			property: "reaktionLock",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
