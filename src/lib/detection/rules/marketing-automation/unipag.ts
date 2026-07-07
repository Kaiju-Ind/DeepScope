import type { TechnologyDefinition } from '../../types';

export const unipagTechnologyDefinition = {
	id: "unipag",
	name: "Unipag",
	website: "https://www.unipag.com",
	description: "Unipag is a universal sales promotion platform designed to streamline and manage promotional campaigns across various channels.",
	icon: "Unipag.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "unipag:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.unipag\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "unipag:jsGlobal:1",
			kind: "jsGlobal",
			property: "Unipag",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
