import type { TechnologyDefinition } from '../../types';

export const bokabordTechnologyDefinition = {
	id: "bokabord",
	name: "BokaBord",
	website: "https://www.bokabord.se",
	description: "BokaBord is a platform that enables users to discover restaurants and book tables across Sweden.",
	icon: "BokaBord.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bokabord:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.bokabord\\.se"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
