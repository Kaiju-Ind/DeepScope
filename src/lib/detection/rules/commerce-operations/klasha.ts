import type { TechnologyDefinition } from '../../types';

export const klashaTechnologyDefinition = {
	id: "klasha",
	name: "Klasha",
	website: "https://www.klasha.com/",
	description: "Klasha is a payment solution provider that handles a store's entire checkout.",
	icon: "Klasha.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "klasha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("klasha-integration\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "klasha:jsGlobal:1",
			kind: "jsGlobal",
			property: "KlashaClient",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
