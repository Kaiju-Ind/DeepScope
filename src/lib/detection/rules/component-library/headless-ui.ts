import type { TechnologyDefinition } from '../../types';

export const headlessUiTechnologyDefinition = {
	id: "headless-ui",
	name: "Headless UI",
	website: "https://headlessui.com/",
	description: "Completely unstyled, fully accessible UI components",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "headless-ui:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\\@headlessui\\/react"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "headless-ui:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\@headlessui\\/vue"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "headless-ui:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("headlessui"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "headless-ui:html:modern:3",
			kind: "html",
			pattern: new RegExp("data-headlessui-state"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "headless-ui:html:modern:4",
			kind: "html",
			pattern: new RegExp("data-headlessui-focus"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
