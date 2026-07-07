import type { TechnologyDefinition } from '../../types';

export const modPerlTechnologyDefinition = {
	id: "mod-perl",
	name: "mod_perl",
	website: "https://perl.apache.org",
	description: "Mod_perl is an optional module for the Apache HTTP server. It embeds a Perl interpreter into the Apache server. In addition to allowing Apache modules to be written in the Perl programming language, it allows the Apache web server to be dynamically configured by Perl programs.",
	icon: "mod_perl.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mod-perl:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("mod_perl(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mod-perl:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mod_perl(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:apache:mod_perl:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-http-server",
		"perl",
	],
} as const satisfies TechnologyDefinition;
