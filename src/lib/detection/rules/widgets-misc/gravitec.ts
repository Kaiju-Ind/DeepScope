import type { TechnologyDefinition } from '../../types';

export const gravitecTechnologyDefinition = {
	id: "gravitec",
	name: "Gravitec",
	website: "https://gravitec.net",
	description: "Gravitec is a push notification tool.",
	icon: "Gravitec.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "gravitec:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:cdn|id)\\.gravitec\\.(?:media|net)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gravitec:jsGlobal:1",
			kind: "jsGlobal",
			property: "Gravitec",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gravitec:jsGlobal:2",
			kind: "jsGlobal",
			property: "gravitecWebpackJsonp",
			description: "Page-owned global matches a known technology marker.",
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
