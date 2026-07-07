import type { TechnologyDefinition } from '../../types';

export const invisionCommunityTechnologyDefinition = {
	id: "invision-community",
	name: "Invision Community",
	website: "https://invisioncommunity.com",
	description: "Invision Community is a scalable and customizable platform designed to build and grow online communities.",
	icon: "InvisionCommunity.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "invision-community:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.invisioncic\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:invisioncommunity:invisioncommunity:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
