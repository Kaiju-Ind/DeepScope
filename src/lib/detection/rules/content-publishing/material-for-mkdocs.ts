import type { TechnologyDefinition } from '../../types';

export const materialForMkdocsTechnologyDefinition = {
	id: "material-for-mkdocs",
	name: "Material for MkDocs",
	website: "https://squidfunk.github.io/mkdocs-material/",
	description: "Material for MkDocs is a documentation framework built on MkDocs, a static site generator, providing tools and features for creating and organizing project documentation websites.",
	icon: "MaterialMkDocs.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "material-for-mkdocs:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^mkdocs-([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
