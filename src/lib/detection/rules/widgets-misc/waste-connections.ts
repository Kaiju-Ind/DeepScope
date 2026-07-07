import type { TechnologyDefinition } from '../../types';

export const wasteConnectionsTechnologyDefinition = {
	id: "waste-connections",
	name: "Waste Connections",
	website: "https://www.wasteconnections.com",
	description: "Waste Connections is a provider of waste management solutions, offering trash collection, dumpster rental, and recycling services across the United States.",
	icon: "WasteConnections.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "waste-connections:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.wasteconnections\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
