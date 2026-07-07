import type { TechnologyDefinition } from '../../types';

export const ecomartistsTechnologyDefinition = {
	id: "ecomartists",
	name: "EcomArtists",
	website: "https://ecomartists.com",
	description: "EcomArtists is a provider of custom drawn products and gifts, tailored for personalisation, ideal for sharing with loved ones.",
	icon: "EcomArtists.svg",
	categories: [
		"platform-cms-builder",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "ecomartists:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.ecomartists\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ecomartists:jsGlobal:1",
			kind: "jsGlobal",
			property: "ECOMARTISTS_UPLOAD",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
