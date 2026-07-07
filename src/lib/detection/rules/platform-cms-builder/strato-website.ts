import type { TechnologyDefinition } from '../../types';

export const stratoWebsiteTechnologyDefinition = {
	id: "strato-website",
	name: "Strato Website",
	website: "https://www.strato.de/homepage-baukasten",
	description: "Strato Website is a website builder by Strato hosting provider.",
	icon: "Strato.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "strato-website:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("strato-editor\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "strato-website:jsGlobal:1",
			kind: "jsGlobal",
			property: "Strftime.configuration",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
