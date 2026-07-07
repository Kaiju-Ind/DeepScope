import type { TechnologyDefinition } from '../../types';

export const ariakitTechnologyDefinition = {
	id: "ariakit",
	name: "Ariakit",
	website: "https://ariakit.org/",
	description: "Toolkit for building accessible web apps with React",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "ariakit:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\\@ariakit\\/react"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "ariakit:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\@ariakit\\/core"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "ariakit:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("ariakit"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "ariakit:html:modern:3",
			kind: "html",
			pattern: new RegExp("data-command"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "ariakit:html:modern:4",
			kind: "html",
			pattern: new RegExp("data-disclosure"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
