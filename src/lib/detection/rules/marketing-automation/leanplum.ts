import type { TechnologyDefinition } from '../../types';

export const leanplumTechnologyDefinition = {
	id: "leanplum",
	name: "Leanplum",
	website: "https://www.leanplum.com",
	description: "Leanplum is a multi-channel messaging and campaign orchestration platform.",
	icon: "Leanplum.svg",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "leanplum:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("npm\\/leanplum-sdk\\@([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leanplum:jsGlobal:1",
			kind: "jsGlobal",
			property: "Leanplum",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
