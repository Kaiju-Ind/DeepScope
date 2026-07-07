import type { TechnologyDefinition } from '../../types';

export const spiffyStoresTechnologyDefinition = {
	id: "spiffy-stores",
	name: "Spiffy Stores",
	website: "https://www.spiffystores.com.au",
	description: "Spiffy Stores is an ecommerce and website design system for creating and managing online stores.",
	icon: "SpiffyStores.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "spiffy-stores:jsGlobal:0",
			kind: "jsGlobal",
			property: "Spiffy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
