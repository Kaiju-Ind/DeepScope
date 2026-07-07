import type { TechnologyDefinition } from '../../types';

export const reactAriaTechnologyDefinition = {
	id: "react-aria",
	name: "React Aria",
	website: "https://react-spectrum.adobe.com/react-aria/",
	description: "A library of React Hooks that provides accessible UI primitives",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "react-aria:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("react-aria-components"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-aria:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\@react-aria\\/"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-aria:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("react-aria"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-aria:resourceUrl:modern:3",
			kind: "resourceUrl",
			pattern: new RegExp("react-aria"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "react-aria:html:modern:4",
			kind: "html",
			pattern: new RegExp("data-rac"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "react-aria:html:modern:5",
			kind: "html",
			pattern: new RegExp("data-react-aria"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
