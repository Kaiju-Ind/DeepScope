import type { TechnologyDefinition } from '../../types';

export const submitExpressTechnologyDefinition = {
	id: "submit-express",
	name: "Submit Express",
	website: "https://www.submitexpress.com",
	description: "Submit Express is a platform that provides tools for search engine optimization and marketing management.",
	icon: "SubmitExpress.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "submit-express:dom:0",
			kind: "dom",
			selector: "a[href*='www.submitexpress.com'] > img[src*='www.submitexpress.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
