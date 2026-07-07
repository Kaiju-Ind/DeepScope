import type { TechnologyDefinition } from '../../types';

export const obsidianPublishTechnologyDefinition = {
	id: "obsidian-publish",
	name: "Obsidian Publish",
	website: "https://obsidian.md/publish",
	description: "Obsidian Publish is an official, paid plugin for Obsidian that allows users to post selected notes to a directory on the publish.obsidian.md domain.",
	icon: "Obsidian Publish.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "obsidian-publish:jsGlobal:0",
			kind: "jsGlobal",
			property: "siteInfo.host",
			valuePattern: new RegExp("\\.obsidian\\.md"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"pixijs",
		"prism",
	],
} as const satisfies TechnologyDefinition;
