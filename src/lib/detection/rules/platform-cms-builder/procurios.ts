import type { TechnologyDefinition } from '../../types';

export const procuriosTechnologyDefinition = {
	id: "procurios",
	name: "Procurios",
	website: "https://www.procurios.com",
	description: "Procurios is a provider of software solutions tailored to nonprofit and member organizations, offering website management, fundraising, CRM, and event tools.",
	icon: "Procurios.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "procurios:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Procurios$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "procurios:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^procurios$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
