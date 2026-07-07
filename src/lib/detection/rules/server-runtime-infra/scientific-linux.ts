import type { TechnologyDefinition } from '../../types';

export const scientificLinuxTechnologyDefinition = {
	id: "scientific-linux",
	name: "Scientific Linux",
	website: "https://scientificlinux.org",
	description: "Scientific Linux (SL) is a free open-source operating system based on Red Hat Enterprise Linux.",
	icon: "Scientific Linux.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "scientific-linux:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Scientific Linux", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "scientific-linux:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Scientific Linux", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "scientific-linux:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("scientific linux", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "scientific-linux:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("scientific linux", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:fnal:scientific_linux:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
