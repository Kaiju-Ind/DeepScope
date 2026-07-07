import type { TechnologyDefinition } from '../../types';

export const starletTechnologyDefinition = {
	id: "starlet",
	name: "Starlet",
	website: "https://metacpan.org/pod/Starlet",
	description: "Starlet is a high-performance, lightweight web server for Perl applications.",
	icon: "Starlet.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "starlet:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Plack::Handler::Starlet", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "starlet:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^plack::handler::starlet", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
