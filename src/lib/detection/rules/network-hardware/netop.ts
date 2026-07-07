import type { TechnologyDefinition } from '../../types';

export const netopTechnologyDefinition = {
	id: "netop",
	name: "Netop",
	website: "https://netop.com",
	description: "Netop is a platform that provides remote support and chat solutions for secure communication and technical assistance.",
	icon: "Netop.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "netop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.netop\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
