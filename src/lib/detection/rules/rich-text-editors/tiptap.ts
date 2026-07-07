import type { TechnologyDefinition } from '../../types';

export const tiptapTechnologyDefinition = {
	id: "tiptap",
	name: "Tiptap",
	website: "https://tiptap.dev/",
	description: "Tiptap is a headless, open-source editor framework designed for flexible and customizable text editing.",
	icon: "Tiptap.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "tiptap:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.tiptap\\.dev"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
