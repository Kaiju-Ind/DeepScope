import type { TechnologyDefinition } from '../../types';

export const matoriNetTechnologyDefinition = {
	id: "matori-net",
	name: "MATORI.NET",
	website: "https://matori.net",
	description: "MATORI.NET is a fully managed reverse proxy.",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "matori-net:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("MATORI.NET", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "matori-net:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("matori.net", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"openresty",
	],
} as const satisfies TechnologyDefinition;
