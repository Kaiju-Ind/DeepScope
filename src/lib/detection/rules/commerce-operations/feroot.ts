import type { TechnologyDefinition } from '../../types';

export const ferootTechnologyDefinition = {
	id: "feroot",
	name: "Feroot",
	website: "https://www.feroot.com",
	description: "Feroot is a platform for creating PCI DSS 4.0.1–compliant payment pages that ensure safe handling of transaction and customer data.",
	icon: "Feroot.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "feroot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pg\\.feroot\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
