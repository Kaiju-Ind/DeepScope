import type { TechnologyDefinition } from '../../types';

export const modFastcgiTechnologyDefinition = {
	id: "mod-fastcgi",
	name: "mod_fastcgi",
	website: "https://www.fastcgi.com/mod_fastcgi/docs/mod_fastcgi.html",
	description: "Mod_fcgid is a high performance alternative to mod_cgi or mod_cgid, which starts a sufficient number instances of the CGI program to handle concurrent requests, and these programs remain running to handle further incoming requests.",
	icon: "Apache.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mod-fastcgi:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("mod_fastcgi(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mod-fastcgi:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mod_fastcgi(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"apache-http-server",
	],
} as const satisfies TechnologyDefinition;
