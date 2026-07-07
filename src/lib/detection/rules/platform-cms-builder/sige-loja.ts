import type { TechnologyDefinition } from '../../types';

export const sigeLojaTechnologyDefinition = {
	id: "sige-loja",
	name: "SIGE Loja",
	website: "https://sigeloja.com.br",
	description: "SIGE Loja is a complete online store solution with integrated backoffice features for managing sales, inventory, and operations.",
	icon: "SIGELoja.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sige-loja:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/shared\\/sige\\.loja\\.bundle\\.custom"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
