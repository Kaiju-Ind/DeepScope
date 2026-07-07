import type { TechnologyDefinition } from '../../types';

export const seelTechnologyDefinition = {
	id: "seel",
	name: "Seel",
	website: "https://www.seel.com",
	description: "Seel is a solution for online merchants and marketplaces that enables revenue protection by reducing losses from refunds and returns.",
	icon: "Seel.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "seel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.seel\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "seel:jsGlobal:1",
			kind: "jsGlobal",
			property: "SeelSDK",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
