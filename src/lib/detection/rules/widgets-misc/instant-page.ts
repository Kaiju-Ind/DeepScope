import type { TechnologyDefinition } from '../../types';

export const instantPageTechnologyDefinition = {
	id: "instant-page",
	name: "Instant.Page",
	website: "https://instant.page/",
	description: "Instant. Page is a JavaScript library which uses just-in-time preloading technique to make websites faster.",
	icon: "Instant.page.svg",
	categories: [
		"widgets-misc",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "instant-page:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("instant\\.page"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
