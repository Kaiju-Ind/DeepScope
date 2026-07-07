import type { TechnologyDefinition } from '../../types';

export const typedreamTechnologyDefinition = {
	id: "typedream",
	name: "Typedream",
	website: "https://typedream.com",
	description: "Typedream is a website builder that enables users to create and publish websites without writing code, using a visual interface and prebuilt components.",
	icon: "Typedream.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "typedream:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.typedream\\.com"),
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
