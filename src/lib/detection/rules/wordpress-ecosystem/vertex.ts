import type { TechnologyDefinition } from '../../types';

export const vertexTechnologyDefinition = {
	id: "vertex",
	name: "Vertex",
	website: "https://dessign.net/vertex-theme/",
	description: "Vertex is a responsive and simple theme mostly for portfolio websites or photography and blog sites powered by DessignThemes.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "vertex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/Vertex\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vertex:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Vertex v\\.([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vertex:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/vertex\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vertex:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("vertex v\\.([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
