import type { TechnologyDefinition } from '../../types';

export const freebsdTechnologyDefinition = {
	id: "freebsd",
	name: "FreeBSD",
	website: "https://freebsd.org",
	description: "FreeBSD is a free and open-source Unix-like operating system.",
	icon: "FreeBSD.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "freebsd:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("FreeBSD(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "freebsd:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("freebsd(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:freebsd:freebsd:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
