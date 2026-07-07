import type { TechnologyDefinition } from '../../types';

export const modioTechnologyDefinition = {
	id: "modio",
	name: "Modio",
	website: "https://www.modio.cz",
	description: "Modio is an ecommerce tracking system designed to monitor, analyze, and report online store performance and customer activity.",
	icon: "Modio.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "modio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trackingapi\\.modio\\.cz"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "modio:jsGlobal:1",
			kind: "jsGlobal",
			property: "ModioCZ",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
