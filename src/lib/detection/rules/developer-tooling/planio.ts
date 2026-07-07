import type { TechnologyDefinition } from '../../types';

export const planioTechnologyDefinition = {
	id: "planio",
	name: "Planio",
	website: "https://plan.io",
	description: "Planio is a platform that offers issue tracking, project management, version control, help desk functionality, wikis, and team chat in a unified environment.",
	icon: "Planio.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "planio:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.plan\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
