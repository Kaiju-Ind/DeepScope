import type { TechnologyDefinition } from '../../types';

export const milvusTechnologyDefinition = {
	id: "milvus",
	name: "Milvus",
	website: "https://milvus.com.br",
	description: "Milvus is an intelligent system designed to manage IT operations and provide help desk support.",
	icon: "Milvus.svg",
	categories: [
		"network-hardware",
		"business-tools",
	],
	rules: [
		{
			id: "milvus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.api\\.milvus\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:milvus:milvus:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
