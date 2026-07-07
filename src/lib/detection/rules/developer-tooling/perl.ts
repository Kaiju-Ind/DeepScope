import type { TechnologyDefinition } from '../../types';

export const perlTechnologyDefinition = {
	id: "perl",
	name: "Perl",
	website: "https://perl.org",
	description: "Perl is a family of two high-level, general-purpose, interpreted, dynamic programming languages.",
	icon: "Perl.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "perl:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("\\bPerl\\b(?: ?\\/?v?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "perl:dom:1",
			kind: "dom",
			selector: "form[action*='/discus/search.pl']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "perl:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("\\bperl\\b(?: ?\\/?v?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:perl:perl:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
