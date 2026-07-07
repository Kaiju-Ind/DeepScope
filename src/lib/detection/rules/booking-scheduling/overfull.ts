import type { TechnologyDefinition } from '../../types';

export const overfullTechnologyDefinition = {
	id: "overfull",
	name: "Overfull",
	website: "https://www.overfull.fr",
	description: "Overfull is a reservation management system designed for restaurants to handle bookings, manage tables, and streamline guest scheduling.",
	icon: "Overfull.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "overfull:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.overfull\\.fr"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "overfull:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.overfull.fr']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
