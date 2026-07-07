import type { TechnologyDefinition } from '../../types';

export const revtraxTechnologyDefinition = {
	id: "revtrax",
	name: "RevTrax",
	website: "https://www.revtrax.com",
	description: "RevTrax is an offer management platform designed to track performance metrics and connect actionable insights.",
	icon: "RevTrax.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "revtrax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.revtrax\\.com\\/RevTrax\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "revtrax:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.revtrax\\.com\\/revtrax\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
