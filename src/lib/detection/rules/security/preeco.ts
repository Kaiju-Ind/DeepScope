import type { TechnologyDefinition } from '../../types';

export const preecoTechnologyDefinition = {
	id: "preeco",
	name: "Preeco",
	website: "https://www.preeco.de",
	description: "Preeco is a software solution for data protection, information security, and whistleblower reporting systems.",
	icon: "Preeco.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "preeco:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.preeco\\.de"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "preeco:jsGlobal:1",
			kind: "jsGlobal",
			property: "PreecoWidgets",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
