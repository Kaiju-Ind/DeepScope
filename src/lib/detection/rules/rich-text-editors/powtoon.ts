import type { TechnologyDefinition } from '../../types';

export const powtoonTechnologyDefinition = {
	id: "powtoon",
	name: "Powtoon",
	website: "https://www.powtoon.com",
	description: "Powtoon is a digital platform that integrates animation with modern design to enable the creation of dynamic visual presentations.",
	icon: "Powtoon.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "powtoon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.powtoon\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "powtoon:dom:1",
			kind: "dom",
			selector: "iframe[src*='www.powtoon.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
