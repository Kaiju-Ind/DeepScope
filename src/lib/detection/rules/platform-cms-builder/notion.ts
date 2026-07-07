import type { TechnologyDefinition } from '../../types';

export const notionTechnologyDefinition = {
	id: "notion",
	name: "Notion",
	website: "https://notion.so",
	description: "Notion is a collaboration platform with modified Markdown support that integrates kanban boards, tasks, wikis, and database.",
	icon: "Notion.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "notion:dom:0",
			kind: "dom",
			selector: "html.notion-html",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:notion:notion:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
