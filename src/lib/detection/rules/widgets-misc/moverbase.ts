import type { TechnologyDefinition } from '../../types';

export const moverbaseTechnologyDefinition = {
	id: "moverbase",
	name: "MoverBase",
	website: "https://www.moverbase.com",
	description: "MoverBase is a software solution that includes features designed to support the management of a moving company.",
	icon: "MoverBase.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "moverbase:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("lead\\.moverbase\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
