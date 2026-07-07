import type { TechnologyDefinition } from '../../types';

export const brandfolderTechnologyDefinition = {
	id: "brandfolder",
	name: "Brandfolder",
	website: "https://brandfolder.com",
	description: "Brandfolder is a cloud-based digital asset management platform.",
	icon: "Brandfolder.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "brandfolder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.brandfolder\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brandfolder:jsGlobal:1",
			kind: "jsGlobal",
			property: "Brandfolder.account",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
