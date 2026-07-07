import type { TechnologyDefinition } from '../../types';

export const droplabsTechnologyDefinition = {
	id: "droplabs",
	name: "Droplabs",
	website: "https://droplabs.pl",
	description: "Droplabs is a Poland-based ticketing system, reservation system, and channel management tool designed to manage bookings and distribution across multiple sales channels.",
	icon: "Droplabs.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "droplabs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.droplabs\\.pl\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "droplabs:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunkdroplabs_widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
