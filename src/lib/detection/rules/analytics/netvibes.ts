import type { TechnologyDefinition } from '../../types';

export const netvibesTechnologyDefinition = {
	id: "netvibes",
	name: "Netvibes",
	website: "https://www.netvibes.com",
	description: "Netvibes is a platform for social media monitoring, analytics, and real-time alerts.",
	icon: "Netvibes.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "netvibes:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.netvibes\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
