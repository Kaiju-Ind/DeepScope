import type { TechnologyDefinition } from '../../types';

export const eventlinkTechnologyDefinition = {
	id: "eventlink",
	name: "Eventlink",
	website: "https://eventlink.com",
	description: "Eventlink is a platform for managing events, offering tools for registration, communication, and collaboration in a unified interface.",
	icon: "Eventlink.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "eventlink:dom:0",
			kind: "dom",
			selector: "link[href*='.eventlink.com/'], iframe[src*='.eventlink.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "eventlink:jsGlobal:1",
			kind: "jsGlobal",
			property: "eventlink.organizationID",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
