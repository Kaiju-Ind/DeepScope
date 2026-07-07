import type { TechnologyDefinition } from '../../types';

export const asciidocTechnologyDefinition = {
	id: "asciidoc",
	name: "AsciiDoc",
	website: "https://www.methods.co.nz/asciidoc",
	description: "AsciiDoc is a text document format for writing documentation, slideshows, web pages, man pages and blogs. AsciiDoc files can be translated to many formats including HTML, PDF, EPUB, man page.",
	icon: "AsciiDoc.png",
	categories: [
		"platform-cms-builder",
		"rich-text-editors",
		"developer-tooling",
	],
	rules: [
		{
			id: "asciidoc:jsGlobal:0",
			kind: "jsGlobal",
			property: "asciidoc",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "asciidoc:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^AsciiDoc ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "asciidoc:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^asciidoc ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
