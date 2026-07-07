import type { TechnologyDefinition } from '../../types';

export const accessgoTechnologyDefinition = {
	id: "accessgo",
	name: "AccessGo",
	website: "https://www.accessgo.de",
	description: "AccessGo is a digital accessibility solution that provides tools and on-site widgets to help websites meet recognized accessibility standards and enhance usability across diverse user needs.",
	icon: "AccessGo.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "accessgo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.accessgo\\.de"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
