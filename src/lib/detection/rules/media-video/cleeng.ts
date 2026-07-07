import type { TechnologyDefinition } from '../../types';

export const cleengTechnologyDefinition = {
	id: "cleeng",
	name: "Cleeng",
	website: "https://cleeng.com",
	description: "Cleeng is a platform that enables the sale and protection of premium video content through access control and secure streaming features.",
	icon: "Cleeng.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "cleeng:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.cleeng\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cleeng:jsGlobal:1",
			kind: "jsGlobal",
			property: "CleengApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cleeng:jsGlobal:2",
			kind: "jsGlobal",
			property: "cleengStatus",
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
