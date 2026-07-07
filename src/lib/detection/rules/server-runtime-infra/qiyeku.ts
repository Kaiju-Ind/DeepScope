import type { TechnologyDefinition } from '../../types';

export const qiyekuTechnologyDefinition = {
	id: "qiyeku",
	name: "Qiyeku",
	website: "https://www.qiyeku.cn",
	description: "Qiyeku is a Chinese enterprise database that provides business information, company listings, and industry resources for market research and trade connections.",
	icon: "Qiyeku.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "qiyeku:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.qiyeku\\.cn"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
