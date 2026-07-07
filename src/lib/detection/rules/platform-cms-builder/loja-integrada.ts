import type { TechnologyDefinition } from '../../types';

export const lojaIntegradaTechnologyDefinition = {
	id: "loja-integrada",
	name: "Loja Integrada",
	website: "https://lojaintegrada.com.br/",
	description: "Loja Integrada is an all-in-one platform for building and managing online stores, tailored for the Brazilian market.",
	icon: "Loja Integrada.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "loja-integrada:jsGlobal:0",
			kind: "jsGlobal",
			property: "LOJA_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loja-integrada:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("vtex-integrated-store", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "loja-integrada:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("vtex-integrated-store", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
