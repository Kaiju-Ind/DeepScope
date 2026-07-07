import type { TechnologyDefinition } from '../../types';

export const spektrixTechnologyDefinition = {
	id: "spektrix",
	name: "Spektrix",
	website: "https://www.spektrix.com",
	description: "Spektrix is a cloud-based ticketing, marketing, and fundraising CRM system putting audience insight at your fingertips.",
	icon: "Spektrix.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "spektrix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.spektrix\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
