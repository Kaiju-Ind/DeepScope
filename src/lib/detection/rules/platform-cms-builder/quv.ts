import type { TechnologyDefinition } from '../../types';

export const quvTechnologyDefinition = {
	id: "quv",
	name: "QUV",
	website: "https://quv.kr",
	description: "QUV is a Korean no-code website builder platform that enables website creation through drag-and-drop functionality.",
	icon: "QUV.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "quv:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.quv\\.kr\\/"),
			description: "Script source URL matches a known technology marker.",
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
