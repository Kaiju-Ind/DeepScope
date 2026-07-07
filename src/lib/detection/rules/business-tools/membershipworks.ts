import type { TechnologyDefinition } from '../../types';

export const membershipworksTechnologyDefinition = {
	id: "membershipworks",
	name: "MembershipWorks",
	website: "https://membershipworks.com",
	description: "MembershipWorks is a membership software platform that provides tools for managing member records, offering a searchable member directory, and supporting event calendars with integrated registration features.",
	icon: "MembershipWorks.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "membershipworks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.membershipworks\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
