import type { TechnologyDefinition } from '../../types';

export const dancerTechnologyDefinition = {
	id: "dancer",
	name: "Dancer",
	website: "https://perldancer.org",
	description: "Mono.net delivers the a Software-as-a-Service (SaaS) platform to build and sell websites and other digital products.",
	icon: "Dancer.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "dancer:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Perl Dancer ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dancer:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Perl Dancer ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dancer:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("perl dancer ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dancer:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("perl dancer ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:dancer:dancer:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
