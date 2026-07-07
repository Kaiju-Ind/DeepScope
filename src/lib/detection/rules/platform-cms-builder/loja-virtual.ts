import type { TechnologyDefinition } from '../../types';

export const lojaVirtualTechnologyDefinition = {
	id: "loja-virtual",
	name: "Loja Virtual",
	website: "https://www.lojavirtual.com.br",
	description: "Loja Virtual is an all-in-one ecommerce platform from Brazil.",
	icon: "Loja Virtual.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "loja-virtual:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/ljvt_v(\\d+)\\/"),
			confidence: 20,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "loja-virtual:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn1\\.solojavirtual\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "loja-virtual:jsGlobal:2",
			kind: "jsGlobal",
			property: "id_loja_virtual",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loja-virtual:jsGlobal:3",
			kind: "jsGlobal",
			property: "link_loja_virtual",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loja-virtual:jsGlobal:4",
			kind: "jsGlobal",
			property: "loja_sem_dominio",
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
