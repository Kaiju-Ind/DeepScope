import type { TechnologyDefinition } from '../../types';

export const bookerTechnologyDefinition = {
	id: "booker",
	name: "Booker",
	website: "https://www.mindbodyonline.com/business/booker",
	description: "Booker is a spa and salon management platform that supports scheduling, client management, staff coordination, and payment processing.",
	icon: "Booker.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "booker:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.booker\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
