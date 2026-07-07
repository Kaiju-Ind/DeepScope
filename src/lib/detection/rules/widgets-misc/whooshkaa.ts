import type { TechnologyDefinition } from '../../types';

export const whooshkaaTechnologyDefinition = {
	id: "whooshkaa",
	name: "Whooshkaa",
	website: "https://www.whooshkaa.com",
	icon: "Whooshkaa.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "whooshkaa:html:0",
			kind: "html",
			pattern: new RegExp("<iframe src=\"[^>]+whooshkaa\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "whooshkaa:dom:1",
			kind: "dom",
			selector: "iframe[src*='whooshkaa.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
