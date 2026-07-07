import type { TechnologyDefinition } from '../../types';

export const hotelPropellerTechnologyDefinition = {
	id: "hotel-propeller",
	name: "Hotel Propeller",
	website: "https://hotelpropeller.com",
	description: "Hotel Propeller is a web design platform that creates responsive websites tailored for hotels.",
	icon: "HotelPropeller.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hotel-propeller:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.hotelpropeller\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
