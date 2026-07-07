import type { TechnologyDefinition } from '../../types';

export const engintronTechnologyDefinition = {
	id: "engintron",
	name: "Engintron",
	website: "https://github.com/engintron/engintron",
	description: "Engintron is a plugin that integrates Nginx to cPanel/WHM server.",
	icon: "engintron.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "engintron:header:0",
			kind: "header",
			key: "X-Server-Powered-By",
			valuePattern: new RegExp("^Engintron$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "engintron:header:1",
			kind: "header",
			key: "x-server-powered-by",
			valuePattern: new RegExp("^engintron$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	requires: [
		"nginx",
	],
} as const satisfies TechnologyDefinition;
