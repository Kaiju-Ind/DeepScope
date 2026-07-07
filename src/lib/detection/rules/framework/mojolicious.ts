import type { TechnologyDefinition } from '../../types';

export const mojoliciousTechnologyDefinition = {
	id: "mojolicious",
	name: "Mojolicious",
	website: "https://mojolicio.us",
	description: "Mojolicious is a Perl-based web framework designed for building web applications and APIs.",
	icon: "Mojolicious.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "mojolicious:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^mojolicious", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mojolicious:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("mojolicious", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:mojolicious:mojolicious:*:*:*:*:*:perl:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
