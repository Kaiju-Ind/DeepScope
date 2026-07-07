import type { TechnologyDefinition } from '../../types';

export const reactFlowTechnologyDefinition = {
	id: "react-flow",
	name: "React Flow",
	website: "https://reactflow.dev",
	description: "React Flow is a library for building node-based applications.",
	icon: "React Flow.svg",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "react-flow:dom:0",
			kind: "dom",
			selector: ".react-flow, .react-flow__renderer, .react-flow__node, .react-flow__edge, .react-flow__controls",
			description: "DOM contains React Flow's rendered class names.",
		},
		{
			id: "react-flow:html:2",
			kind: "html",
			pattern: new RegExp("class=[\"'][^\"']*\\breact-flow(?:__[-a-z]+)?\\b", "i"),
			confidence: 90,
			description: "Document HTML contains React Flow class names.",
		},
		{
			id: "react-flow:text:1",
			kind: "text",
			pattern: new RegExp("react-flow"),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"react",
	],
} as const satisfies TechnologyDefinition;
