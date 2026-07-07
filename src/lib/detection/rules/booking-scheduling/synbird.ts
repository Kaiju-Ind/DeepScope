import type { TechnologyDefinition } from '../../types';

export const synbirdTechnologyDefinition = {
	id: "synbird",
	name: "SynBird",
	website: "https://www.synbird.com",
	description: "SynBird is a software tool that streamlines user-community interactions through online appointments, agendas, queues, and GRU services.",
	icon: "SynBird.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "synbird:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.synbird\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
