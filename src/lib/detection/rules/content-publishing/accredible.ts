import type { TechnologyDefinition } from '../../types';

export const accredibleTechnologyDefinition = {
	id: "accredible",
	name: "Accredible",
	website: "https://www.accredible.com",
	description: "Accredible is a branded digital certificates provider that supports learner and program growth through secure, verifiable credentialing.",
	icon: "Accredible.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "accredible:dom:0",
			kind: "dom",
			selector: "iframe[src*='api.accredible.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "accredible:header:1",
			kind: "header",
			key: "Access-Control-Allow-Headers",
			valuePattern: new RegExp("^Accredible-Authorization", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "accredible:header:2",
			kind: "header",
			key: "access-control-allow-headers",
			valuePattern: new RegExp("^accredible-authorization", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
