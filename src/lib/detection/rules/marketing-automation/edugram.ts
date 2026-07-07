import type { TechnologyDefinition } from '../../types';

export const edugramTechnologyDefinition = {
	id: "edugram",
	name: "Edugram",
	website: "https://edugram.com",
	description: "Edugram is an affiliate program and CPA network for monetizing educational traffic.",
	icon: "Edugram.svg",
	categories: [
		"marketing-automation",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "edugram:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.edugram\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "edugram:dom:1",
			kind: "dom",
			selector: "form[action*='edugram.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
