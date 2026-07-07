import type { TechnologyDefinition } from '../../types';

export const opensslTechnologyDefinition = {
	id: "openssl",
	name: "OpenSSL",
	website: "https://openssl.org",
	description: "OpenSSL is a software library for applications that secure communications over computer networks against eavesdropping or need to identify the party at the other end.",
	icon: "OpenSSL.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "openssl:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("OpenSSL(?:\\/([\\d.]+[a-z]?))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "openssl:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("openssl(?:\\/([\\d.]+[a-z]?))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:openssl:openssl:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
