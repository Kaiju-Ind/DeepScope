import type { TechnologyDefinition } from '../../types';

export const wyreTechnologyDefinition = {
	id: "wyre",
	name: "Wyre",
	website: "https://sendwyre.com",
	description: "Wyre is a financial technology platform that enables cryptocurrency companies to connect digital assets with traditional fiat payment systems.",
	icon: "Wyre.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "wyre:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("verify\\.sendwyre\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
