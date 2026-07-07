import type { TechnologyDefinition } from '../../types';

export const gunicornTechnologyDefinition = {
	id: "gunicorn",
	name: "gunicorn",
	website: "https://gunicorn.org",
	icon: "gunicorn.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "gunicorn:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("gunicorn(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "gunicorn:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("gunicorn(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:gunicorn:gunicorn:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
