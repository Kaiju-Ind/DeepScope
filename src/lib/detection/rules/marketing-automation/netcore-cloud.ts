import type { TechnologyDefinition } from '../../types';

export const netcoreCloudTechnologyDefinition = {
	id: "netcore-cloud",
	name: "Netcore Cloud",
	website: "https://netcorecloud.com",
	description: "Netcore Cloud is a globally recognised marketing technology SaaS company.",
	icon: "Netcore Cloud.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "netcore-cloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.netcoresmartech\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
