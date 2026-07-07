import type { TechnologyDefinition } from '../../types';

export const sunosTechnologyDefinition = {
	id: "sunos",
	name: "SunOS",
	website: "https://oracle.com/solaris",
	description: "SunOS is a Unix-branded operating system developed by Sun Microsystems for their workstation and server computer systems.",
	icon: "Oracle.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "sunos:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("SunOS( [\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sunos:header:1",
			kind: "header",
			key: "Servlet-engine",
			valuePattern: new RegExp("SunOS( [\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sunos:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("sunos( [\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sunos:header:3",
			kind: "header",
			key: "servlet-engine",
			valuePattern: new RegExp("sunos( [\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:oracle:sunos:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
