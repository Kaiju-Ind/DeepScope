import type { TechnologyDefinition } from '../../types';

export const aviziTechnologyDefinition = {
	id: "avizi",
	name: "Avizi",
	website: "https://www.avizi.fr",
	description: "Avizi is a tourism CRM system from France designed to manage customer relationships, bookings, and marketing for travel businesses.",
	icon: "Avizi.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "avizi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.avizi\\.fr"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "avizi:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.avizi\\.fr"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
