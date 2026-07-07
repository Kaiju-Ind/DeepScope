import type { TechnologyDefinition } from '../../types';

export const flaskTechnologyDefinition = {
	id: "flask",
	name: "Flask",
	website: "https://github.com/pallets/flask/",
	description: "Flask is a Python micro web framework ideal for rapidly constructing web applications, offering minimalism, flexibility, and modularity.",
	icon: "Flask.png",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "flask:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Werkzeug\\/?([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "flask:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("werkzeug\\/?([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:palletsprojects:flask:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
