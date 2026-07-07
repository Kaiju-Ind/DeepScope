import type { TechnologyDefinition } from '../../types';

export const anexisTechnologyDefinition = {
	id: "anexis",
	name: "Anexis",
	website: "https://anex.is",
	description: "Anexis is a software provider offering tools that streamline communication, sales, and management processes for lodging businesses.",
	icon: "Anexis.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "anexis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cloud\\.anex\\.is"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
