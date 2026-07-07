import type { TechnologyDefinition } from '../../types';

export const pagefindTechnologyDefinition = {
	id: "pagefind",
	name: "Pagefind",
	website: "https://pagefind.app",
	description: "Pagefind is an open-source static site search library for indexing and searching website content.",
	icon: "Pagefind.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "pagefind:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:^|\\/)_?pagefind\\/pagefind-ui\\.js(?:$|\\?)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pagefind:jsGlobal:1",
			kind: "jsGlobal",
			property: "PagefindUI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
