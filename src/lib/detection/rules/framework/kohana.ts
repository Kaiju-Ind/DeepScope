import type { TechnologyDefinition } from '../../types';

export const kohanaTechnologyDefinition = {
	id: "kohana",
	name: "Kohana",
	website: "https://kohanaframework.org",
	description: "Kohana is an open-source PHP web framework designed for building web applications, following the Model-View-Controller (MVC) architectural pattern.",
	icon: "Kohana.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "kohana:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^kohanasession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "kohana:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Kohana Framework ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kohana:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("kohana framework ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:kohanaframework:kohana:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
