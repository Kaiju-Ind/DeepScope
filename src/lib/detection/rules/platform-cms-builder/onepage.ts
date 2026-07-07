import type { TechnologyDefinition } from '../../types';

export const onepageTechnologyDefinition = {
	id: "onepage",
	name: "Onepage",
	website: "https://onepage.io",
	description: "Onepage is a page-building software that enhances productivity by streamlining the creation and management of web pages.",
	icon: "Onepage.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "onepage:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.onepage\\.io"),
			description: "Script content contains a bounded technology signature.",
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
