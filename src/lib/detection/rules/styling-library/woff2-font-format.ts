import type { TechnologyDefinition } from '../../types';

export const woff2FontFormatTechnologyDefinition = {
	id: "woff2-font-format",
	name: "WOFF2 Font Format",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src",
	description: "References WOFF2 font assets, the modern compressed web font format.",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "woff2-font-format:html:0",
			kind: "html",
			pattern: new RegExp("\\.woff2(?:[?\"'\\s>)])", "i"),
			confidence: 90,
			description: "Document references WOFF2 font assets.",
		},
		{
			id: "woff2-font-format:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.woff2(?:\\?|$)", "i"),
			confidence: 100,
			description: "Loaded resource URL references a WOFF2 font.",
		},
	],
} as const satisfies TechnologyDefinition;
