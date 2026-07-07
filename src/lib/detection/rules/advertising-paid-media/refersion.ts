import type { TechnologyDefinition } from '../../types';

export const refersionTechnologyDefinition = {
	id: "refersion",
	name: "Refersion",
	website: "https://refersion.com",
	description: "Refersion is an affiliate management app.",
	icon: "Refersion.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "refersion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.refersion\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "refersion:dom:1",
			kind: "dom",
			selector: "a[href*='.refersion.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "refersion:dom:2",
			kind: "dom",
			selector: "img[src*='cdn.refersion.com'],img[src*='s3.amazonaws.com/refersion_client/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
