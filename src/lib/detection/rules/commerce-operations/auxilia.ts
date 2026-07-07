import type { TechnologyDefinition } from '../../types';

export const auxiliaTechnologyDefinition = {
	id: "auxilia",
	name: "Auxilia",
	website: "https://www.theauxilia.com/",
	description: "Auxilia is a software solution designed to streamline donor management processes for nonprofits.",
	icon: "Auxilia.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "auxilia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.theauxilia\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "auxilia:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^messagesUtk$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "auxilia:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^messagesutk$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
