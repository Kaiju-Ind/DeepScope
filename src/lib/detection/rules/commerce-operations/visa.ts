import type { TechnologyDefinition } from '../../types';

export const visaTechnologyDefinition = {
	id: "visa",
	name: "Visa",
	website: "https://www.visa.com",
	icon: "Visa.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "visa:dom:0",
			kind: "dom",
			selector: "[aria-labelledby='pi-visa']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "visa:jsGlobal:1",
			kind: "jsGlobal",
			property: "visaApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "visa:jsGlobal:2",
			kind: "jsGlobal",
			property: "visaImage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "visa:jsGlobal:3",
			kind: "jsGlobal",
			property: "visaSrc",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
