import type { TechnologyDefinition } from '../../types';

export const revlifterTechnologyDefinition = {
	id: "revlifter",
	name: "RevLifter",
	website: "https://www.revlifter.com",
	description: "RevLifter is an AI-powered coupon technology which allows brands to offer personalised incentives to their customers based on real-time basket data.",
	icon: "RevLifter.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "revlifter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.revlifter\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "revlifter:jsGlobal:1",
			kind: "jsGlobal",
			property: "RevLifterObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "revlifter:jsGlobal:2",
			kind: "jsGlobal",
			property: "revlifter",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "revlifter:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^REVLIFTER$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "revlifter:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^revlifter$", "i"),
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
