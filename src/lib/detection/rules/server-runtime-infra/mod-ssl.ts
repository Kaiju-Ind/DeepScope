import type { TechnologyDefinition } from '../../types';

export const modSslTechnologyDefinition = {
	id: "mod-ssl",
	name: "mod_ssl",
	website: "https://modssl.org",
	description: "mod_ssl is an optional module for the Apache HTTP Server. It provides strong cryptography for the Apache web server via the Secure Sockets Layer (SSL) and Transport Layer Security (TLS) cryptographic protocols by the help of the open-source SSL/TLS toolkit OpenSSL.",
	icon: "mod_ssl.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mod-ssl:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("mod_ssl(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mod-ssl:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mod_ssl(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:modssl:mod_ssl:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-http-server",
	],
} as const satisfies TechnologyDefinition;
