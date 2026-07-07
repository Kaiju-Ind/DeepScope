import type { TechnologyDefinition } from '../../types';

export const ecalTechnologyDefinition = {
	id: "ecal",
	name: "Ecal",
	website: "https://ecal.com",
	description: "Ecal is a marketing software platform that enables the delivery of calendar-based tickets and events directly into users’ personal calendars.",
	icon: "Ecal.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ecal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ecal\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ecal:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.ecal\\.com"),
			description: "Script content contains a bounded technology signature.",
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
