import type { TechnologyDefinition } from '../../types';

export const trackbeeTechnologyDefinition = {
	id: "trackbee",
	name: "Trackbee",
	website: "https://www.trackbee.io",
	description: "Trackbee is a data analytics tool that identifies missing conversion data to optimize revenue tracking and improve business insights.",
	icon: "Trackbee.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "trackbee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trackbee\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
