import type { TechnologyDefinition } from '../../types';

export const modWsgiTechnologyDefinition = {
	id: "mod-wsgi",
	name: "mod_wsgi",
	website: "https://code.google.com/p/modwsgi",
	description: "mod_wsgi is an Apache HTTP Server module that provides a WSGI compliant interface for hosting Python based web applications under Apache.",
	icon: "mod_wsgi.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mod-wsgi:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("mod_wsgi(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mod-wsgi:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("mod_wsgi(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mod-wsgi:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mod_wsgi(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mod-wsgi:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("mod_wsgi(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:modwsgi:mod_wsgi:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-http-server",
		"python-confidence-50",
	],
} as const satisfies TechnologyDefinition;
