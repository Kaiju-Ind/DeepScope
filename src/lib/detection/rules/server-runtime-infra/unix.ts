import type { TechnologyDefinition } from '../../types';

export const unixTechnologyDefinition = {
	id: "unix",
	name: "UNIX",
	website: "https://unix.org",
	description: "Unix is a family of multitasking, multiuser computer operating systems.",
	icon: "UNIX.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "unix:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Unix", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "unix:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("unix", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:unix:unix:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
