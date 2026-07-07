import type { TechnologyDefinition } from '../../types';

export const openbsdHttpdTechnologyDefinition = {
	id: "openbsd-httpd",
	name: "OpenBSD httpd",
	website: "https://man.openbsd.org/httpd.8",
	icon: "OpenBSD httpd.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "openbsd-httpd:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^OpenBSD httpd", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "openbsd-httpd:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^openbsd httpd", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:openbsd:openbsd:*:*:*:*:*:*:*:*",
	},
	excludes: [
		"apache-http-server",
	],
} as const satisfies TechnologyDefinition;
