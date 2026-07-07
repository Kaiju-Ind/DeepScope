import type { TechnologyDefinition } from '../../types';

export const housecallProTechnologyDefinition = {
	id: "housecall-pro",
	name: "Housecall Pro",
	website: "https://www.housecallpro.com",
	description: "Housecall Pro is a platform that enables businesses to schedule, dispatch, invoice, and receive online bookings from customers.",
	icon: "HousecallPro.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "housecall-pro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.housecallpro\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "housecall-pro:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("housecallpro\\.com\\/"),
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
