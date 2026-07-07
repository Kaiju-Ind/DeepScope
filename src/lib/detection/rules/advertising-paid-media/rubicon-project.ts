import type { TechnologyDefinition } from '../../types';

export const rubiconProjectTechnologyDefinition = {
	id: "rubicon-project",
	name: "Rubicon Project",
	website: "https://rubiconproject.com/",
	description: "Rubicon Project is an advertising automation platform enabling publishers to transact advertising brands.",
	icon: "Rubicon Project.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "rubicon-project:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/[^/]*\\.rubiconproject\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rubicon-project:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.rubiconproject\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "rubicon-project:dom:2",
			kind: "dom",
			selector: "iframe[src*='.rubiconproject.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "rubicon-project:dom:3",
			kind: "dom",
			selector: "img[src*='.rubiconproject.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
