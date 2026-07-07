import type { TechnologyDefinition } from '../../types';

export const debianTechnologyDefinition = {
	id: "debian",
	name: "Debian",
	website: "https://debian.org",
	description: "Debian is a Linux software which is a free open-source software.",
	icon: "Debian.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "debian:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Debian", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "debian:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("(?:Debian|dotdeb|(potato|woody|sarge|etch|lenny|squeeze|wheezy|jessie|stretch|buster|sid))", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "debian:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("debian", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "debian:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("(?:debian|dotdeb|(potato|woody|sarge|etch|lenny|squeeze|wheezy|jessie|stretch|buster|sid))", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:debian:debian_linux:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
