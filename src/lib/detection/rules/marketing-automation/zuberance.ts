import type { TechnologyDefinition } from '../../types';

export const zuberanceTechnologyDefinition = {
	id: "zuberance",
	name: "Zuberance",
	website: "https://zuberance.com",
	description: "Zuberance is a platform that transforms enthusiastic customers into a marketing force, driving recommendations and sales for leading B2B and B2C brands.",
	icon: "Zuberance.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "zuberance:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zuberance\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zuberance:dom:1",
			kind: "dom",
			selector: "link[href*='static.zuberance.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
