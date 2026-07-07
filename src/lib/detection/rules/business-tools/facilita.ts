import type { TechnologyDefinition } from '../../types';

export const facilitaTechnologyDefinition = {
	id: "facilita",
	name: "Facilita",
	website: "https://www.appfacilita.com",
	description: "Facilita is a CRM designed for the real estate market, providing tools to manage client interactions, listings, and transactions.",
	icon: "Facilita.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "facilita:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.appfacilita\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "facilita:jsGlobal:1",
			kind: "jsGlobal",
			property: "facilitaFormTrackerFnc",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
