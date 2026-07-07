import type { TechnologyDefinition } from '../../types';

export const clinkedTechnologyDefinition = {
	id: "clinked",
	name: "Clinked",
	website: "https://clinked.com",
	description: "Clinked is a cloud-based platform for secure file sharing, project management, and team collaboration with client portals.",
	icon: "Clinked.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "clinked:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("a\\.clinked\\.com\\/(\\d+\\.\\d+\\.\\d+)\\/standard\\/js\\/.+\\.js"),
			version: {
				source: "match",
				group: 1,
			},
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
	},
} as const satisfies TechnologyDefinition;
