import type { TechnologyDefinition } from '../../types';

export const athenaSearchTechnologyDefinition = {
	id: "athena-search",
	name: "Athena Search",
	website: "https://www.athenasearch.io",
	description: "Athena Search is a customizable autocomplete, feature-rich dashboard, smart predictions, real-time reports search engine developed from scratch by Syncit Group’s.",
	icon: "Athena Search.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "athena-search:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/athena-search"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "athena-search:dom:1",
			kind: "dom",
			selector: "link[href*='athena/autocomplete/css/autocomplete.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
