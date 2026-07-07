import type { TechnologyDefinition } from '../../types';

export const kustomerTechnologyDefinition = {
	id: "kustomer",
	name: "Kustomer",
	website: "https://www.kustomer.com/",
	description: "Kustomer is a CRM platform.",
	icon: "Kustomer.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "kustomer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.kustomerapp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kustomer:jsGlobal:1",
			kind: "jsGlobal",
			property: "Kustomer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
