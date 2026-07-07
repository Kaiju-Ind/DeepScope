import type { TechnologyDefinition } from '../../types';

export const ckanTechnologyDefinition = {
	id: "ckan",
	name: "Ckan",
	website: "https://ckan.org/",
	description: "CKAN is an open-source data management system for publishing and maintaining data catalogs.",
	icon: "Ckan.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ckan:header:0",
			kind: "header",
			key: "Access-Control-Allow-Headers",
			valuePattern: new RegExp("X-CKAN-API-KEY", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ckan:header:1",
			kind: "header",
			key: "Link",
			valuePattern: new RegExp("<http:\\/\\/ckan\\.org\\/>; rel=shortlink", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ckan:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ckan ?([0-9.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ckan:header:3",
			kind: "header",
			key: "access-control-allow-headers",
			valuePattern: new RegExp("x-ckan-api-key", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ckan:header:4",
			kind: "header",
			key: "link",
			valuePattern: new RegExp("<http:\\/\\/ckan\\.org\\/>; rel=shortlink", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:okfn:ckan:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
		"postgresql",
		"python",
		"solr",
	],
} as const satisfies TechnologyDefinition;
