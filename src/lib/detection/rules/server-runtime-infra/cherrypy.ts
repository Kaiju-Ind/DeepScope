import type { TechnologyDefinition } from '../../types';

export const cherrypyTechnologyDefinition = {
	id: "cherrypy",
	name: "CherryPy",
	website: "https://cherrypy.org/",
	description: "CherryPy is an object-oriented web application framework using the Python programming language.",
	icon: "CherryPy.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "cherrypy:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("CherryPy(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cherrypy:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("cherrypy(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:cherrypy:cherrypy:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
