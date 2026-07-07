import type { TechnologyDefinition } from '../../types';

export const monacoEditorTechnologyDefinition = {
	id: "monaco-editor",
	name: "Monaco Editor",
	website: "https://microsoft.github.io/monaco-editor/",
	description: "Monaco Editor is the code editor that powers VS Code. Monaco Editor is a tool in the text editor category of a tech stack.",
	icon: "Microsoft.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "monaco-editor:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.monaco-editor"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "monaco-editor:jsGlobal:1",
			kind: "jsGlobal",
			property: "MonacoEnvironment",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "monaco-editor:jsGlobal:2",
			kind: "jsGlobal",
			property: "apex.libVersions.monacoEditor",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "monaco-editor:jsGlobal:3",
			kind: "jsGlobal",
			property: "monaco.editor",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
