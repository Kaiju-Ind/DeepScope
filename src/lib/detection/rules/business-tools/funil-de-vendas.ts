import type { TechnologyDefinition } from '../../types';

export const funilDeVendasTechnologyDefinition = {
	id: "funil-de-vendas",
	name: "Funil de Vendas",
	website: "https://www.funildevendas.com.br",
	description: "Funil de Vendas is a gamified CRM platform that helps organizations track sales activity and motivate sales teams to reach daily performance targets through goal-based incentives and engagement features.",
	icon: "FunilDeVendas.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "funil-de-vendas:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("leads\\.funildevendas\\.com\\.br"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "funil-de-vendas:jsGlobal:1",
			kind: "jsGlobal",
			property: "Bt_WhatsFunil",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "funil-de-vendas:jsGlobal:2",
			kind: "jsGlobal",
			property: "KeyWhatsFunil",
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
