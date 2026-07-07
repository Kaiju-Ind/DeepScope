import type { TechnologyDefinition } from '../../types';

export const monsterinsightsTechnologyDefinition = {
	id: "monsterinsights",
	name: "MonsterInsights",
	website: "https://www.monsterinsights.com",
	description: "MonsterInsights is the most popular Google Analytics plugin for WordPress.",
	icon: "MonsterInsights.png",
	categories: [
		"wordpress-ecosystem",
		"analytics",
	],
	rules: [
		{
			id: "monsterinsights:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/google-analytics-for-wordpress\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "monsterinsights:jsGlobal:1",
			kind: "jsGlobal",
			property: "MonsterInsights",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "monsterinsights:jsGlobal:2",
			kind: "jsGlobal",
			property: "monsterinsights_frontend",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:monsterinsights:monsterinsights:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
