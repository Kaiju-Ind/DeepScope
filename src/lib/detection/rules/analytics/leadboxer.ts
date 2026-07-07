import type { TechnologyDefinition } from '../../types';

export const leadboxerTechnologyDefinition = {
	id: "leadboxer",
	name: "LeadBoxer",
	website: "https://www.leadboxer.com",
	description: "LeadBoxer is a lead generation program that measures invitations from website visitors, aiding businesses in tracking and analyzing potential leads.",
	icon: "LeadBoxer.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "leadboxer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ip\\.leadboxer\\.com"),
			description: "Script source URL matches a known technology marker.",
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
