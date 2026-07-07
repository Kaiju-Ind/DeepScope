import type { TechnologyDefinition } from '../../types';

export const mondialRelayTechnologyDefinition = {
	id: "mondial-relay",
	name: "Mondial Relay",
	website: "https://www.mondialrelay.com",
	description: "Mondial Relay is a parcel shipping and delivery service in Europe.",
	icon: "Mondial Relay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "mondial-relay:text:0",
			kind: "text",
			pattern: new RegExp("\\bMondial Relay\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
