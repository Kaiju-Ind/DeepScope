import type { TechnologyDefinition } from '../../types';

export const vextrasTechnologyDefinition = {
	id: "vextras",
	name: "Vextras",
	website: "https://www.vextras.com",
	description: "Vextras is a platform that aids online retailers in increasing sales, providing customer support, and automating various tasks.",
	icon: "Vextras.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vextras:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vextras\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vextras:jsGlobal:1",
			kind: "jsGlobal",
			property: "vextras",
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
