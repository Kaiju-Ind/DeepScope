import type { TechnologyDefinition } from '../../types';

export const reconlineTechnologyDefinition = {
	id: "reconline",
	name: "Reconline",
	website: "http://reconline.com",
	description: "Reconline is a cloud-based online reservation system designed for hotels and hotel groups to manage bookings and availability.",
	icon: "Reconline.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "reconline:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.reconline\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
