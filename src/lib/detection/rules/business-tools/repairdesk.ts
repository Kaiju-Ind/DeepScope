import type { TechnologyDefinition } from '../../types';

export const repairdeskTechnologyDefinition = {
	id: "repairdesk",
	name: "RepairDesk",
	website: "https://www.repairdesk.co",
	description: "RepairDesk is a repair shop management software.",
	icon: "RepairDesk.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "repairdesk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.repairdesk\\.co\\/"),
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
