import type { TechnologyDefinition } from '../../types';

export const webydoTechnologyDefinition = {
	id: "webydo",
	name: "Webydo",
	website: "https://www.webydo.com",
	description: "Webydo is an online website generator that enables users to create websites without coding.",
	icon: "Webydo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webydo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("global\\.webydo\\.com\\/"),
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
