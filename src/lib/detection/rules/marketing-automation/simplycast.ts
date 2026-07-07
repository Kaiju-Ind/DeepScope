import type { TechnologyDefinition } from '../../types';

export const simplycastTechnologyDefinition = {
	id: "simplycast",
	name: "SimplyCast",
	website: "https://www.simplycast.com",
	description: "SimplyCast is a custom flow communication platform designed to facilitate personalised messaging and automated workflows, allowing businesses to streamline their communication processes.",
	icon: "SimplyCast.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "simplycast:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.simplycast\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "simplycast:dom:1",
			kind: "dom",
			selector: "iframe[src*='.simplycast.com']",
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
