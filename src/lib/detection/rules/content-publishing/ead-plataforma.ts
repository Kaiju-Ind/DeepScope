import type { TechnologyDefinition } from '../../types';

export const eadPlataformaTechnologyDefinition = {
	id: "ead-plataforma",
	name: "EAD Plataforma",
	website: "https://eadplataforma.com",
	description: "EAD Plataforma is a distance learning platform designed to deliver online educational content and support remote instruction across various subjects.",
	icon: "EADPlataforma.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "ead-plataforma:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.eadplataforma\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ead-plataforma:jsGlobal:1",
			kind: "jsGlobal",
			property: "getEadPlayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ead-plataforma:jsGlobal:2",
			kind: "jsGlobal",
			property: "taxa_ead_base_boleto",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
