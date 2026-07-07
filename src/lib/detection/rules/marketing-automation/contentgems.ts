import type { TechnologyDefinition } from '../../types';

export const contentgemsTechnologyDefinition = {
	id: "contentgems",
	name: "ContentGems",
	website: "https://contentgems.com",
	description: "ContentGems is a no-code content discovery tool designed to help users find and curate relevant content.",
	icon: "ContentGems.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "contentgems:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.contentgems\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "contentgems:jsGlobal:1",
			kind: "jsGlobal",
			property: "ContentGems",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "contentgems:jsGlobal:2",
			kind: "jsGlobal",
			property: "ContentGemsVersion",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
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
