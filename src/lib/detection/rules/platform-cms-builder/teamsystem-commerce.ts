import type { TechnologyDefinition } from '../../types';

export const teamsystemCommerceTechnologyDefinition = {
	id: "teamsystem-commerce",
	name: "TeamSystem Commerce",
	website: "https://www.teamsystemcommerce.com/",
	icon: "storeden.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "teamsystem-commerce:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("(?:Storeden|TeamSystem Commerce)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "teamsystem-commerce:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("(?:storeden|teamsystem commerce)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
