import type { TechnologyDefinition } from '../../types';

export const codemirrorTechnologyDefinition = {
	id: "codemirror",
	name: "CodeMirror",
	website: "https://codemirror.net",
	description: "CodeMirror is a JavaScript component that provides a code editor in the browser.",
	icon: "CodeMirror.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "codemirror:jsGlobal:0",
			kind: "jsGlobal",
			property: "CodeMirror",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "codemirror:jsGlobal:1",
			kind: "jsGlobal",
			property: "CodeMirror.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:codemirror:codemirror:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
