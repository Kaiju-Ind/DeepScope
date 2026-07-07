import type { TechnologyDefinition } from '../../types';

export const editorJsTechnologyDefinition = {
	id: "editor-js",
	name: "Editor.js",
	website: "https://editorjs.io",
	description: "Editor.js is a Javascript library which allows developers to implement a block base text editor with plugins on their page.",
	icon: "Editor.js.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "editor-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "EditorJS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
