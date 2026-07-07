import type { TechnologyDefinition } from '../../types';

export const storagelyTechnologyDefinition = {
	id: "storagely",
	name: "Storagely",
	website: "https://storagely.io",
	description: "Storagely is a self storage website solution that integrates with SiteLink, storEDGE, and SSM to support seamless operations and increased rentals without requiring a full rebuild.",
	icon: "Storagely.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storagely:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.storagely\\.link"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
