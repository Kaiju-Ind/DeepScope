import type { TechnologyDefinition } from '../../types';

export const instantestoreTechnologyDefinition = {
	id: "instantestore",
	name: "InstanteStore",
	website: "https://instantestore.com",
	description: "InstanteStore is a hosted shopping cart system that enables businesses to manage online stores.",
	icon: "InstanteStore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "instantestore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.instantestore\\.com"),
			description: "Script source URL matches a known technology marker.",
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
