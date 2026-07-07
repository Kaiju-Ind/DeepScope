import type { TechnologyDefinition } from '../../types';

export const livebooksTechnologyDefinition = {
	id: "livebooks",
	name: "LiveBooks",
	website: "https://livebooks.com",
	description: "LiveBooks is a platform offering mobile-friendly websites built using customized website templates.",
	icon: "LiveBooks.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "livebooks:dom:0",
			kind: "dom",
			selector: "div[data-img-server*='static.livebooks.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
