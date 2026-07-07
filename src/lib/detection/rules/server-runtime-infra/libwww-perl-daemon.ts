import type { TechnologyDefinition } from '../../types';

export const libwwwPerlDaemonTechnologyDefinition = {
	id: "libwww-perl-daemon",
	name: "libwww-perl-daemon",
	website: "https://metacpan.org/pod/HTTP::Daemon",
	icon: "libwww-perl-daemon.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "libwww-perl-daemon:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("libwww-perl-daemon(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "libwww-perl-daemon:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("libwww-perl-daemon(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
