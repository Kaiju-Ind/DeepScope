import type { TechnologyDefinition } from '../../types';

export const roktTechnologyDefinition = {
	id: "rokt",
	name: "Rokt",
	website: "https://www.rokt.com",
	description: "Rokt is an ecommerce marketing technology that gives customers a personalised and relevant experience while buying online.",
	icon: "Rokt.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "rokt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rokt\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rokt:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.rokt\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rokt:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.rokt\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
