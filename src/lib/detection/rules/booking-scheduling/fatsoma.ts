import type { TechnologyDefinition } from '../../types';

export const fatsomaTechnologyDefinition = {
	id: "fatsoma",
	name: "Fatsoma",
	website: "https://www.fatsoma.com",
	description: "Fatsoma is a platform for creating event and concert websites, enabling organizers to manage listings and ticket sales.",
	icon: "Fatsoma.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "fatsoma:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.fatsoma\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "fatsoma:dom:1",
			kind: "dom",
			selector: "link[href*='.fatsomasites.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
