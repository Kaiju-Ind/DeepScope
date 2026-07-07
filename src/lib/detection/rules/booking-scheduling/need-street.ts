import type { TechnologyDefinition } from '../../types';

export const needStreetTechnologyDefinition = {
	id: "need-street",
	name: "Need Street",
	website: "https://www.needstreet.com",
	description: "Need Street is a web and mobile platform that connects healthcare providers with patients, enabling digital communication and management of healthcare services.",
	icon: "NeedStreet.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "need-street:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("data\\.needstreet\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
