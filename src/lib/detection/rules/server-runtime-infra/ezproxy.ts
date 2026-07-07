import type { TechnologyDefinition } from '../../types';

export const ezproxyTechnologyDefinition = {
	id: "ezproxy",
	name: "EZproxy",
	website: "https://www.oclc.org/en/ezproxy.html",
	description: "EZproxy is a web server and a reverse proxy that is usually used by libraries as a reverse proxy in front of electronic educational resources databases (e.g.: Scopus, PubMed, or Web of Science) in order to provide authentication and protect privacy.",
	icon: "default.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "ezproxy:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^EZproxy$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ezproxy:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^ezproxy$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
	excludes: [
		"apache-http-server",
		"nginx",
	],
} as const satisfies TechnologyDefinition;
