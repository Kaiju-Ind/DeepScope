import type { TechnologyDefinition } from '../../types';

export const pelcroTechnologyDefinition = {
	id: "pelcro",
	name: "Pelcro",
	website: "https://www.get.pelcro.com",
	description: "Pelcro is a subscription and membership management software.",
	icon: "Pelcro.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pelcro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.pelcro\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pelcro:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pelcro.adblock",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pelcro:jsGlobal:2",
			kind: "jsGlobal",
			property: "PelcroEventsAlreadyFired",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
