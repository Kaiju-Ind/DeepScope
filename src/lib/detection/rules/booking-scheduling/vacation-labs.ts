import type { TechnologyDefinition } from '../../types';

export const vacationLabsTechnologyDefinition = {
	id: "vacation-labs",
	name: "Vacation Labs",
	website: "https://www.vacationlabs.com",
	description: "Vacation Labs is a travel management platform with a fully integrated booking engine that is mobile responsive.",
	icon: "VacationLabs.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "vacation-labs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.vacationlabs\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vacation-labs:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.vacationlabs\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
