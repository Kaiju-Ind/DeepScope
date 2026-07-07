import type { TechnologyDefinition } from '../../types';

export const symbolsetTechnologyDefinition = {
	id: "symbolset",
	name: "Symbolset",
	website: "https://symbolset.com",
	description: "Symbolset is a tool that converts words into icons by utilizing font technology, enabling visual representation of text-based content for various applications.",
	icon: "Symbolset.svg",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "symbolset:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.symbolset\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
