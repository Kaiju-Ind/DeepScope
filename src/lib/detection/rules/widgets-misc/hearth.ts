import type { TechnologyDefinition } from '../../types';

export const hearthTechnologyDefinition = {
	id: "hearth",
	name: "Hearth",
	website: "https://gethearth.com",
	description: "Hearth is a financial services platform that provides financing options for home improvement projects.",
	icon: "Hearth.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "hearth:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.gethearth\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
