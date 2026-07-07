import type { TechnologyDefinition } from '../../types';

export const docfxTechnologyDefinition = {
	id: "docfx",
	name: "DocFX",
	website: "https://github.com/dotnet/docfx",
	description: "DocFX is a tool for building and publishing API documentation for .NET projects.",
	icon: "DocFX.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "docfx:meta:0",
			kind: "meta",
			key: "docfx:navrel",
			valuePattern: new RegExp("toc.html", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "docfx:meta:1",
			kind: "meta",
			key: "docfx:tocrel",
			valuePattern: new RegExp("toc.html", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "docfx:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("docfx\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
