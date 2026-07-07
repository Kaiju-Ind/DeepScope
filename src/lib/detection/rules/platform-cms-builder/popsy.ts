import type { TechnologyDefinition } from '../../types';

export const popsyTechnologyDefinition = {
	id: "popsy",
	name: "Popsy",
	website: "https://popsy.co",
	description: "Popsy is a no-code website builder designed for creators to build and publish websites without programming knowledge.",
	icon: "Popsy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "popsy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("assets\\.popsy\\.co\\/"),
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
