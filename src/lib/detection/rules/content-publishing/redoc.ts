import type { TechnologyDefinition } from '../../types';

export const redocTechnologyDefinition = {
	id: "redoc",
	name: "ReDoc",
	website: "https://github.com/Rebilly/ReDoc",
	description: "Redoc is an open-source tool that generates API documentation from OpenAPI specifications.",
	icon: "redoc.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "redoc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/redoc\\.(?:min\\.)?js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "redoc:html:1",
			kind: "html",
			pattern: new RegExp("<redoc "),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "redoc:jsGlobal:2",
			kind: "jsGlobal",
			property: "Redoc.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:redocly:redoc:*:*:*:*:*:*:*:*",
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
