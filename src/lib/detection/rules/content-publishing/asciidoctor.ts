import type { TechnologyDefinition } from '../../types';

export const asciidoctorTechnologyDefinition = {
	id: "asciidoctor",
	name: "Asciidoctor",
	website: "https://github.com/asciidoctor/asciidoctor",
	description: "Asciidoctor is an open-source text processor and publishing toolchain, written in Ruby, for converting AsciiDoc content to HTML 5, DocBook 5, and other formats.",
	icon: "Asciidoctor.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "asciidoctor:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Asciidoctor\\s([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "asciidoctor:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^asciidoctor\\s([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:asciidoctor:asciidoctor:*:*:*:*:*:*:*:*",
	},
	implies: [
		"ruby",
	],
} as const satisfies TechnologyDefinition;
