import type { TechnologyDefinition } from '../../types';

export const importMapsTechnologyDefinition = {
	id: "import-maps",
	name: "Import Maps",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap",
	description: "Uses an import map to control browser module specifier resolution.",
	categories: [
		"module-format",
	],
	rules: [
		{
			id: "import-maps:html:0",
			kind: "html",
			pattern: new RegExp("<script\\b[^>]+type=[\"']importmap[\"']", "i"),
			confidence: 100,
			description: "Document contains an importmap script.",
		},
	],
} as const satisfies TechnologyDefinition;
